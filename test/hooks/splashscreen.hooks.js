module.exports = {
  beforeHook: async () => {
    console.log("📱 Activating app before tests...");
    await driver.activateApp("sa.fadfed.fadfedapp");
    await driver.pause(3000);
  },

  afterHook: async () => {
    console.log("🛑 Closing app after tests...");
    await driver.terminateApp("sa.fadfed.fadfedapp");
  },
//
};
