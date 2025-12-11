const { expect } = require("chai");
const { loginWithGoogle, loginWithFacebook, isLoggedIn , sendFeedbackFromLogin , openTermsAndConditions} = require("../helpers/Login.helper");
const { beforeHook, afterHook } = require("../hooks/splashscreen.hooks");
const { clearAppCache, closeRecordingPopup } = require("../helpers/app.helper");
const formScreenSelector = 'android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutContent")';
const { sendFeedback } = require("../helpers/Settings.helper");
const { NotificationAlertClose } = require("../helpers/Settings.helper");
const { popupClose } = require("../helpers/Settings.helper");

describe("Login Suite", () => {
    before(async () => {
             await clearAppCache();
             await beforeHook();
             await driver.pause(1000);
//             await closeRecordingPopup();
             });

  it(" ⚡ Verify user is able to send feedback from the login page.", async () => {

    await sendFeedbackFromLogin();

    const emailScreen = await $('android=new UiSelector().resourceId("com.google.android.gm:id/content")');
    await emailScreen.waitForDisplayed({ timeout: 10000 });
    expect(await emailScreen.isDisplayed()).to.be.true;
  });


  it(' ⚡ Verify the functionality of terms & conditions, Policy terms hyperlink in login screen.', async () => {
    await clearAppCache();
    await beforeHook();
    await driver.pause(1000);
//    await closeRecordingPopup();
    const urlBar = await openTermsAndConditions();
    const currentUrl = await urlBar.getText();
    expect(currentUrl).to.include("fdfd.me/terms");
    await driver.activateApp("sa.fadfed.fadfedapp");
  });

  it(" ⚡ Login with fresh social media account.", async () => {
    if (!(await isLoggedIn())) {
      console.log("::> logging with Facebook...");
      await loginWithFacebook();
    } else {
      console.log("::> user already logged in");
    }
    await driver.pause(5000);
    const LoginStats = await isLoggedIn();
    expect(await LoginStats).to.be.true;
    await driver.pause(5000);
  });


  it(" ⚡ Login with fresh Gmail account.", async () => {
      await clearAppCache();
      await beforeHook();
      await driver.pause(1000);
//    await closeRecordingPopup();
    if (!(await isLoggedIn())) {
      console.log("::> logging with Google...");
      await loginWithGoogle();
    } else {
      console.log("::> user already logged in");
    }
    await driver.pause(3000);
    const LoginStats = await isLoggedIn();
    expect(await LoginStats).to.be.true;
  });

//   after(afterHook);
});


