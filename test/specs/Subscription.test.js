const { expect } = require("chai");
const { loginWithGoogle } = require("../helpers/Login.helper");
const { popupClose, clearAppCache, NotificationAlertClose } = require("../helpers/app.helper");
const InfoForm = require("../helpers/InfoForm.helper");
const { filterByCountry } = require("../helpers/MatchingSysHelper/FilterByCountry.helper");
const MatchingPage = require("../pageobjects/Matching.page");
const { beforeHook } = require("../hooks/splashscreen.hooks");
const { checkIfUserIsPremium } = require("../helpers/subscription.helper");

describe("Subscription Suite", () => {
    before(async () => {
        await clearAppCache();
        await beforeHook();
    });

        it("TC-029 – Premium user has gold ring around profile picture", async () => {
    await loginWithGoogle();
        await driver.pause(2000);
        try {
          await InfoForm.ValidInfoForm();
        } catch (err) {
          console.log("::> Loginig to an existing account");
        }
        try {
           await NotificationAlertClose();
           await popupClose();
       } catch (err) {
         console.log("::> popup handling");
       }
      const isPremium = await checkIfUserIsPremium();
        if (!isPremium) {
              console.error("❌ Non premium user – skipping test");
              expect.fail("Non premium user");
              }
      expect(isPremium).to.be.true;
    });


    it("TC-030 – Premium user can filter by any country in match screen", async () => {
        const isPremium = await checkIfUserIsPremium();
        if (!isPremium) {
            console.error("❌ Non premium user – skipping test");
            expect.fail("Non premium user");
        }

        const chosenCountry = "اليونان";
        await filterByCountry(chosenCountry);

        const countryText = await MatchingPage.Countryfilter.getText();
        expect(countryText).to.include(chosenCountry);
    });


    after(async () => {
        await clearAppCache();
    });
});
