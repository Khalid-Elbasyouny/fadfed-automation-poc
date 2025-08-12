const Page = require("./page");

class profilePage extends Page{
  get TapSetting() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/navigation_settings")');
  }

  get EditProfile() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutUserInfoContainer")');
  }

  get countryField() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutCountry")');
  }

  get countryPicker() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/design_bottom_sheet")');
  }

  get EditProfileSaveButton() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutEndButton")');
  }

  get countrySearchInput() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/editTextSearchCountries")');
  }

  async swipeDownMultipleTimes(times =1) {
  for (let i = 0; i < times; i++) {
    await driver
      .action('pointer', { parameters: { pointerType: 'touch' } })
      .move({ duration: 0, x: 731, y: 2144 }) // start point
      .down({ button: 0 })
      .move({ duration: 1000, x: 724, y: 850 }) // end point
      .up({ button: 0 })
      .perform();

    await driver.pause(1000);
  }
}
  async openProfileScreen() {
    await this.TapSetting.waitForDisplayed({ timeout: 10000 });
    await this.TapSetting.click();

    await this.EditProfile.waitForDisplayed({ timeout: 10000 });
    await this.EditProfile.click();
  }

  async selectCountryFromList(visibleCountryName) {
    await this.countryField.waitForDisplayed({ timeout: 10000 });
    await this.countryField.click();

    await this.countryPicker.waitForDisplayed({ timeout: 10000 });
    await this.swipeDownMultipleTimes(8);
    const countryElement = await $(`android=new UiSelector().text("${visibleCountryName}")`);
    await countryElement.waitForDisplayed({ timeout: 10000 });
    await countryElement.click();

    await this.EditProfileSaveButton.waitForDisplayed({ timeout: 10000 });
    await this.EditProfileSaveButton.click();
  }

  async getSelectedCountryText() {
    const selectedCountry = await $('id:sa.fadfed.fadfedapp:id/textViewCountryName');
    return await selectedCountry.getText();
  }

  async selectCountryUsingSearch(countryName) {
    await this.countryField.waitForDisplayed({ timeout: 10000 });
    await this.countryField.click();

    await this.countrySearchInput.waitForDisplayed({ timeout: 10000 });
    await this.countrySearchInput.setValue(countryName);

    const result = await $(`android=new UiSelector().className("android.widget.LinearLayout").instance(1)`);
    await result.waitForDisplayed({ timeout: 10000 });
    await result.click();

    await this.EditProfileSaveButton.waitForDisplayed({ timeout: 10000 });
    await this.EditProfileSaveButton.click();
  }
}

module.exports = new profilePage();
