import type { Browser } from 'webdriverio';
import { BasePage } from '../core/BasePage';
import { TextBox } from '../elements/TextBox';
import { Button } from '../elements/Button';

export class LoginPage extends BasePage {
    private username: TextBox;
    private password: TextBox;
    private loginButton: Button;

    constructor(driver: Browser) {
        super(driver);

        // Example accessibility IDs.
        // Replace these with actual IDs from your application.
        this.username = new TextBox(driver, '~username');
        this.password = new TextBox(driver, '~password');
        this.loginButton = new Button(driver, '~login');
    }

    async login(username: string, password: string): Promise<void> {
        await this.username.enterText(username);
        await this.password.enterText(password);
        await this.loginButton.tap();
    }
}