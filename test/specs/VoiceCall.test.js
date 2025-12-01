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
      await driver.back();// full execute enhance

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
//        await popupClose();
//        } catch (err) {
//        console.log("::> popup handling");}
        await goToVoiceMatching();
        await selectAllGenders();
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


        const passButton = await driver.$("id:sa.fadfed.fadfedapp:id/layoutButtonRejectVoiceMatch");
        await passButton.waitForDisplayed({ timeout: 10000 });

        expect(await passButton.isDisplayed()).to.equal(true);
        expect(await passButton.isEnabled()).to.equal(true);
        await driver.back();
      });

});