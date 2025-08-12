const profilePage = require("../pageobjects/profile.page");
const subscriptionPage = require("../pageobjects/subscription.page");

async function checkIfUserIsPremium() {
    await profilePage.TapSetting.click();

    if (await subscriptionPage.isPremiumPhotoDisplayed()) {
        console.log("✅ User is Premium With a crown activated");
        return true;
    }
    if (await subscriptionPage.isNormalPhotoDisplayed()) {
        console.log("ℹ️ User is NOT Premium or crown is not activated");
        return false;
    }

    throw new Error("❌ Could not detect user type");
}

module.exports = {
    checkIfUserIsPremium
};
