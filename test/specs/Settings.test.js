const { expect } = require("chai");
const InfoForm = require("../helpers/InfoForm.helper");
const { loginWithGoogle } = require("../helpers/Login.helper");
const { popupClose , NotificationAlertClose, closeRecordingPopup  } = require("../helpers/app.helper");
const { beforeHook , afterHook } = require("../hooks/splashscreen.hooks");
const { verifySettingsOptions , verifyAlertsToggles, toggleNightModeAndCheck, changeChatBackground , verifyHelpSections , sendFeedback , deleteAccountFlow } = require("../helpers/Settings.helper");

describe("Settings Suite", () => {
  before(async () => {
//    await beforeHook();

  });

  it("TC-064 – UI/UX of Settings screen", async () => {
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
//    await popupClose();
//    } catch (err) {
//    console.log("::> popup handling");}
    await verifySettingsOptions();
  });



//  it("TC-065 – Verify user is able to switch light mode to dark mode & vice-versa", async () => {
//    const { initialState, afterToggleOn, afterToggleOff } = await toggleNightModeAndCheck();
//
//    expect(afterToggleOn).to.equal(true);   // لازم يبقى ON بعد أول toggle
//    expect(afterToggleOff).to.equal(false); // لازم يرجع OFF بعد تاني toggle
//  });
//
//  it("TC-066 – Verify user is able to change chat background", async () => {
//    const pageSource = await changeChatBackground()
//    expect(pageSource).to.include("تم تغيير الخلفية بنجاح");
//  });

  it('TC-067 – Verify the toggles are working in alert section of settings page', async () => {
      const resultOff = await verifyAlertsToggles()
      expect(resultOff.outApp.before).to.not.equal(resultOff.outApp.after);
      expect(resultOff.inApp.before).to.not.equal(resultOff.inApp.after);
      expect(resultOff.anon.before).to.not.equal(resultOff.anon.after);
      const resultOn = await verifyAlertsToggles()
      expect(resultOn.outApp.before).to.not.equal(resultOn.outApp.after);
      expect(resultOn.inApp.before).to.not.equal(resultOn.inApp.after);
      expect(resultOn.anon.before).to.not.equal(resultOn.anon.after);
  });

//  it("TC-068 – Verify the contents and hyperlinks are working under help section of settings page", async function () {
//      await verifyHelpSections();
//  });
//
//  it("TC-069 – Verify user is able to send feedback through help section (email, X, instagram)", async () => {
//      // 📩 Email
//      const gmailChip = await sendFeedback("email");
//      await gmailChip.waitForDisplayed({ timeout: 30000 });
//      const chipText = await gmailChip.getText();
//      expect(chipText).to.include("support@fdfd.me");
//      await beforeHook()
//      try{
//      await closeRecordingPopup();
//      }catch (err) {"::> No recording alert found"}
//      // 🐦 Twitter
//      const twitterApp = await sendFeedback("twitter");
//      expect(twitterApp).to.equal("com.android.chrome");
//      await beforeHook()
//      try{
//      await closeRecordingPopup();
//      }catch (err) {"::> No recording alert found"}
//      // 📸 Instagram
//      const instagramApp = await sendFeedback("instagram");
//      expect(instagramApp).to.equal("com.android.chrome");
//      await beforeHook()
//      try{
//      await closeRecordingPopup();
//      }catch (err) {"::> No recording alert found"}
//      await driver.back();
//      await driver.back();
//  });

//  it("TC-070 – Verify user is able to delete account from settings", async () => {
//      await deleteAccountFlow()
//      const googleLoginBtn = await $('//android.widget.TextView[@text="واصل بخصوصية عن طريق جوجل"]');
//      await googleLoginBtn.waitForDisplayed({ timeout: 15000 });
//      expect(await googleLoginBtn.isDisplayed()).to.be.true;
//  });
//   after(afterHook);
});
