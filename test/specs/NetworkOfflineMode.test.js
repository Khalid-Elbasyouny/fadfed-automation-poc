const { beforeHook } = require("../hooks/splashscreen.hooks");

describe('Offline mode validation', () => {

  before(async () => {
    await driver.setNetworkConnection(0); // offline
  });

  it(' ⚡ should show no internet banner', async () => {
//    await beforeHook();
    const noInternetBanner = await $('id=sa.fadfed.fadfedapp:id/layoutNoInternet');
    expect(noInternetBanner).toBeDisplayed();
    await driver.pause(2000);
  });
  after(async () => {
    await driver.setNetworkConnection(6); // online
  });
});