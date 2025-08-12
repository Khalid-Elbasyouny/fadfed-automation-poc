const welcomeBonusPage = require("../pageobjects/WelcomeBonus.page");
const MatchingPage = require("../pageobjects/Matching.page");
async function navigateToGemsPackages() {
  await MatchingPage.openMatchingScreen();
  await welcomeBonusPage.tapMyGemsButton();
}

module.exports = { navigateToGemsPackages };
