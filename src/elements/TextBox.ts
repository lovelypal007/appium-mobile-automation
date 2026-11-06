import type { Browser } from 'webdriverio';
import { BaseElement } from '../core/BaseElement';

export class TextBox extends BaseElement {
    constructor(driver: Browser, selector: string) {
        super(driver, selector);
    }

    async enterText(value: string): Promise<void> {
        await this.element.setValue(value);
    }

    async clearText(): Promise<void> {
        await this.element.clearValue();
    }

    async getValue(): Promise<string> {
        return await this.element.getText();
    }
}