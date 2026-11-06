import type { Browser } from 'webdriverio';
import { BaseElement } from '../core/BaseElement';

export class Label extends BaseElement {
    constructor(driver: Browser, selector: string) {
        super(driver, selector);
    }

    async getLabelText(): Promise<string> {
        return await this.getText();
    }
}