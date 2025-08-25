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

    async openAlerts() {
        await this.alerts.waitForDisplayed({ timeout: 5000 });
        await this.alerts.click();
    }

    async toggleSwitch(element) {
        await element.waitForDisplayed({ timeout: 5000 });
        const before = await element.getAttribute('checked');
        await element.click();
        const after = await element.getAttribute('checked');
        return { before, after };
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
