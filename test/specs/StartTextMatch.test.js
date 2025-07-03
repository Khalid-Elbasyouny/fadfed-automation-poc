// const { expect } = require("chai");
// const LoginPage = require("../pageobjects/login.page");
// const { loginWithGoogle } = require("../helpers/Login.helper");
// const { beforeHook, afterHook } = require("../hooks/splashscreen.hooks");
// const { startTxtMatch } = require("../helpers/textMachStart.helper");

// describe("TC-011 – Start text match with default filters", () => {
//   before(beforeHook);

//   it("a text card should appears with the match data ", async () => {
//     const textCard = await $(
//       'android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/cardViewMatchFound")'
//     );
//     // await loginWithGoogle();
//     // await sucessInfoForm.fillInfoForm();
//     await startTxtMatch();

//     await textCard.waitForDisplayed({ timeout: 10000 });
//     expect(await textCard.isDisplayed()).to.be.true;
//   });

//   //   after(afterHook);
// });

/////////////

const { expect } = require("chai");
const { loginWithGoogle } = require("../helpers/Login.helper");
const sucessInfoForm = require("../helpers/InfoForm.helper");
const { beforeHook, afterHook } = require("../hooks/splashscreen.hooks");
const { startTxtMatch } = require("../helpers/textMatchStart.helper");
const { popupClose } = require("../helpers/DeleteAccount.helper");

describe("TC-011 – Start text match with default filters", () => {
  before(beforeHook);

  it("A text card should appear with the match data", async () => {
    const initialGoogleLoginButton = await $(
      '//android.widget.TextView[@text="واصل بخصوصية عن طريق جوجل"]'
    );
    const infoFormScreenTitle = await $(
      '//android.widget.TextView[@text="حياك بيننا"]'
    );
    const homeScreenContent = await $(
      'android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutMainContent")'
    );

    if (
      !(
        (await homeScreenContent.isExisting()) &&
        (await homeScreenContent.isDisplayed())
      )
    ) {
      if (
        !(
          (await infoFormScreenTitle.isExisting()) &&
          (await infoFormScreenTitle.isDisplayed())
        )
      ) {
        if (
          (await initialGoogleLoginButton.isExisting()) &&
          (await initialGoogleLoginButton.isDisplayed())
        ) {
          await loginWithGoogle();
          await driver.pause(5000);
        } else {
        }
      }

      if (
        (await infoFormScreenTitle.isExisting()) &&
        (await infoFormScreenTitle.isDisplayed())
      ) {
        await sucessInfoForm.fillInfoForm();
        await homeScreenContent.waitForDisplayed({ timeout: 15000 });
      }

      await homeScreenContent.waitForDisplayed({ timeout: 10000 });
      expect(await homeScreenContent.isDisplayed()).to.be.true;
    } else {
    }

    await startTxtMatch();

    const textCard = await $(
      'android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/cardViewMatchFound")'
    );
    await textCard.waitForDisplayed({ timeout: 20000 });
    expect(await textCard.isDisplayed()).to.be.true;

    await driver.pause(5000);
  });
});
