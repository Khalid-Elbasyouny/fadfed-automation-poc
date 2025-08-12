const Page = require("./page");

class LoginPage extends Page {
  //Facebook::
  get facebookLoginButton() {
    return $('//android.widget.TextView[@text="واصل بخصوصية عن طريق فايسبوك"]');
  }

  async tapFacebookLogin() {
    await this.facebookLoginButton.waitForDisplayed({ timeout: 5000 });
    await this.facebookLoginButton.click();
        await driver.pause(3000);
  }

  async selectFacebookAccountIfNeeded() {
    const fbWebViewBtn = await $('android=new UiSelector().textContains("Continue as")');

    const isFbBtnExist = await fbWebViewBtn.isExisting();
    if (isFbBtnExist) {
      await fbWebViewBtn.waitForDisplayed({ timeout: 8000 });
      await fbWebViewBtn.click();
      await driver.pause(2000);
      console.log("✅ Facebook: Continue button clicked");
    } else {
      console.log("ℹ️ No Facebook 'Continue as' button found");
    }
  }



  //Google::
  get googleLoginButton() {
    return $('//android.widget.TextView[@text="واصل بخصوصية عن طريق جوجل"]');
  }
  get googleAccountsList() {
    return $$('android=new UiSelector().resourceId("com.google.android.gms:id/container")');
  }
  get agreeAndShareButton() {
    return $('android=new UiSelector().resourceId("com.google.android.gms:id/agree_and_share_button")');
  }
  async tapGoogleLogin() {
    await this.googleLoginButton.waitForDisplayed({ timeout: 5000 });
    await this.googleLoginButton.click();
    await driver.pause(2000);
  }
  async selectAnyGoogleAccount() {
    const accounts = await this.googleAccountsList;
    await driver.pause(2000);
    if (accounts.length === 0) {
      throw new Error("❌ No Google accounts found to select.");
    }

    await accounts[0].click();
    await driver.pause(2000);

    const agreeBtn = await this.agreeAndShareButton;
    if (await agreeBtn.isExisting()) {
      await agreeBtn.waitForDisplayed({ timeout: 5000 });
      await agreeBtn.click();
      await driver.pause(3000);
      console.log("✅ Agree button clicked");
    } else {
      console.log("ℹ️ No Agree button found, continuing...");
    }
  }
  //feedback::
  get feedbackButton() {
      return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutHelpButton")');
    }

  async tapFeedbackButton() {
      await this.feedbackButton.waitForDisplayed({ timeout: 8000 });
      await this.feedbackButton.click();
  }
//terms & feadback::
  get termsLink() {
      return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/textViewTerms")');
    }

  async tapTermsLink() {
      await this.termsLink.waitForDisplayed({ timeout: 5000 });
      await this.termsLink.click();
  }
}

module.exports = new LoginPage();


