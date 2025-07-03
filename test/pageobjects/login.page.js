const Page = require("./page");

class LoginPage extends Page {
  get googleLoginButton() {
    return $('//android.widget.TextView[@text="واصل بخصوصية عن طريق جوجل"]');
  }

  get facebookLoginButton() {
    return $('//android.widget.TextView[@text="واصل بخصوصية عن طريق فايسبوك"]');
  }

  async tapGoogleLogin() {
    await this.googleLoginButton.waitForDisplayed({ timeout: 5000 });
    await this.googleLoginButton.click();
    await browser.pause(4000);
  }

  async selectAnyGoogleAccount() {
    const accounts = await $$(
      'android=new UiSelector().resourceId("com.google.android.gms:id/container")'
    );

    if (accounts.length === 0) {
      throw new Error("No Google accounts found to select.");
    }

    await accounts[0].click();
    await browser.pause(2000);

    const agreeBtnSelector =
      'android=new UiSelector().resourceId("com.google.android.gms:id/agree_and_share_button")';
    const agreeBtn = await $(agreeBtnSelector);
    const isAgreeBtnExisting = await agreeBtn.isExisting();

    if (isAgreeBtnExisting) {
      await agreeBtn.waitForDisplayed({ timeout: 5000 });
      await agreeBtn.click();
      await browser.pause(3000);
      console.log("✅ Agree button clicked");
    } else {
      console.log("ℹ️ No Agree button found, continuing...");
    }
  }
}

module.exports = new LoginPage();
