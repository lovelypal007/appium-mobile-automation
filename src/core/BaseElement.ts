import type { Browser } from 'webdriverio';

export class BaseElement {
    constructor(
        protected driver: Browser,
        protected selector: string
    ) {}

    protected get element() {
        return this.driver.$(this.selector);
    }

    async click(): Promise<void> {
        await this.element.click();
    }

    async getText(): Promise<string> {
        return await this.element.getText();
    }

    async isDisplayed(): Promise<boolean> {
        return await this.element.isDisplayed();
    }

    async waitForDisplayed(timeout = 10000): Promise<void> {
        await this.element.waitForDisplayed({ timeout });
    }
}