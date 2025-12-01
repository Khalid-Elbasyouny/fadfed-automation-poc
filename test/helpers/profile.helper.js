const profilePage = require("../pageobjects/profile.page");
const { expect } = require("chai");

// ===== Country Related Helpers =====
async function openAndChangeCountryTo(countryName) {
  await profilePage.openProfileScreen();
  await profilePage.selectCountryFromList(countryName);
}

async function searchAndSelectCountry(countryName) {
  await profilePage.selectCountryUsingSearch(countryName);
  await driver.pause(2000);
}

async function getDisplayedCountry() {
  await profilePage.openProfileScreen();
  return await profilePage.getSelectedCountryText();
}

// ===== Profile Photo Helpers =====
async function changeProfilePhotoByCamera() {
  await profilePage.openProfileScreen();
  await profilePage.changeProfilePhotoByCamera();
  // Add any additional verification or waiting logic here
}

// ===== Profile Name Helpers =====
async function updateProfileName(newName) {
  await profilePage.openProfileScreen();
  await profilePage.setProfileName(newName);
  await profilePage.saveProfile();
}

async function verifyNameValidation(badName) {
  await profilePage.setProfileName(badName);
  await profilePage.saveProfile();
  
  // Verify error message is displayed
  const isErrorDisplayed = await profilePage.nameError.isDisplayed();
  expect(isErrorDisplayed).to.be.true;
  
  // Return the error message text
  return await profilePage.nameError.getText();
}

module.exports = {
  // Country related exports
  openAndChangeCountryTo,
  getDisplayedCountry,
  searchAndSelectCountry,
  
  // Profile photo exports
  changeProfilePhotoByCamera,
  
  // Profile name exports
  updateProfileName,
  verifyNameValidation
};
