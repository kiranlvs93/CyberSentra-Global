import http from 'http';

import { connectDB } from './config/db';
import { config } from './config/env';
import { initializeTenantSettings } from './services/tenantSettings';
import { app } from './app';

const startServer = async () => {
  try {
    await connectDB();
    await initializeTenantSettings();

    const server = http.createServer(app);
    server.listen(config.port, () => {
      console.log(`Passless server listening on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

void startServer();
