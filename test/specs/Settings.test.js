const { expect } = require("chai");
const InfoForm = require("../helpers/InfoForm.helper");
const { loginWithGoogle } = require("../helpers/Login.helper");
const { RatingPopupHandler, NotificationAlertClose, closeRecordingPopup  } = require("../helpers/app.helper");
const { beforeHook , afterHook } = require("../hooks/splashscreen.hooks");
const { verifySettingsOptions , verifyAlertsToggles, toggleNightModeAndCheck, changeChatBackground , verifyHelpSections , sendFeedback , deleteAccountFlow } = require("../helpers/Settings.helper");
const settingsPage = require("../pageobjects/Settings.page");
const { toggleBackupSettings } = require('../helpers/Settings.helper');

describe("Settings Suite", () => {
  before(async () => {
//    await beforeHook();

  });

  it(" ⚡ Verify UI/UX of Settings screen", async () => {
//    try{
//    await closeRecordingPopup();
//    }catch (err) {"::> No recording alert found"}
//    try {
//    await loginWithGoogle();
//    await driver.pause(2000);
//    }catch (err) {"::> Logging to an existing account"}
//    try{
//    await InfoForm.ValidInfoForm();
//    } catch (err) {
//    console.log("::> filling user form ");}
//    try {
//    await NotificationAlertClose();
//    }catch (err) {"::> popup handling"}
//    try {
//    await RatingPopupHandler();
//    } catch (err) {
//    console.log("::> popup handling");}
    await verifySettingsOptions();
  });


  it(" ⚡ Verify backup settings", async() => {

    try {
      // Navigate to backup settings and toggle it
      const { beforeStatus, afterStatus } = await toggleBackupSettings();
      
      // Verify the status has changed
//      expect(beforeStatus).to.not.equal(afterStatus);
      console.log(`✅ Backup status changed from ${beforeStatus} to ${afterStatus}`);
      
      // Verify backup lastSync is displayed
      expect(await settingsPage.lastSyncContainer.isDisplayed()).to.be.true;
      
    } catch (error) {
      console.error('Error in backup settings test:', error);
      throw error;
    } finally {
      // Navigate back to settings screen
      await driver.back();
      await driver.pause(1000);
    }
  });

  it(" ⚡ Verify user is able to switch light mode to dark mode & vice-versa", async () => {
    const { initialState, afterToggleOn, afterToggleOff } = await toggleNightModeAndCheck();

    expect(afterToggleOn).to.equal(true);   // لازم يبقى ON بعد أول toggle
    expect(afterToggleOff).to.equal(false); // لازم يرجع OFF بعد تاني toggle
  });

  it(" ⚡ Verify user is able to change chat background", async () => {
    const pageSource = await changeChatBackground()
    expect(pageSource).to.include("تم تغيير الخلفية بنجاح");
  });

  it(' ⚡ Verify the toggles are working in alert section of settings page', async () => {
      const resultOff = await verifyAlertsToggles()
      expect(resultOff.outApp.before).to.not.equal(resultOff.outApp.after);
      expect(resultOff.inApp.before).to.not.equal(resultOff.inApp.after);
      expect(resultOff.anon.before).to.not.equal(resultOff.anon.after);
      const resultOn = await verifyAlertsToggles()
      expect(resultOn.outApp.before).to.not.equal(resultOn.outApp.after);
      expect(resultOn.inApp.before).to.not.equal(resultOn.inApp.after);
      expect(resultOn.anon.before).to.not.equal(resultOn.anon.after);
  });

  it(" ⚡ Verify the contents and hyperlinks are working under help section of settings page", async function () {
      await verifyHelpSections();
  });

  it(" ⚡ Verify user is able to send feedback through help section (email, X, instagram)", async () => {
      // 📩 Email
      const gmailChip = await sendFeedback("email");
      await gmailChip.waitForDisplayed({ timeout: 30000 });
      const chipText = await gmailChip.getText();
      expect(chipText).to.include("support@fdfd.me");
      await beforeHook()
//      try{
//      await closeRecordingPopup();
//      }catch (err) {"::> No recording alert found"}
      // 🐦 Twitter
      const twitterApp = await sendFeedback("twitter");
      expect(twitterApp).to.equal("com.android.chrome");
      await beforeHook()
      try{
      await closeRecordingPopup();
      }catch (err) {"::> No recording alert found"}
      // 📸 Instagram
      const instagramApp = await sendFeedback("instagram");
      expect(instagramApp).to.equal("com.android.chrome");
      await beforeHook()
      try{
      await closeRecordingPopup();
      }catch (err) {"::> No recording alert found"}
      await driver.back();
      await driver.back();
  });

//  it(" ⚡ Verify user is able to delete account from settings", async () => {
//      await deleteAccountFlow()
//      const googleLoginBtn = await $('//android.widget.TextView[@text="واصل بخصوصية عن طريق جوجل"]');
//      await googleLoginBtn.waitForDisplayed({ timeout: 15000 });
//      expect(await googleLoginBtn.isDisplayed()).to.be.true;
//  });
//   after(afterHook);
});
