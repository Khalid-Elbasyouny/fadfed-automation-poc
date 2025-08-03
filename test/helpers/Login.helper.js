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
  async isLoggedIn() {
    const formScreen = await $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutContent")');
    return formScreen.isExisting();
  }
};
