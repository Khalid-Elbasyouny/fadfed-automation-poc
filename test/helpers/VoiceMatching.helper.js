const matchingPage = require("../pageobjects/matching.page");

async function goToVoiceMatching() {
    await matchingPage.openMatchingScreen();
    await matchingPage.tapVoiceConversation();
}

async function selectAllGenders() {
    await matchingPage.tapAllGenders();
}

async function isRulesPopupDisplayed() {
    const popup = await $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/recyclerViewInstructions")');
    // غيرلي resourceId هنا لو عندك ID مختلف للـ rules popup
    return popup.isDisplayed();
}
async function bypassProfile() {
  // تأكد إن زر Pass موجود
  await matchingPage.passButton.waitForDisplayed({ timeout: 10000 });
  await matchingPage.tapPassButton();

  // بعد الضغط نستنى الكارت الجديد يظهر
  await driver.pause(2000); // ندي شوية وقت للكارت الجديد يظهر
  const isDisplayed = await matchingPage.passButton.isDisplayed();
  const isEnabled = await matchingPage.passButton.isEnabled();

  return { isDisplayed, isEnabled };
}


async function handleRulesPopups() {
  // popup 1
  const AcceptRules = await driver.$("id:sa.fadfed.fadfedapp:id/buttonContinue");
  if (await AcceptRules.isExisting() && await AcceptRules.isDisplayed()) {
    console.log("::> Accept Rules button is displayed. Clicking it.");
    await AcceptRules.click();
    await driver.pause(500);
  } else {
    console.log("::> Accept Rules button not displayed. Skipping.");
  }

  // popup 2
  const AcceptProhibitions = await driver.$("id:sa.fadfed.fadfedapp:id/buttonContinue");
  if (await AcceptProhibitions.isExisting() && await AcceptProhibitions.isDisplayed()) {
    console.log("::> Accept Prohibitions button is displayed. Clicking it.");
    await AcceptProhibitions.click();
    await driver.pause(500);
  } else {
    console.log("::> Accept Prohibitions button not displayed. Skipping.");
  }
}

module.exports = {
    handleRulesPopups,
    bypassProfile,
    goToVoiceMatching,
    selectAllGenders,
    isRulesPopupDisplayed
};