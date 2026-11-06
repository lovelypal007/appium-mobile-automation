import { Browser } from "webdriverio"
import { startDriver, stopDriver } from "../src/core/Driver";
import { expect } from "chai";
import { YoutubePage } from "../src/pages/YoutubePage";

describe('Android Settings Application' , async() => {
    let driver:Browser;
    let youtubePage: YoutubePage;

    before(async () =>{
        driver = await startDriver();
        youtubePage = new YoutubePage(driver);
    });

    after(async() => {
        await stopDriver();
    });

    it('should display youtube screen', async() =>{
        await youtubePage.clickOnyoutubeIcon();
        const youtube = await youtubePage.verifySearchScreen();
        expect(youtube).to.equal(true);

        console.log('youtube screen displayed successfully!');
    });

})