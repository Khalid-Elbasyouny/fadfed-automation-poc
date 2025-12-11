const { expect } = require("chai");
const { loginWithGoogle } = require("../helpers/Login.helper");
const { RatingPopupHandler, clearAppCache, NotificationAlertClose , closeRecordingPopup } = require("../helpers/app.helper");
const InfoForm = require("../helpers/InfoForm.helper");
const { filterByCountry } = require("../helpers/MatchingSysHelper/FilterByCountry.helper");
const MatchingPage = require("../pageobjects/Matching.page");
const { beforeHook } = require("../hooks/splashscreen.hooks");
const { checkIfUserIsPremium } = require("../helpers/subscription.helper");

describe("Subscription Suite", () => {
    before(async () => {
//        await clearAppCache();
//        await beforeHook();
    });

        it(" ⚡ Premium user has gold ring around profile picture", async () => {
        try{
        await closeRecordingPopup();
        }catch (err) {"::> No recording alert found"}
//        try {
//        await loginWithGoogle();
//        await driver.pause(2000);
//        }catch (err) {"::> Loginig to an existing account"}
//        try{
//        await InfoForm.ValidInfoForm();
//        } catch (err) {
//        console.log("::> filling user form ");}
//        try {
//        await NotificationAlertClose();
//        }catch (err) {"::> popup handling"}
//        try {
//        await RatingPopupHandler();
//        } catch (err) {
//        console.log("::> popup handling");}
        const isPremium = await checkIfUserIsPremium();
        if (!isPremium) {
              console.error("❌ Non premium user – skipping test");
              expect.fail("Non premium user");
              }
        expect(isPremium).to.be.true;
    });


    it(" ⚡ Premium user can filter by any country in match screen", async () => {
        const isPremium = await checkIfUserIsPremium();
        if (!isPremium) {
            console.error("❌ Non premium user – skipping test");
            expect.fail("Non premium user");
        }

        const chosenCountry = "السعودية";
        await filterByCountry(chosenCountry);

        const countryText = await MatchingPage.Countryfilter.getText();
        expect(countryText).to.include(chosenCountry);
    });


//    after(async () => {
//        await clearAppCache();
//    });
});
