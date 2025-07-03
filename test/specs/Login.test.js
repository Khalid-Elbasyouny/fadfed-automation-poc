const { expect } = require("chai");
const LoginPage = require("../pageobjects/login.page");
const { loginWithGoogle } = require("../helpers/Login.helper");
const { beforeHook, afterHook } = require("../hooks/splashscreen.hooks");

describe("TC-004 – Login using Gmail", () => {
  before(beforeHook);

  it("should login using first Google account", async () => {
    const formScreenTitle = await $(
      'android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutContent")'
    );

    const isLoggedIn = await formScreenTitle.isExisting();

    if (!isLoggedIn) {
      console.log("::> logging with google...");
      await loginWithGoogle();
    } else {
      console.log("::> user already logedin");
    }

    await formScreenTitle.waitForDisplayed({ timeout: 10000 });
    expect(await formScreenTitle.isDisplayed()).to.be.true;
  });

  //   after(afterHook);
});
