import path from 'node:path';
import fs from 'node:fs';

export interface EnvConfig {
  baseUrl: string;
  admin: { username: string; password: string };
  contact: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  };
}

const envPath = path.resolve(process.cwd(), 'env.json');

function loadEnv(): EnvConfig {
  const raw = fs.readFileSync(envPath, 'utf-8');
  return JSON.parse(raw) as EnvConfig;
}

let cached: EnvConfig | null = null;

export function getEnv(): EnvConfig {
  if (!cached) {
    cached = loadEnv();
  }
  return cached;
}
