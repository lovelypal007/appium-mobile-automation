import type { Browser } from 'webdriverio';

export class WaitUtils {
    static async waitForElement(
        driver: Browser,
        selector: string,
        timeout = 10000
    ): Promise<void> {
        const element = driver.$(selector);

        await element.waitForDisplayed({
            timeout
        });
    }

    static async waitForElementToDisappear(
        driver: Browser,
        selector: string,
        timeout = 10000
    ): Promise<void> {
        const element = driver.$(selector);

        await element.waitForDisplayed({
            timeout,
            reverse: true
        });
    }
}