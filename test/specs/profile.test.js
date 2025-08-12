const { expect } = require("chai");
const { loginWithGoogle } = require("../helpers/Login.helper");
const InfoForm = require("../helpers/InfoForm.helper");
const { popupClose, clearAppCache, NotificationAlertClose } = require("../helpers/app.helper");
const { beforeHook } = require("../hooks/splashscreen.hooks");
const profilePage = require("../pageobjects/profile.page");
const { openAndChangeCountryTo, getDisplayedCountry, searchAndSelectCountry} = require("../helpers/Profile.helper");

describe("Profile Suite", () => {
  before(async () => {
    await clearAppCache();
    await beforeHook(); });

  it("TC-010 – User is able to change the country by selecting from the list", async () => {
    await loginWithGoogle();
    await driver.pause(2000);
    try {
      await InfoForm.ValidInfoForm();
    } catch (err) {
      console.log("::> Loginig to an existing account");
    }
    try {
       await NotificationAlertClose();
       await popupClose();
   } catch (err) {
     console.log("::> popup handling");
   }
    await openAndChangeCountryTo("اليونان");
    const country = await getDisplayedCountry();
    expect(country).to.include("اليونان");
  });


it("TC-011 – User is able to change the country through country search component", async () => {
//  await loginWithGoogle();
    await driver.pause(2000);
//    await profilePage.EditProfileSaveButton.click();
//    try {
//    await InfoForm.ValidInfoForm();
//  } catch (err) {
//    console.log("::> Login to an existing account");
//    }
//    try {
//      await NotificationAlertClose();
//      await popupClose();
//  } catch (err) {
//    console.log("::> popup handling");
//    }

  await searchAndSelectCountry("الكويت");
  const country = await getDisplayedCountry();
  expect(country).to.include("الكويت");
});
  after(async () => {
    await clearAppCache();
  });
});
