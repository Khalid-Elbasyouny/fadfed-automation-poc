const Page = require("./page");

class SettingsPage extends Page {
  get settingsTab() {
    return $('id:sa.fadfed.fadfedapp:id/navigation_settings');
  }
//setting options
  get profile() { return $('id:sa.fadfed.fadfedapp:id/layoutUserInfoContainer'); }
  get appearance() { return $('id:sa.fadfed.fadfedapp:id/layoutLastSeen'); }
  get royalPackage() { return $('android=new UiSelector().text("الباقة الملكيّة")'); }
  get backup() { return $('android=new UiSelector().text("النسخ الاحتياطي")'); }
  get skins() { return $('android=new UiSelector().text("تصميم الملف الشخصي")'); }
  get likesDislikes() { return $('android=new UiSelector().text("مراقبة المحتوى")'); }
  get nightModeToggle() { return $('android=new UiSelector().text("الوضع الليلي")'); }
  get changeBackground() { return $('android=new UiSelector().text("تغيير الخلفية")'); }
  get alerts() { return $('android=new UiSelector().text("التنبيهات")'); }
  get help() { return $('android=new UiSelector().text("مساعدة")'); }
  get privacyPolicy() { return $('android=new UiSelector().text("سياسة الخصوصية")'); }
  get deleteAccount() { return $('android=new UiSelector().text("حذف الحساب")'); }


  async openSettings() {
    await this.settingsTab.waitForDisplayed({ timeout: 5000 });
    await this.settingsTab.click();
  }
//dark mode
  get nightModeToggleSwitch() {return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/switchOnOff")');}

  async isNightModeEnabled() {
    const checked = await this.nightModeToggleSwitch.getAttribute("checked");
    return checked === "true";
    }

  async swipeDownMultipleTimes(times) {
    await driver
      .action("pointer", { parameters: { pointerType: "touch" } })
      .move({ duration: 0, x: 500, y: 1800 }) // start
      .down({ button: 0 })
      .move({ duration: 500, x: 500, y: 1170 }) // end
      .up({ button: 0 })
      .perform();
    await driver.pause(1000);
}
//BG-change
    get changeBgBtn() {
    return $('id:sa.fadfed.fadfedapp:id/changeBgCard');
    }

  // Backup settings
  get backupPageTitle() {
    return $('id:sa.fadfed.fadfedapp:id/textViewTitle');
  }

  get backupToggle() {
    return $('id:sa.fadfed.fadfedapp:id/layoutCircularProgress');
  }

  get lastSyncContainer() {
    return $('id:sa.fadfed.fadfedapp:id/textViewLastSync');
  }

  get googleBackupAccountsList() {
    return $$('android=new UiSelector().resourceId("com.google.android.gms:id/container")');
  }


  async getBackupToggleStatus() {
    const toggle = await this.backupToggle;
    return await toggle.getAttribute('checked') === 'true';
  }

  async toggleBackup() {
    const toggle = await this.backupToggle;
    await toggle.click();
  }

  async selectFirstGoogleAccount() {
    await driver.pause(1000);
    const accounts = await this.googleBackupAccountsList;
    if (accounts.length === 0) {
      throw new Error("❌ No Google accounts found to select.");
    }
    await accounts[0].click();
    await driver.pause(2000);
  }

    get saveBgBtn() {
    return $('id:sa.fadfed.fadfedapp:id/save');
    }

    get galleryImage() {
        return $('android=new UiSelector().className("android.view.View").instance(15)');
    }
    async tapChangeBG() {
    await this.changeBackground.waitForDisplayed({ timeout: 5000 });
    await this.changeBackground.click();
    }

    async tapChangeBackgroundCard() {
        await this.changeBgBtn.waitForDisplayed({ timeout: 5000 });
        await this.changeBgBtn.click();
    }

    async selectBackgroundImage() {
        await this.galleryImage.waitForDisplayed({ timeout: 5000 });
        await this.galleryImage.click();
    }

    async tapSaveBackground() {
        await this.saveBgBtn.waitForDisplayed({ timeout: 5000 });
        await this.saveBgBtn.click();
    }
//Alerts
    get toggleOutApp() {
        return $('id:sa.fadfed.fadfedapp:id/switchNotificationsOutApp');
    }

    get toggleInApp() {
        return $('id:sa.fadfed.fadfedapp:id/switchNotificationsInApp');
    }

    get toggleAnon() {
        return $('id:sa.fadfed.fadfedapp:id/switchNotificationsAnon');
    }

    async handleNotificationsPermission() {
//                1️⃣ اضغط على زر تفعيل "OK" / "Allow"
               try{
               const enableBtn = await $('id=android:id/button1');
               await enableBtn.waitForDisplayed({ timeout: 1000 });
               await enableBtn.click();
               console.log("✔ Clicked system 'Enable' button");

               // 2️⃣ اضغط على الـ Notifications
               const notificationsTab = await $('android=new UiSelector().className("android.view.View").instance(6)');
               await notificationsTab.waitForDisplayed({ timeout: 5000 });
               await notificationsTab.click();
               console.log("✔ Opened Notifications settings");

               // Toggle the notifications switch
               const toggle = await $('id=android:id/switch_widget');
               await toggle.waitForDisplayed({ timeout: 5000 });
               await toggle.click();
               console.log("✔ Toggled notifications switch");
               
               //Add two taps on the 'Navigate up' button
               try {
                   const navigateUpBtn = await $('//android.widget.ImageButton[@content-desc="Navigate up"]');
                   await navigateUpBtn.waitForDisplayed({ timeout: 5000 });
                   await navigateUpBtn.click();
                   console.log("✔ First tap on 'Navigate up' button");
                   const navigateUpBtn2 = await $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View[1]');
                   await navigateUpBtn2.waitForDisplayed({ timeout: 5000 });
                   await navigateUpBtn2.click();
                   console.log("✔ Second tap on 'Navigate up' button");
               } catch (err) {
                   console.log("::> Could not find 'Navigate up' button:", err.message);
               }
               }catch(err){
               console.log("::> Error in notifications handling:", err.message);
               }

               await driver.pause(2000);
        }

    async openAlerts() {
        try {
            console.log('Waiting for Alerts button to be displayed...');
            await this.alerts.waitForDisplayed({ timeout: 5000 });
            console.log('Clicking Alerts button...');
            await this.alerts.click();
            // Add a small delay to ensure the Alerts screen is fully loaded
            await driver.pause(2000);
        } catch (error) {
            console.error('Error in openAlerts:', error);
            throw error;
        }
    }

    async toggleSwitch(element) {
        try {
            console.log(`Waiting for toggle element to be displayed...`);
            await element.waitForDisplayed({ timeout: 5000 });
            console.log('Getting current toggle state...');
            const before = await element.getAttribute('checked');
            console.log(`Current toggle state: ${before}`);
            
            console.log('Clicking the toggle...');
            await element.click();
            await driver.pause(1000); // Wait for the toggle animation
            
            console.log('Getting new toggle state...');
            const after = await element.getAttribute('checked');
            console.log(`New toggle state: ${after}`);
            
            return { before, after };
        } catch (error) {
            console.error('Error in toggleSwitch:', error);
            throw error;
        }
    }

    //help FAQ's
    // أقسام المساعدة (الحظر، الأصدقاء…)
    sectionByText(text) {
        return $(`android=new UiSelector().text("${text}")`);
    }

    get questionContainers() {
        return $$('id:sa.fadfed.fadfedapp:id/container');
    }

    get answer() {
        return $('id:sa.fadfed.fadfedapp:id/answer');
    }
    async openHelp() {
        await this.help.waitForDisplayed({ timeout: 5000 });
        await this.help.click();
    }
// help feadback

    get HelpNoBtn() {
        return $('id:sa.fadfed.fadfedapp:id/supportNotHelpful');
    }

    async tapHelpNoBtn() {
        await this.HelpNoBtn.waitForDisplayed({ timeout: 5000 });
        await this.HelpNoBtn.click();
    }

    // 📩 Email
//    get EmailFeadback() {
//        return $('id:sa.fadfed.fadfedapp:id/imageButtonEmail');
//    }
//    async tapEmailFeedback() {
//        await this.EmailFeadback.waitForDisplayed({ timeout: 5000 });
//        await this.EmailFeadback.click();
//    }
    async getEmailFeedback() {
        const selector1 = await $('id:sa.fadfed.fadfedapp:id/imageButtonEmail');
        const selector2 = await $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutHelpButton")');

        if (await selector1.isExisting()) {
            return selector1;
        } else if (await selector2.isExisting()) {
            return selector2;
        } else {
            throw new Error("❌ Neither Email Feedback button nor Login Help button found!");
        }
    }
    async tapEmailFeedback() {
        const emailFeedback = await this.getEmailFeedback();
        await emailFeedback.waitForDisplayed({ timeout: 5000 });
        await emailFeedback.click();
    }


    // ✅ Gmail assertion element
    get GmailChip() {
        return $('id:com.google.android.gm:id/peoplekit_chip');
    }

    // 🐦 Twitter
    get TweeterFeadback() {
        return $('id:sa.fadfed.fadfedapp:id/imageButtonTwitter');
    }
    async tapTwitterFeedback() {
        await this.TweeterFeadback.waitForDisplayed({ timeout: 5000 });
        await this.TweeterFeadback.click();
    }

    // 📸 Instagram
    get InstagramFeadback() {
        return $('id:sa.fadfed.fadfedapp:id/imageButtonInstagram');
    }
    async tapInstagramFeedback() {
        await this.InstagramFeadback.waitForDisplayed({ timeout: 5000 });
        await this.InstagramFeadback.click();
    }


//delete account
    get deleteAccountBtn() {
        return $('android=new UiSelector().text("حذف الحساب")');
    }
    async tapDeleteAccount() {
        await this.deleteAccountBtn.waitForDisplayed({ timeout: 5000 });
        await this.deleteAccountBtn.click();
    }

    // زرار التأكيد "نعم"
    get confirmDeleteBtn() {
        return $('id:android:id/button1');
    }
    async tapConfirmDelete() {
        await this.confirmDeleteBtn.waitForDisplayed({ timeout: 5000 });
        await this.confirmDeleteBtn.click();
    }

    // ✅ عنصر شاشة تسجيل الدخول (Splash Screen)
    get googleLoginBtn() {
        return $('//android.widget.TextView[@text="واصل بخصوصية عن طريق جوجل"]');
    }


}



module.exports = new SettingsPage();
