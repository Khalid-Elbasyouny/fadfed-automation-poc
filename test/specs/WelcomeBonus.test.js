const { expect } = require("chai");
const InfoForm = require("../helpers/InfoForm.helper");
const {loginWithGoogle, isLoggedIn} = require("../helpers/Login.helper");
const { popupClose, clearAppCache, NotificationAlertClose } = require("../helpers/app.helper");
const welcomeBonusHelper = require("../helpers/WelcomeBonus.helper");
const welcomeBonusPage = require("../pageobjects/WelcomeBonus.page");
const { beforeHook } = require("../hooks/splashscreen.hooks");

describe("Welcome Bonus Suite", () => {
  beforeEach(async () => {
    await clearAppCache();
    await beforeHook();
  });

  it("TC-018 – Verify that user with no gems is redirected to purchase gems page if he searched by specific gender", async () => {
    if (!(await isLoggedIn())) {
      console.log("::> logging with Facebook...");
      await loginWithGoogle();
    } else {
      console.log("::> user already logged in");
    }
    try {
      await InfoForm.ValidInfoForm();
    } catch (err) {
      console.log("::> Logging into an existing account");
    }
    try {
       await NotificationAlertClose();
       await popupClose();
   } catch (err) {
     console.log("::> popup handling");
   }
    await welcomeBonusHelper.navigateToGemsPackages();

    expect(await welcomeBonusPage.isPackagesViewVisible()).to.be.true;
  });

  after(async () => {
    await clearAppCache();
  });
});
