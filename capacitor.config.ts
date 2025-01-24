import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'ph.spoon.betaspoon',
    appName: 'Spoon PH',
    webDir: 'spoon-mobile/src',
    server: {
        url: 'https://beta-spoon.spoon.ph',
        cleartext: true,
    },
};

export default config;
