import { connectDB } from '../config/db';
import { config } from '../config/env';
import { User } from '../models/User';
import { initializeTenantSettings } from '../services/tenantSettings';

const run = async () => {
  try {
    await connectDB();
    await initializeTenantSettings();

    if (!config.adminEmail) {
      console.log('ADMIN_EMAIL not provided. Skipping admin seed.');
      process.exit(0);
      return;
    }

    const email = config.adminEmail.toLowerCase();
    const displayName = config.adminDisplayName;

    const existing = await User.findOne({ email });
    if (existing) {
      if (existing.role !== 'admin') {
        existing.role = 'admin';
        existing.displayName = displayName;
        await existing.save();
      }
      console.log(`Admin user ensured for ${email}`);
    } else {
      await User.create({ email, displayName, role: 'admin' });
      console.log(`Admin user created for ${email}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Failed to seed admin', error);
    process.exit(1);
  }
};

void run();
