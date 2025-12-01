const Page = require("./page");

class profilePage extends Page{
  get TapSetting() {
      return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/navigation_settings")');
    }

  get EditProfile() {
      return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutUserInfoContainer")');
    }

  get EditProfileSaveButton() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutEndButton")');
  }

  get profilePhoto() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/imageButtonEditProfilePicture")');
  }
  
  get cameraButton() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutButtonCamera")');
  }
  get captureImgButton() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutButtonCamera")');
  }
  get confirmPhoto() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutButtonCamera")');
  }
  get confirmScalesPhoto() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutButtonCamera")');
  }
  get nameInput() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/editTextName")');
  }
  
  get nameError() {
    return $('android=new UiSelector().text("الأسماء التي تحاول اختيارها مخالفة وقد تعرضك للحظر")');
  }
  
  get nameRuleReminder() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutNameTips")');
  }
  
  get AgeWarning() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutAgeWarning")');
  }
//  for further age picking automation
  get datePicker() {
    return $('android=new UiSelector().resourceId("android:id/date_picker_actions")');
  }


  get countryField() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutCountry")');
  }

  get countryPicker() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/design_bottom_sheet")');
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
    await this.countryField.waitForDisplayed({ timeout: 5000 });
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

  async changeProfilePhotoByCamera() {
    await this.profilePhoto.click();
    await this.cameraButton.waitForDisplayed({ timeout: 2000 });
    await this.cameraButton.click();
    await this.cameraButton.waitForDisplayed({ timeout: 2000 });
    await this.captureImgButton.click();
    await this.cameraButton.waitForDisplayed({ timeout: 2000 });
    await this.confirmPhoto.click();
    await this.cameraButton.waitForDisplayed({ timeout: 2000 });
    await this.confirmScalesPhotoPhoto.click();
    // Note: You might need to handle camera/gallery permissions here
    // and add specific implementation for taking/selecting a photo
  }
  
  async setProfileName(name) {
    await this.nameInput.waitForDisplayed({ timeout: 5000 });
    await this.nameInput.clearValue();
    await this.nameInput.setValue(name);
  }
  
// here should be the age warning
  
  async saveProfile() {
    await this.EditProfileSaveButton.click();
  }
}

module.exports = new profilePage();
