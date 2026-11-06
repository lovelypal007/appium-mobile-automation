import { expect } from 'chai';
import type { Browser } from 'webdriverio';

import {
    startDriver,
    stopDriver
} from '../src/core/Driver';

describe('Android Mobile Automation', function () {

    let driver: Browser;

    before(async function () {
        driver = await startDriver();
    });

    after(async function () {
        await stopDriver();
    });
  
    it('should connect successfully to Android Emulator', async function () {

        const platform = driver.capabilities.platformName;

        expect(platform).to.equal('Android');

        expect(driver.sessionId).to.be.a('string').and.not.empty;

        console.log('Android Emulator connected successfully!');
    });

});