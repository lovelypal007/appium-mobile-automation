import type { Browser } from 'webdriverio';

export class BasePage {
    constructor(protected driver: Browser) {}

    async waitForPage(selector: string): Promise<void> {
        const element = this.driver.$(selector);

        await element.waitForDisplayed({
            timeout: 10000
        });
    }

    async getText(selector: string): Promise<string> {
        return await this.driver.$(selector).getText();
    }

    async isElementDisplayed(selector: string): Promise<boolean> {
        return await this.driver.$(selector).isDisplayed();
    }

    async clickElement(selector: string): Promise<void> {
        await this.driver.$(selector).click();
    }
}