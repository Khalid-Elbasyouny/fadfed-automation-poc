const { beforeHook } = require("../hooks/splashscreen.hooks");

describe('TC-086 – Offline mode validation', () => {

  before(async () => {
    await driver.setNetworkConnection(0); // offline
  });

  it('should show no internet banner', async () => {
    await beforeHook();
    const noInternetBanner = await $('id=sa.fadfed.fadfedapp:id/layoutNoInternet');
    expect(noInternetBanner).toBeDisplayed();
  });
  after(async () => {
    await driver.setNetworkConnection(6);
  });
});