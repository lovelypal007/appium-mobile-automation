import { Browser } from "webdriverio";
import { BasePage } from "../core/BasePage";

export class YoutubePage extends BasePage {
    constructor(driver:Browser) {
        super(driver);
    }

    private youTubeIcon = this.driver.$('android=new UiSelector().text("YouTube")');
    private youtubeLogo = this.driver.$('id=com.google.android.youtube:id/youtube_logo');
    private searchInput = this.driver.$('android=new UiSelector().description("Search YouTube")')

    async clickOnyoutubeIcon() {
        await this.youTubeIcon.click();
    }

    async verifyYoutubeScreen(): Promise<boolean> {
        const youtube_logo = this.youtubeLogo;
        await youtube_logo.waitForDisplayed({timeout: 20000,interval: 1000});
        return await youtube_logo.isDisplayed();
    }

    async verifySearchScreen(): Promise<boolean> {
        const search = this.searchInput;
        await search.waitForDisplayed({timeout: 20000,interval: 1000});
        return await search.isDisplayed();
    }
}