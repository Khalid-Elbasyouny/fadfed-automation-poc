const LoginPage = require("../pageobjects/Login.page");
module.exports = {
//facebook callback::
  async loginWithFacebook() {
    await LoginPage.tapFacebookLogin();
    await driver.pause(2000);
    await LoginPage.selectFacebookAccountIfNeeded();
  },
//google callback::
  async loginWithGoogle() {
    await LoginPage.tapGoogleLogin();
    await LoginPage.selectAnyGoogleAccount();
  },
//feedback callback::
  async sendFeedbackFromLogin() {
      await LoginPage.tapFeedbackButton();
    },
//terms & feedback callback::
  async openTermsAndConditions() {
      await LoginPage.tapTermsLink();

      // انتظر حتى يظهر WEBVIEW
      await driver.waitUntil(
          async () => {
              const contexts = await driver.getContexts();
              return contexts.some((c) => c.includes('WEBVIEW'));
          },
          {
              timeout: 10000,
              interval: 500,
              timeoutMsg: 'WEBVIEW context not found within timeout'
          }
      );

      const contexts = await driver.getContexts();
      const webviewContext = contexts.find(c => c.includes('WEBVIEW'));
      await driver.switchContext(webviewContext);
  },
//check if user is logged in::
//  async isLoggedIn() {
//    const formScreen = await $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutContent")');
//    return formScreen.isExisting();
//  }

async isLoggedIn() {
    // selectors for possible logged-in screens
    const formScreen = await $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutContent")');
    const popupScreen = await $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/rating_buttons")');
    const notificationScreen = await $('android=new UiSelector().textContains("إشعارات من الآخرين")');
    const homeScreen = await $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutMainContent")');

    // Small pause to let UI settle
    await driver.pause(1000);

    // Return true if ANY of the screens exist
    return (
        await formScreen.isExisting().catch(() => false) ||
        await popupScreen.isExisting().catch(() => false) ||
        await notificationScreen.isExisting().catch(() => false) ||
        await homeScreen.isExisting().catch(() => false)
    );
}
};
//
