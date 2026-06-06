import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.college.deadlinecompanion',
  appName: 'Deadline Companion',
  webDir: 'dist/client',
  server: {
    url: 'https://deadlinecompanion.onrender.com',
    cleartext: true
  }
};

export default config;
