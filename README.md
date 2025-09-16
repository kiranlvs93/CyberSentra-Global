# Passless Platform

Passless delivers a full-stack passwordless authentication experience that combines WebAuthn passkeys, adaptive risk scoring, and OTP/magic-link fallbacks. The platform also includes an administrator console for monitoring events and tuning risk posture.

## Features

- **End-user flow**: email registration, primary/secondary passkey enrollment, passkey login, adaptive fallback challenges, and OTP/magic-link verification.
- **Risk engine**: captures derived behavioral metrics (timing averages/variance) and scores sessions against a configurable threshold.
- **Fallbacks**: time-bound OTP codes and single-use magic links delivered via Nodemailer console transport in development.
- **Admin dashboard**: Web UI for metrics, risk distribution, event drill-down, and tenant settings (risk threshold, fallback toggle).
- **Security**: httpOnly JWT sessions, rate-limited sensitive endpoints, CORS, and WebAuthn challenge handling via `@simplewebauthn/server` with mock mode support for local testing.

## Requirements

- Node.js 18+
- MongoDB 6+
- npm 9+

## Environment

Create a `.env` file based on `.env.example` and adjust values for your environment. Key variables include MongoDB connection info, JWT secret, WebAuthn RP metadata, mail transport settings, and admin bootstrap email.

## Local Development (without Docker)

```bash
# install dependencies for both apps
npm install
npm run install:all

# start backend and frontend in parallel
npm run dev
```

Backend runs on `http://localhost:4000`, frontend on `http://localhost:5173`.

### Backend only

```bash
cd server
npm install
npm run dev
```

### Frontend only

```bash
cd web
npm install
npm run dev
```

## Docker Development

```bash
# build and start all services (MongoDB, API, web)
docker-compose up --build
```

- API: `http://localhost:4000`
- Web: `http://localhost:5173`
- MongoDB: `mongodb://localhost:27017`

## Testing

End-to-end smoke tests cover registration, passkey mock flows, risk-induced fallback, and OTP verification.

```bash
cd server
npm install
npm run test
```

## Admin Seed

To bootstrap an admin account and tenant settings:

```bash
cd server
npm run seed
```

## Notes

- WebAuthn uses mock responses locally when `USE_MOCK_WEBAUTHN=true`; production mode requires valid origins and TLS.
- Nodemailer defaults to a console transport unless SMTP credentials are provided.
- HTTPS termination should be handled by your deployment environment (configure reverse proxy or load balancer accordingly).
