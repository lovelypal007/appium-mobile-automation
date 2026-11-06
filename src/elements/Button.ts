import type { Browser } from 'webdriverio';
import { BaseElement } from '../core/BaseElement';

export class Button extends BaseElement {
    constructor(driver: Browser, selector: string) {
        super(driver, selector);
    }

    async tap(): Promise<void> {
        await this.click();
    }
}