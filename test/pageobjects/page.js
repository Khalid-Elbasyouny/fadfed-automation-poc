module.exports = class Page {
  async waitForElementToBeVisible(element, timeout = 10000) {
    await element.waitForDisplayed({ timeout });
  }

  async tap(element) {
    await this.waitForElementToBeVisible(element);
    await element.click();
  }
};
