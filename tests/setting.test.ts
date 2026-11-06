
import { Browser } from "webdriverio";
import { SettingPage } from "../src/pages/SettingPage";
import { startDriver, stopDriver } from "../src/core/Driver";
import { expect } from "chai";
import { HomePage } from "../src/pages/HomePage";

describe('Android Settings Application', function () {

    let driver: Browser;
    let settingPage: SettingPage;
    let homepage: HomePage;

    before(async function () {
        driver = await startDriver();

        homepage = new HomePage(driver);
        settingPage = new SettingPage(driver);

        await homepage.scrollAppDrawer();
        await homepage.clickOnSettingIcon();
    });

    after(async function () {
        await stopDriver();
    });

    it('should display setting screen', async function () {
        const isDisplayed = await settingPage.isSettingDisplayed();

        expect(isDisplayed).to.equal(true);
        console.log('✓ Settings screen displayed successfully!');
    });

it('should open Network and Internet settings', async function () {

    await settingPage.clickNetworkAndInternet();

    const isDisplayed =
        await settingPage.isNetworkAndInternetDisplayed();

    expect(isDisplayed).to.equal(true);

    console.log('Network & Internet screen displayed successfully!');
});

});
