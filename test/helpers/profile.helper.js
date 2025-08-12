const profilePage = require("../pageobjects/profile.page");

async function openAndChangeCountryTo(countryName) {
  await profilePage.openProfileScreen();
  await profilePage.selectCountryFromList(countryName);
}
async function searchAndSelectCountry(countryName) {
//  await profilePage.openProfileScreen();
  await profilePage.selectCountryUsingSearch(countryName);
  await driver.pause(2000);
}
async function getDisplayedCountry() {
  await profilePage.openProfileScreen();
  return await profilePage.getSelectedCountryText();
}


module.exports = {
  openAndChangeCountryTo,
  getDisplayedCountry,
  searchAndSelectCountry
};
