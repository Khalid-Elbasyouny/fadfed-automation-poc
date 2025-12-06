const Page = require("./page");

 class profilePage extends Page{
  get TapSetting() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/navigation_settings")');
  }

  get EditProfile() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutUserInfoContainer")');
  }
  get EditProfileScreen() {
    return $('android=new UiSelector().text("الملف الشخصي")');
  }

  get EditProfileSaveButton() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutEndButton")');
  }

  get profilePhoto() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/imageViewProfilePicture")');
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

  get invalidNamePopup() {
      return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/textViewNameErrorMessage")');
  }

  get nameRuleReminder() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutNameTips")');
  }

  get AgeWarning() {
    return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutAgeWarning")');
  }

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

  async swipeDownMultipleTimes(times = 1) {
    for (let i = 0; i < times; i++) {
      await driver
        .action("pointer", { parameters: { pointerType: "touch" } })
        .move({ duration: 0, x: 731, y: 2144 })
        .down({ button: 0 })
        .move({ duration: 1000, x: 724, y: 850 })
        .up({ button: 0 })
        .perform();

      await driver.pause(1000);
    }
  }

  /**
   * Opens the profile screen.
   *
   * This function first waits for the "Settings" button to be displayed and then clicks on it.
   * Then it waits for the "Edit Profile" button to be displayed and clicks on it.
   *
   * @returns {Promise<void>} A promise that resolves when the profile screen is opened.
   */
/* <<<<<<<<<<  2e50a157-55da-4711-9c30-74a37ebb9528  >>>>>>>>>>> */

async selectCountryFromList(visibleCountryName) {
    await this.countryField.waitForDisplayed({ timeout: 10000 });
    await this.countryField.click();

    await this.countryPicker.waitForDisplayed({ timeout: 10000 });
    await this.swipeDownMultipleTimes(1);
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

    await this.EditProfileSaveButton.waitForDisplayed({ timeout: 5000 });
    await this.EditProfileSaveButton.click();
  }
  /**
   * Changes the profile photo using device camera
   * @returns {Promise<boolean>} True if photo was changed successfully
   */
  async openProfileScreen() {
    await this.TapSetting.waitForDisplayed({ timeout: 10000 });
    await this.TapSetting.click();

    await this.EditProfile.waitForDisplayed({ timeout: 10000 });
    await this.EditProfile.click();
  }
  async changeProfilePhotoByCamera() {
    try {

//      // 🔥 Ensure profile photo button is visible in viewport
//      let retries = 0;
//      while (!(await this.profilePhoto.isDisplayed()) && retries < 5) {
//        await driver.touchAction([
//          { action: "press", x: 500, y: 1600 },
//          { action: "moveTo", x: 500, y: 400 },
//          "release"
//        ]);
//        await driver.pause(700);
//        retries++;
//      }

      // 1) Tap edit profile photo
      await this.profilePhoto.waitForDisplayed({ timeout: 7000 });
      await this.profilePhoto.click();

      // 2) Tap camera option
      await this.cameraButton.waitForDisplayed({ timeout: 7000 });
      await this.cameraButton.click();

      // 3) System permission
      try {
        const allow = await $('//*[@text="Allow" or @text="السماح"]');
        if (await allow.isDisplayed()) await allow.click();
      } catch {}

      // 4) Tap shutter
      const shutter = await $('id=com.android.camera2:id/shutter_button');
      await shutter.waitForDisplayed({ timeout: 10000 });
      await shutter.click();

      // 5) Tap done
      const doneButton = await $('id=com.android.camera2:id/done_button');
      await doneButton.waitForDisplayed({ timeout: 10000 });
      await doneButton.click();

      // Optional permission
      try {
        const recordingHandler = await $('id=android:id/button2');
        if (await recordingHandler.isDisplayed()) await recordingHandler.click();
      } catch {}

      // 6) Confirm crop
      const cropConfirm = await $('id=sa.fadfed.fadfedapp:id/imageButtonDone');
      await cropConfirm.waitForDisplayed({ timeout: 7000 });
      await cropConfirm.click();

      // 7) Ensure you are back to Edit Profile screen
      await this.EditProfileScreen.waitForDisplayed({ timeout: 10000 });

    } catch (err) {
      console.error("❌ Error inside changeProfilePhotoByCamera:", err);
      await driver.saveScreenshot(`./error-camera.png`);
      throw err;
    }
  }



  async setProfileName(name) {
    await this.nameInput.waitForDisplayed({ timeout: 5000 });
    await this.nameInput.clearValue();
    await this.nameInput.setValue(name);
  }

  async saveProfile() {
    await this.EditProfileSaveButton.click();
  }
}

module.exports = new profilePage();
