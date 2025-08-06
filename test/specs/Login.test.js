const { expect } = require("chai");
const { loginWithGoogle, loginWithFacebook, isLoggedIn , sendFeedbackFromLogin , openTermsAndConditions} = require("../helpers/Login.helper");
const { beforeHook, afterHook } = require("../hooks/splashscreen.hooks");
const { clearAppCache } = require("../helpers/app.helper");
const formScreenSelector = 'android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutContent")';
describe("Login Suite", () => {
    beforeEach(async () => {
             await clearAppCache();
             await beforeHook();
             });
  it("TC-001 –Login with fresh social media account.", async () => {
    if (!(await isLoggedIn())) {
      console.log("::> logging with Facebook...");
      await loginWithFacebook();
    } else {
      console.log("::> user already logged in");
    }

    const formScreen = await $(formScreenSelector);
    await formScreen.waitForDisplayed({ timeout: 10000 });
    expect(await formScreen.isDisplayed()).to.be.true;
  });


  it("TC-002 – Login with fresh Gmail account.", async () => {
    if (!(await isLoggedIn())) {
      console.log("::> logging with Google...");
      await loginWithGoogle();
    } else {
      console.log("::> user already logged in");
    }

    const formScreen = await $(formScreenSelector);
    await formScreen.waitForDisplayed({ timeout: 10000 });
    expect(await formScreen.isDisplayed()).to.be.true;
  });

  it("TC-007 -Verify user is able to send feedback from the login page.", async () => {
    await sendFeedbackFromLogin();

    const emailScreen = await $('android=new UiSelector().resourceId("com.google.android.gm:id/content")');
    await emailScreen.waitForDisplayed({ timeout: 8000 });
    expect(await emailScreen.isDisplayed()).to.be.true;
  });



  it('TC-008 - Verify the functionality of terms & conditions, Policy terms hyperlink in login screen.', async () => {
      await openTermsAndConditions();

      const currentUrl = await driver.getUrl();
      expect(currentUrl).to.equal("https://fdfd.me/terms");

      //back to Native App
      const contexts = await driver.getContexts();
      const nativeContext = contexts.find(c => c.includes('NATIVE_APP'));
      if (nativeContext) {
          await driver.switchContext(nativeContext);
      }
  });
   after(afterHook);
});


