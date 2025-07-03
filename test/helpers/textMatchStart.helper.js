async function startTxtMatch() {
  const fadfedMatchBTN = await driver.$(
    '-android uiautomator:new UiSelector().resourceId("sa.fadfed.fadfedapp:id/navigation_bar_item_icon_view").instance(1)'
  );
  await driver.pause(500);
  await fadfedMatchBTN.waitForDisplayed({ timeout: 2000 });
  await fadfedMatchBTN.click();

  const allGenders = await driver.$(
    '-android uiautomator:new UiSelector().className("android.widget.RelativeLayout").instance(1)'
  );
  await driver.pause(500);
  await allGenders.click();

  const AcceptRules = await driver.$(
    "id:sa.fadfed.fadfedapp:id/buttonContinue"
  );
  if ((await AcceptRules.isExisting()) && (await AcceptRules.isDisplayed())) {
    console.log("::> Accept Rules button is displayed. Clicking it.");
    await AcceptRules.click();
    await driver.pause(500);
  } else {
    console.log("::> Accept Rules button not displayed. Skipping.");
  }

  const AcceptProhibitions = await driver.$(
    "id:sa.fadfed.fadfedapp:id/buttonContinue"
  );

  if (
    (await AcceptProhibitions.isExisting()) &&
    (await AcceptProhibitions.isDisplayed())
  ) {
    console.log("::> Accept Prohibitions button is displayed. Clicking it.");
    await AcceptProhibitions.click();
    await driver.pause(500);
  } else {
    console.log("::> Accept Prohibitions button not displayed. Skipping.");
  }
}

module.exports = {
  startTxtMatch,
};
