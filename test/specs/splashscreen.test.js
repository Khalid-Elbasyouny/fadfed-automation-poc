const { expect } = require("chai");
const { beforeHook, afterHook } = require("../hooks/splashscreen.hooks");

describe("TC-003 – Splash Screen on Launch", () => {
  before(beforeHook);

  it("should display splash screen on app launch", async () => {
    const splashtEXT = await $(
      'android=new UiSelector().text("أهلين و سهلين")'
    );
    await splashtEXT.waitForDisplayed({ timeout: 10000 });
    expect(await splashtEXT.isDisplayed()).to.be.true;
  });

  after(afterHook);
});
