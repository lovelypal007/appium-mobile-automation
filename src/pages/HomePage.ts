import type { Browser } from 'webdriverio';
import { BasePage } from '../core/BasePage';
import { Label } from '../elements/Label';

export class HomePage extends BasePage {
    private welcomeMessage: Label;

    constructor(driver: Browser) {
        super(driver);

        // Example accessibility ID.
        this.welcomeMessage = new Label(driver, '~welcome_message');
    }
    private youTubeIcon = this.driver.$('android=new UiSelector().text("YouTube")');
    private settingIcon = this.driver.$('android=new UiSelector().text("Settings")');


    async getWelcomeMessage(): Promise<string> {
        return await this.welcomeMessage.getLabelText();
    }

    async isHomePageDisplayed(): Promise<boolean> {
        return await this.welcomeMessage.isDisplayed();
    }

    async clickOnyoutubeIcon() {
        await this.youTubeIcon.click();
    }

    async clickOnSettingIcon() {
        await this.settingIcon.click();
    }

    async scrollAppDrawer(): Promise<void> {
    await this.driver.execute('mobile: scrollGesture', {
        left: 50,
        top: 150,
        width: 900,
        height: 1500,
        direction: 'down',
        percent: 1.0
    });
}
}