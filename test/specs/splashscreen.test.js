//const { expect } = require("chai");
//const { beforeHook, afterHook } = require("../hooks/splashscreen.hooks");
//
//describe("Splash Screen on Launch", () => {
//  before(beforeHook);
//
//  it("should display splash screen on app launch", async () => {
//    const splashText= await $(
//      'android=new UiSelector().text("أهلين و سهلين")'
//    );
//    await splashText.waitForDisplayed({ timeout: 10000 });
//    expect(await splashText.isDisplayed()).to.be.true;
//  });
//
////  after(afterHook);
//});
