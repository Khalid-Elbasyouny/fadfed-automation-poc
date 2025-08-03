module.exports = {
  beforeHook: async () => {
    console.log("📱 Activating app before tests...");
    await driver.activateApp("sa.fadfed.fadfedapp");
    await driver.pause(3000);
  },
//  beforeHook: async () => {
//    console.log("⏳ Clearing app data before test...");
//
//    const result = await driver.execute('mobile: shell', {
//      command: 'pm',
//      args: ['clear', 'sa.fadfed.fadfedapp'],
//    });
//
//    console.log("Shell result:", result); // دي هتطبعلك output pm clear
//
//    await driver.launchApp();
//    console.log("✅ App data cleared and app launched.");
//  },
//
  afterHook: async () => {
    console.log("🛑 Closing app after tests...");
    await driver.terminateApp("sa.fadfed.fadfedapp"); // optional
  },
//
};
