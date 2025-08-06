const { expect } = require("chai");
const { loginWithGoogle } = require("../helpers/Login.helper");
const InfoForm = require("../helpers/InfoForm.helper");
const { DeleteHelper, popupClose , NotificationAlertClose } = require("../helpers/DeleteAccount.helper");
const { beforeHook, afterHook } = require("../hooks/splashscreen.hooks");

describe("TC-022 - PoC: Account Deletion", () => {
  before(beforeHook);
  it("should successfully delete an account after logging", async () => {
    async function getAppState() {
      const homeScreenContent = await $(
        'android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutMainContent")'
      );
      const infoFormScreenTitle = await $(
        '//android.widget.TextView[@text="حياك بيننا"]'
      );
      const initialGoogleLoginButton = await $(
        '//android.widget.TextView[@text="واصل بخصوصية عن طريق جوجل"]'
      );

      if (await homeScreenContent.isDisplayed()) {
        return "HOME_SCREEN";
      } else if (await infoFormScreenTitle.isDisplayed()) {
        return "INFO_FORM_SCREEN";
      } else if (await initialGoogleLoginButton.isDisplayed()) {
        return "LOGIN_SCREEN";
      } else {
        return "UNKNOWN_STATE";
      }
    }

    try {
      let appState = await getAppState();

      switch (appState) {
        case "LOGIN_SCREEN":
          console.log("::> On login screen. Performing Google login...");
          await loginWithGoogle();
          await InfoForm.ValidInfoForm({ timeout: 5000 });
          break;
        case "INFO_FORM_SCREEN":
          console.log("::> On info form. Filling form...");
          await InfoForm.ValidInfoForm({ timeout: 5000 });
          break;
        case "HOME_SCREEN":
          console.log("::> Already on home screen. Ready.");
          break;
        default:
          console.log("::> Unknown state, attempting to close popup...");
      }
      try {
        await NotificationAlertClose();
      } catch (err) {
        console.log("::> No NOTIFICATION_ALERT found or could not close it");
      }
      // محاولة إغلاق البوب-أب إذا كان موجودًا
      try {
        await popupClose();
      } catch (err) {
        console.log("::> No popup found or could not close it");
      }

      // تنفيذ حذف الحساب
      await DeleteHelper();

      // التحقق من العودة لشاشة تسجيل الدخول
      const googleLoginButton = await $(
        '//android.widget.TextView[@text="واصل بخصوصية عن طريق جوجل"]'
      );
      await googleLoginButton.waitForDisplayed({ timeout: 15000 });
      expect(await googleLoginButton.isDisplayed()).to.be.true;

      console.log("::> Account deletion successfully demonstrated!");
    } catch (error) {
      console.error("::> Test failed:", error);
      throw error;
    }
  });
});