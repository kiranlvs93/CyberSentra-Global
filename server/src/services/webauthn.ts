import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from '@simplewebauthn/server';
import { isoBase64URL } from '@simplewebauthn/server/helpers';
import type {
  AuthenticationResponseJSON,
  RegistrationResponseJSON,
} from '@simplewebauthn/types';

import { config } from '../config/env';
import type { ICredential } from '../models/Credential';
import type { IUser } from '../models/User';

const MOCK_CREDENTIAL_ID = 'mock-credential-id';

export const generateRegistration = async (
  user: IUser,
  credentials: ICredential[],
) => {
  if (config.useMockWebauthn) {
    return {
      challenge: 'mock-registration-challenge',
      rp: { id: config.rpId, name: config.rpName },
      user: {
        id: user._id.toString(),
        name: user.email,
        displayName: user.displayName,
      },
      pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
      timeout: 60000,
      excludeCredentials: credentials.map((cred) => ({
        id: isoBase64URL.fromBuffer(cred.credentialID),
        type: 'public-key',
      })),
    };
  }

  return generateRegistrationOptions({
    rpID: config.rpId,
    rpName: config.rpName,
    userID: user._id.toString(),
    userName: user.email,
    userDisplayName: user.displayName,
    attestationType: 'none',
    authenticatorSelection: {
      residentKey: 'preferred',
      userVerification: 'preferred',
    },
    timeout: 60000,
    excludeCredentials: credentials.map((cred) => ({
      id: isoBase64URL.fromBuffer(cred.credentialID),
      type: 'public-key',
    })),
  });
};

export const verifyRegistration = async (
  credential: RegistrationResponseJSON,
  expectedChallenge: string,
) => {
  if (config.useMockWebauthn) {
    return {
      verified: true,
      registrationInfo: {
        credentialPublicKey: Buffer.from('mock-public-key'),
        credentialID: Buffer.from(MOCK_CREDENTIAL_ID),
        counter: 0,
        credentialDeviceType: 'singleDevice',
        credentialBackedUp: false,
      },
    };
  }

  return verifyRegistrationResponse({
    response: credential,
    expectedChallenge,
    expectedOrigin: config.rpOrigin,
    expectedRPID: config.rpId,
    requireUserVerification: true,
  });
};

export const generateAuthentication = async (credentials: ICredential[]) => {
  if (config.useMockWebauthn) {
    return {
      challenge: 'mock-authentication-challenge',
      timeout: 60000,
      allowCredentials: credentials.map((cred) => ({
        id: isoBase64URL.fromBuffer(cred.credentialID),
        type: 'public-key',
      })),
      userVerification: 'preferred',
    };
  }

  return generateAuthenticationOptions({
    timeout: 60000,
    allowCredentials: credentials.map((cred) => ({
      id: isoBase64URL.fromBuffer(cred.credentialID),
      type: 'public-key',
    })),
    userVerification: 'preferred',
  });
};

export const verifyAuthentication = async (
  credential: AuthenticationResponseJSON,
  expectedChallenge: string,
  authenticator: ICredential,
) => {
  if (config.useMockWebauthn) {
    return {
      verified: true,
      authenticationInfo: {
        newCounter: authenticator.counter + 1,
      },
    };
  }

  return verifyAuthenticationResponse({
    response: credential,
    expectedChallenge,
    expectedOrigin: config.rpOrigin,
    expectedRPID: config.rpId,
    requireUserVerification: true,
    authenticator: {
      credentialID: authenticator.credentialID,
      credentialPublicKey: authenticator.credentialPublicKey,
      counter: authenticator.counter,
      transports: authenticator.transports,
    },
  });
};

export const getMockCredentialId = () => MOCK_CREDENTIAL_ID;
