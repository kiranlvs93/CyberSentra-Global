import { config } from '../config/env';
import { TenantSettings } from '../models/TenantSettings';

const DEFAULT_TENANT_ID = 'default';

export const initializeTenantSettings = async () => {
  const existing = await TenantSettings.findOne({ tenantId: DEFAULT_TENANT_ID });
  if (!existing) {
    await TenantSettings.create({
      tenantId: DEFAULT_TENANT_ID,
      riskThreshold: config.defaultRiskThreshold,
      allowFallback: true,
    });
  }
};

export const getTenantSettings = async () => {
  const settings = await TenantSettings.findOne({ tenantId: DEFAULT_TENANT_ID });
  if (!settings) {
    const created = await TenantSettings.create({
      tenantId: DEFAULT_TENANT_ID,
      riskThreshold: config.defaultRiskThreshold,
      allowFallback: true,
    });
    return created;
  }
  return settings;
};

export const updateTenantSettings = async (updates: { riskThreshold?: number; allowFallback?: boolean }) => {
  const settings = await TenantSettings.findOneAndUpdate(
    { tenantId: DEFAULT_TENANT_ID },
    { $set: updates },
    { new: true, upsert: true },
  );
  return settings;
};
