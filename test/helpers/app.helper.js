async function clearAppCache() {
  console.log("Clearing app cache...");
  await driver.execute('mobile: shell', {
    command: 'pm',
    args: ['clear', 'sa.fadfed.fadfedapp'],
  });
}
async function NotificationAlertClose() {
  const NotificationAlertClose = await driver.$("id:sa.fadfed.fadfedapp:id/buttonRemindLater");
  await NotificationAlertClose.waitForDisplayed({ timeout: 5000 });
  await NotificationAlertClose.click();
}
async function popupClose() {
  const popupClose = await driver.$("id:sa.fadfed.fadfedapp:id/button_dismiss");
  await popupClose.waitForDisplayed({ timeout: 10000 });
  await popupClose.click();
}
module.exports = {
  clearAppCache,
  popupClose,
  NotificationAlertClose,
};
