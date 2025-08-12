const Page = require("./page");
const MatchingPage = require("./Matching.page");
class WelcomeBonusPage extends Page {

  get myGemsButton() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/textViewDiamonds")');
    }

  get PackagesView(){
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/viewPager")');
    }

  get GemsPackageFirst() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/container").instance(0)');
    }

  get PurchaseScreen() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutPurchaseScreen")');
    }

  async tapMyGemsButton() {
    await this.myGemsButton.waitForDisplayed({ timeout: 10000 });
    await this.myGemsButton.click();
  }
  async selectFirstGemPackage() {
    await this.gemsPackageFirst.waitForDisplayed({ timeout: 10000 });
    await this.gemsPackageFirst.click();
  }

  async isPackagesViewVisible() {
    return await this.PackagesView.isDisplayed();
  }
}

module.exports = new WelcomeBonusPage();
