async function DeleteHelper() {
  const profileSetting = await driver.$("accessibility id:حسابي");
  await profileSetting.waitForDisplayed({ timeout: 1000 });
  await profileSetting.click();

  await driver.pause(1500);

  await driver
    .action("pointer")
    .move({ duration: 0, x: 510, y: 1777 })
    .down({ button: 0 })
    .move({ duration: 1000, x: 538, y: 777 })
    .up({ button: 0 })
    .perform();

  await driver.pause(1000);

  const deleteAcc = await driver.$(
    '-android uiautomator:new UiSelector().text("حذف الحساب")'
  );
  await deleteAcc.waitForDisplayed({ timeout: 2000 });

  await deleteAcc.click();
  const confirmDel = await driver.$("id:android:id/button1");
  await confirmDel.waitForDisplayed({ timeout: 2000 });
  await confirmDel.click();
}

async function popupClose() {
  const popupClose = await driver.$("id:sa.fadfed.fadfedapp:id/button_dismiss");
  await popupClose.waitForDisplayed({ timeout: 10000 });
  await popupClose.click();
}

module.exports = {
  DeleteHelper,
  popupClose,
};
