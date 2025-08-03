const { expect } = require("chai");
const { loginWithGoogle } = require("../helpers/Login.helper");
const ValidInfoForm = require("../helpers/InfoForm.helper");
const { beforeHook, afterHook } = require("../hooks/splashscreen.hooks");

describe("Submit valid user info", () => {
  before(beforeHook);

  it("should fill valid info form", async () => {
    const formScreenTitle = await $(
      '//android.widget.TextView[@text="حياك بيننا"]'
    );
    const isLoggedIn = await formScreenTitle.isExisting();

    if (!isLoggedIn) {
      console.log("::>logging...");
      await loginWithGoogle();
    } else {
      console.log("::>user already logged");
    }

    await ValidInfoForm.fillInfoForm();

    const ratingScreen = await $(
      'android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/title")'
    );
    await ratingScreen.waitForDisplayed({ timeout: 10000 });
    expect(await ratingScreen.isDisplayed()).to.be.true;

    await driver.pause(5000);
  });

  //   after(afterHook);
});
