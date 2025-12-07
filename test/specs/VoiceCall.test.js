const { expect } = require("chai");
const { loginWithGoogle } = require("../helpers/Login.helper");
const { beforeHook } = require("../hooks/splashscreen.hooks");
const InfoForm = require("../helpers/InfoForm.helper");
const { popupClose , clearAppCache, closeRecordingPopup , NotificationAlertClose} = require("../helpers/app.helper");
const { goToVoiceMatching, selectAllGenders, isRulesPopupDisplayed , handleRulesPopups, handleMicPermission } = require("../helpers/MatchingSysHelper/VoiceMatching.helper");

describe("Voice Call Suite", () => {
    before(async () => {
//        await clearAppCache();
//        await beforeHook();
//        await closeRecordingPopup();
    });
    it("TC-036 – Verify that a rules pop up is displayed when user matches for the first time", async () => {

//        try{
//        await closeRecordingPopup();
//        }catch (err) {"::> No recording alert found"}
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
//        await popupClose();
//        } catch (err) {
//        console.log("::> popup handling");}
        await goToVoiceMatching();
        await selectAllGenders();
        await driver.pause(1000);
        try{
        await handleMicPermission();
        }catch (err) {"::> mic permission handling"}
        //await driver.back();
        await driver.pause(2000);
        const popupShown = await isRulesPopupDisplayed();
        expect(popupShown).to.be.true;
    });

    it("TC-038 – Verify user is able to bypass any matching profile", async () => {
        await handleRulesPopups();

        // Use pointer action to tap the pass button
        await driver.action('pointer')
          .move({ duration: 0, x: 408, y: 1576 })
          .down({ button: 0 })
          .pause(50)
          .up({ button: 0 })
          .perform();
        
        // Verify user is in matching pool by checking for searching UI element
        const searchingUI = await driver.$("id:sa.fadfed.fadfedapp:id/textViewSearching");
        await searchingUI.waitForDisplayed({ timeout: 5000 });
        expect(await searchingUI.isDisplayed()).to.be.true;
      });

});