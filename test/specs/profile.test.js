//const { expect } = require("chai");
//const { loginWithGoogle } = require("../helpers/Login.helper");
//const InfoForm = require("../helpers/InfoForm.helper");
//const { popupClose, clearAppCache, NotificationAlertClose } = require("../helpers/app.helper");
//const profilePage = require("../pageobjects/Profile.page");
//const { beforeHook } = require("../hooks/splashscreen.hooks");
//
//describe("Profile Suite", () => {
//    beforeEach(async () => {
//             await clearAppCache();
//             await beforeHook();
//             });
//  it("TC-010 – User is able to change the country by selecting from the list", async () => {
//    await loginWithGoogle();
//    try {
//    await InfoForm.ValidInfoForm();
//    } catch (err) {
//       console.log("::> Loginig to an existing account");
//        }
//    await NotificationAlertClose();
//    await popupClose();
//    await profilePage.openProfileScreen();
//    await profilePage.selectCountryFromList("العراق");
//    await profilePage.openProfileScreen();
//    expect(await profilePage.getSelectedCountryText()).to.include("العراق");
//  });
//
//
//it("TC-011 – User is able to change the country by searching ", async () => {
//    await loginWithGoogle();
//    try {
//    await InfoForm.ValidInfoForm();
//    } catch (err) {
//       console.log("::> Loginig to an existing account");
//        }
//    await NotificationAlertClose();
//    await popupClose();
//    await profilePage.openProfileScreen();
//    await profilePage.selectCountryFromList("العراق");
//    await profilePage.openProfileScreen();
//    expect(await profilePage.getSelectedCountryText()).to.include("العراق");
//  });
//
//  after(async () => {
//    await clearAppCache();
//    });
//});
//------------------

const { expect } = require("chai");
const { loginWithGoogle } = require("../helpers/Login.helper");
const InfoForm = require("../helpers/InfoForm.helper");
const { popupClose, clearAppCache, NotificationAlertClose } = require("../helpers/app.helper");
const { beforeHook } = require("../hooks/splashscreen.hooks");
const { openAndChangeCountryTo, getDisplayedCountry, searchAndSelectCountry} = require("../helpers/Profile.helper");

describe("Profile Suite", () => {
  beforeEach(async () => {
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
    await openAndChangeCountryTo("العراق");
    const country = await getDisplayedCountry();
    expect(country).to.include("العراق");
  });


it("TC-011 – User is able to change the country through country search component", async () => {
  await loginWithGoogle();
  await driver.pause(2000);
    try {
    await InfoForm.ValidInfoForm();
  } catch (err) {
    console.log("::> Login to an existing account");
    }
    try {
      await NotificationAlertClose();
      await popupClose();
  } catch (err) {
    console.log("::> popup handling");
    }

  await searchAndSelectCountry("روسيا");


  const country = await getDisplayedCountry();
  expect(country).to.include("روسيا");
});
  after(async () => {
    await clearAppCache();
  });
});
