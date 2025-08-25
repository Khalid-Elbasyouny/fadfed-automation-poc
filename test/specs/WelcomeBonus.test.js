const { expect } = require("chai");
const InfoForm = require("../helpers/InfoForm.helper");
const {loginWithGoogle, isLoggedIn} = require("../helpers/Login.helper");
const { popupClose, clearAppCache, NotificationAlertClose , closeRecordingPopup } = require("../helpers/app.helper");
const welcomeBonusHelper = require("../helpers/WelcomeBonus.helper");
const welcomeBonusPage = require("../pageobjects/WelcomeBonus.page");
const { beforeHook , afterHook } = require("../hooks/splashscreen.hooks");

describe("Welcome Bonus Suite", () => {
  beforeEach(async () => {
//    await clearAppCache();
//    await beforeHook();
  });

  it("TC-018 – Verify that user with no gems is redirected to purchase gems page if he searched by specific gender", async () => {
        await driver.pause(1000);
        try{
        await closeRecordingPopup();
        }catch (err) {"::> No recording alert found"}
        try {
        await loginWithGoogle();
        await driver.pause(2000);
        }catch (err) {"::> Loginig to an existing account"}
//        try{
//        await InfoForm.ValidInfoForm();
//        } catch (err) {
//        console.log("::> filling user form ");}
        try {
        await NotificationAlertClose();
        }catch (err) {"::> popup handling"}
        try {
        await popupClose();
        } catch (err) {
        console.log("::> popup handling");}
    await welcomeBonusHelper.navigateToGemsPackages();

    expect(await welcomeBonusPage.isPackagesViewVisible()).to.be.true;
  });

  after(async () => {
//  await afterHook();
//    await clearAppCache();
  });
});
