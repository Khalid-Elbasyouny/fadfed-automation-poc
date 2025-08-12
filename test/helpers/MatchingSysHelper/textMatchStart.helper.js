//const MatchingPage = require("../../pageobjects/Matching.page");
//async function startTxtMatch() {
// await MatchingPage.openMatchingScreen();
//
// await  MatchingPage.tapallGenders();
//
//  const AcceptRules = await driver.$(
//    "id:sa.fadfed.fadfedapp:id/buttonContinue"
//  );
//  if ((await AcceptRules.isExisting()) && (await AcceptRules.isDisplayed())) {
//    console.log("::> Accept Rules button is displayed. Clicking it.");
//    await AcceptRules.click();
//    await driver.pause(500);
//  } else {
//    console.log("::> Accept Rules button not displayed. Skipping.");
//  }
//
//  const AcceptProhibitions = await driver.$("id:sa.fadfed.fadfedapp:id/buttonContinue");
//
//  if ((await AcceptProhibitions.isExisting()) && (await AcceptProhibitions.isDisplayed())) {
//    console.log("::> Accept Prohibitions button is displayed. Clicking it.");
//    await AcceptProhibitions.click();
//    await driver.pause(500);
//  } else {
//    console.log("::> Accept Prohibitions button not displayed. Skipping.");
//  }
//}
//
//module.exports = {
//  startTxtMatch,
//};