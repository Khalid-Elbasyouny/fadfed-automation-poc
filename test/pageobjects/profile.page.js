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

  get invalidNamePopup() {
      return $('//*[contains(@text, "الأسماء التي تحاول اختيارها مخالفة")]');
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

/* <<<<<<<<<<<<<<  ✨ Windsurf Command ⭐ >>>>>>>>>>>>>>>> */
  /**
   * Opens the profile screen.
   *
   * This function first waits for the "Settings" button to be displayed and then clicks on it.
   * Then it waits for the "Edit Profile" button to be displayed and clicks on it.
   *
   * @returns {Promise<void>} A promise that resolves when the profile screen is opened.
   */
/* <<<<<<<<<<  2e50a157-55da-4711-9c30-74a37ebb9528  >>>>>>>>>>> */
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

  /**
   * Changes the profile photo using device camera
   * @returns {Promise<boolean>} True if photo was changed successfully
   */
  async changeProfilePhotoByCamera() {
    try {
      // 1) Tap edit profile photo
      await this.profilePhoto.waitForDisplayed({ timeout: this.defaultTimeout });
      await this.profilePhoto.click();

      // 2) Tap camera button
      await this.cameraButton.waitForDisplayed({ timeout: this.defaultTimeout });
      await this.cameraButton.click();

      // 3) Handle system permission (اختياري)
      try {
        const allow = await $('//*[@text="Allow" or @text="السماح"]');
        if (await allow.isDisplayed()) await allow.click();
      } catch {}

      // 4) اضغط زر التقاط الصورة من الكاميرا
      const shutter = await $('id=com.android.camera2:id/shutter_button');
      await shutter.waitForDisplayed({ timeout: 15000 });
      await shutter.click();
      console.log("📸 Shutter clicked!");

      // 5) اضغط Done من الكاميرا
      const doneButton = await $('id=com.android.camera2:id/done_button');
      await doneButton.waitForDisplayed({ timeout: 15000 });
      await doneButton.click();
      console.log("💾 Photo Saved!");

      // 6) اضغط Confirm crop من التطبيق
      const cropConfirm = await $('id=sa.fadfed.fadfedapp:id/imageButtonDone');
      await cropConfirm.waitForDisplayed({ timeout: 15000 });
      await cropConfirm.click();
      console.log("✂️ Crop Confirmed!");

      // 7) انتظر العودة لصفحة البروفايل
      await this.EditProfileScreen.waitForDisplayed({ timeout: 15000 });
      console.log("✔ Returned to profile");

    } catch (err) {
      console.error("Error inside changeProfilePhotoByCamera:", err);
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
