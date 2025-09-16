import { startAuthentication, startRegistration } from '@simplewebauthn/browser';

const isMock = (import.meta.env.VITE_USE_MOCK_WEBAUTHN || 'false').toLowerCase() === 'true';

export const usePasskey = () => {
  const createRegistration = async (options: unknown) => {
    if (isMock) {
      return {
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
    }
    return startRegistration(options as any);
  };

  const createAuthentication = async (options: unknown) => {
    if (isMock) {
      return {
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
    }
    return startAuthentication(options as any);
  };

  return { createRegistration, createAuthentication };
};
