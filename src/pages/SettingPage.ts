import { Browser } from "webdriverio";
import { BasePage } from "../core/BasePage";

export class SettingPage extends BasePage {
    constructor(driver:Browser) {
        super(driver);
    }
    
    private searchIcon = 'id=com.android.settings:id/search_action_bar';
    private searchBox = 'android.widget.EditText';
    private bluetoothResult = 'android=new UiSelector().text("Bluetooth")';

    async isSettingDisplayed() :Promise<Boolean> {
        const settingTitle = this.driver.$('android=new UiSelector().text("Google")');
        await settingTitle.waitForDisplayed({timeout: 50000,interval: 2000});
        return await settingTitle.isDisplayed();
    }

     // Tap on Search icon
    async tapSearchIcon(): Promise<void> {
        await this.driver.$(this.searchIcon).waitForDisplayed();
        await this.driver.$(this.searchIcon).click();
    }

    // Enter Bluetooth and press Enter
private searchInput = 'android.widget.EditText';

async searchBluetooth(): Promise<void> {
    const searchBox = this.driver.$(this.searchInput);

    await searchBox.waitForDisplayed({ timeout: 10000 });
    await searchBox.setValue('Bluetooth');

    await this.driver.execute('mobile: performEditorAction', {
        action: 'search'
    });
}

    // Verify Bluetooth result
    async isBluetoothDisplayed(): Promise<boolean> {
        const bluetooth = this.driver.$(this.bluetoothResult);

        await bluetooth.waitForDisplayed({ timeout: 10000 });

        return await bluetooth.isDisplayed();
    }

    // Clear search field
    async clearSearchText(): Promise<void> {
        const search = this.driver.$(this.searchBox);

        await search.clearValue();
    }

    // Get search field value
    async getSearchText(): Promise<string> {
        return await this.driver.$(this.searchBox).getValue();
    }


    async clickNetworkAndInternet(): Promise<void> {
    const network = this.driver.$(
        'android=new UiSelector().text("Network & internet")'
    );

    await network.waitForDisplayed({ timeout: 10000 });
    await network.click();
}

async isNetworkAndInternetDisplayed(): Promise<boolean> {
    const networkTitle = this.driver.$(
        'android=new UiSelector().text("Network & internet")'
    );

    return await networkTitle.isDisplayed();
} 
}