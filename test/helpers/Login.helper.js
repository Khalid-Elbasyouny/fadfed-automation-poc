const LoginPage = require("../pageobjects/login.page");

module.exports = {
  async loginWithGoogle() {
    await LoginPage.tapGoogleLogin();
    await driver.pause(1000);
    await LoginPage.selectAnyGoogleAccount();
  },
};
