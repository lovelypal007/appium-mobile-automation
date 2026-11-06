import { remote } from 'webdriverio';
import type { Browser } from 'webdriverio';
import { capabilities } from '../config/capabilities';

let driver: Browser | undefined;

export async function startDriver(): Promise<Browser> {
    driver = await remote({
        hostname: '127.0.0.1',
        port: 4723,
        path: '/',
        capabilities
    });

    console.log('Appium session started successfully!');

    return driver;
}

export function getDriver(): Browser {
    if (!driver) {
        throw new Error('Driver session is not initialized.');
    }

    return driver;
}

export async function stopDriver(): Promise<void> {
    if (driver) {

      await driver.pressKeyCode(3); // Android HOME button

        // Close Settings app
        await driver.terminateApp('com.android.settings');

        // Close Appium session
        await driver.deleteSession();

        driver = undefined;

        console.log('Application closed successfully!');
        console.log('Appium session closed successfully!');
    }
}