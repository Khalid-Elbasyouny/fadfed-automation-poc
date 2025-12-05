async function clearAppCache() {
  console.log("Clearing app cache...");
  await driver.execute('mobile: shell', {
    command: 'pm',
    args: ['clear', 'sa.fadfed.fadfedapp'],
  });
}
async function NotificationAlertClose() {
  const NotificationAlertClose = await driver.$("id:sa.fadfed.fadfedapp:id/buttonRemindLater") || await driver.$("id:android:id/button2");
  await NotificationAlertClose.waitForDisplayed({ timeout: 5000 });
  await NotificationAlertClose.click();
}
async function popupClose() {
  const popupClose = await driver.$("id:sa.fadfed.fadfedapp:id/button_dismiss");
  await popupClose.waitForDisplayed({ timeout: 5000 });
  await popupClose.click();
}
async function closeRecordingPopup() {
    try {
        const cancelBtn = await $(`android=new UiSelector().resourceId("android:id/button2")`);

        if (await cancelBtn.isDisplayed()) {
            await cancelBtn.click();
            console.log("System popup detected and dismissed.");
            return true;
        }
    } catch (err) {
        // مفيش popup، نكمل عادي
        console.log("No system popup appeared.");
    }
    return false;
}

module.exports = {
  closeRecordingPopup,
  clearAppCache,
  popupClose,
  NotificationAlertClose,
};
