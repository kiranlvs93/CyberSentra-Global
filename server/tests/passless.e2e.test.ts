import request from 'supertest';
import { describe, expect, beforeAll, afterAll, it } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { app } from '../src/app';
import { connectDB } from '../src/config/db';
import { config } from '../src/config/env';
import { initializeTenantSettings } from '../src/services/tenantSettings';
import { OtpToken } from '../src/models/OtpToken';

describe('Passless end-to-end', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    config.mongoUri = mongoServer.getUri();
    await connectDB();
    await initializeTenantSettings();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  it('registers, logs in, handles high risk fallback and OTP verification', async () => {
    const agent = request.agent(app);
    const email = 'user@example.com';
    const displayName = 'Test User';

    const startResponse = await agent
      .post('/api/enroll/start')
      .send({ email, displayName })
      .expect(200);

    expect(startResponse.body.options.challenge).toBeTruthy();

    const attestationResponse = {
      id: 'mock-credential-id',
      rawId: 'mock-credential-id',
      type: 'public-key',
      response: {
        attestationObject: 'mock',
        clientDataJSON: 'mock',
      },
      clientExtensionResults: {},
      transports: ['internal'],
    };

    const finishResponse = await agent
      .post('/api/enroll/finish')
      .send({ email, credential: attestationResponse })
      .expect(200);

    expect(finishResponse.body.user.email).toBe(email);

    await agent.post('/api/session/logout').expect(200);

    const optionsResponse = await agent
      .get('/api/webauthn/assertion/options')
      .query({ email })
      .expect(200);

    expect(optionsResponse.body.options.challenge).toBeTruthy();

    const authResponse = {
      id: 'mock-credential-id',
      rawId: 'mock-credential-id',
      type: 'public-key',
      response: {
        authenticatorData: 'mock',
        clientDataJSON: 'mock',
        signature: 'mock',
        userHandle: null,
      },
      clientExtensionResults: {},
    };

    const verifyResponse = await agent
      .post('/api/webauthn/assertion/verify')
      .send({ email, credential: authResponse })
      .expect(200);

    expect(verifyResponse.body.session.needsFallback).toBe(false);

    const riskResponse = await agent
      .post('/api/risk/score')
      .send({
        typing: { average: 2, variance: 1 },
        mouse: { average: 2, variance: 1 },
      })
      .expect(200);

    expect(riskResponse.body.needsFallback).toBe(true);

    await agent.post('/api/fallback/otp/send').expect(200);

    const token = await OtpToken.findOne().sort({ createdAt: -1 });
    expect(token).toBeTruthy();

    const otpCode = token?.codePreview || '000000';

    const verifyOtpResponse = await agent
      .post('/api/fallback/otp/verify')
      .send({ code: otpCode })
      .expect(200);

    expect(verifyOtpResponse.body.success).toBe(true);

    const sessionResponse = await agent.get('/api/session').expect(200);
    expect(sessionResponse.body.session.needsFallback).toBe(false);
  });
});
