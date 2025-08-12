class SubscriptionPage {
    // Selectors
    get premiumUserPhoto() {
        return $(`id:sa.fadfed.fadfedapp:id/layoutUserPhotoPremium`);
    }

    get normalUserPhoto() {
        return $(`id:sa.fadfed.fadfedapp:id/imageViewUserPhoto`);
    }

    // Actions
    async isPremiumPhotoDisplayed() {
        return await this.premiumUserPhoto.isDisplayed();
    }

    async isNormalPhotoDisplayed() {
        return await this.normalUserPhoto.isDisplayed();
    }
}

module.exports = new SubscriptionPage();
