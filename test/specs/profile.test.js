const { expect } = require("chai");
const { loginWithGoogle } = require("../helpers/Login.helper");
const InfoForm = require("../helpers/InfoForm.helper");
const { popupClose, clearAppCache, NotificationAlertClose, closeRecordingPopup } = require("../helpers/app.helper");
const { beforeHook } = require("../hooks/splashscreen.hooks");
const profilePage = require("../pageobjects/profile.page");
const { openAndChangeCountryTo, getDisplayedCountry, searchAndSelectCountry } = require("../helpers/Profile.helper");

describe("Profile Suite", () => {

  before(async () => {
    await clearAppCache();
    await beforeHook();
  });



  it("TC-012 – Validate profile photo change", async () => {
         try{
          await closeRecordingPopup();
          }catch (err) {"::> No recording alert found"}
          try {
          await loginWithGoogle();
          await driver.pause(2000);
          }catch (err) {"::> Logging to an existing account"}
          try{
          await InfoForm.ValidInfoForm();
          } catch (err) {
          console.log("::> filling user form ");}
          try {
          await NotificationAlertClose();
          }catch (err) {"::> popup handling"}
          try {
          await popupClose();
          } catch (err) {
          console.log("::> popup handling");}
       await profilePage.openProfileScreen();
       await profilePage.profilePhoto.waitForDisplayed({ timeout: 15000 });
       const beforePhoto = await profilePage.profilePhoto.takeScreenshot();
       await profilePage.changeProfilePhotoByCamera();
       await profilePage.profilePhoto.waitForDisplayed({ timeout: 15000 });
       await driver.pause(5000); // UI refresh
       const afterPhoto = await profilePage.profilePhoto.takeScreenshot();
       expect(afterPhoto).to.not.equal(beforePhoto);
       console.log("Profile photo changed successfully");
   });

  it("TC-013 – Validate name change functionality", async () => {
    const newName = "test name";

    // Change name
//    await profilePage.openProfileScreen();
    await profilePage.setProfileName(newName);
    await profilePage.saveProfile();

    // Reopen profile to verify the name was saved
    await profilePage.openProfileScreen();
    const currentName = await profilePage.nameInput.getText();

    // Verify name was updated
    expect(currentName).to.equal(newName);
    console.log(`Name successfully changed to: ${currentName}`);
  });
//

it("TC-014 – Validate name rule reminder appears when focusing name field", async () => {

    // 1) Open profile screen
//    await profilePage.openProfileScreen();

    // 2) Tap on name input
    await profilePage.nameInput.waitForDisplayed({ timeout: 5000 });
    await profilePage.nameInput.click();

    // 3) Validate reminder is displayed (using Chai)
    const isReminderDisplayed = await profilePage.nameRuleReminder.isDisplayed();
    expect(isReminderDisplayed).to.be.true;

    const reminderText = await profilePage.nameRuleReminder.getText();
    console.log("Name rule reminder text:", reminderText);

});

 it("TC-015 – Validate invalid short name", async () => {

     const invalidName = "KM";

     // 1) Open profile screen
//     await profilePage.openProfileScreen();

     // 2) Type invalid name
     await profilePage.nameInput.waitForDisplayed({ timeout: 5000 });
     await profilePage.setProfileName(invalidName);

     // 3) Tap save
     await profilePage.saveProfile();
     driver.pause(1000);
     // 4) Check popup by text
     const popupDisplayed = await profilePage.invalidNamePopup.isDisplayed();
     expect(popupDisplayed).to.be.true;

     const popupText = await profilePage.invalidNamePopup.getText();
     console.log("sort name errortext:", popupText);

   });

   it("TC-016 – User is able to change the country by selecting from the list", async () => {
     await driver.back();
     await openAndChangeCountryTo("اليونان");
     const country = await getDisplayedCountry();
     expect(country).to.include("اليونان");
   });

   it("TC-017 – User is able to change the country through search component", async () => {
     await searchAndSelectCountry("الكويت");
     const country = await getDisplayedCountry();
     expect(country).to.include("الكويت");
   });

  after(async () => {
    await driver.pause(2000);
  });
});
