const settingsPage = require("../pageobjects/Settings.page");
const { expect } = require("chai");
const { closeRecordingPopup } = require("./app.helper");


async function verifySettingsOptions() {
  await settingsPage.openSettings();

// changeable based in the build and its settings features

  const firstBatch = [
    { el: settingsPage.profile, name: "Profile" },
    { el: settingsPage.appearance, name: "Appearance" },
    { el: settingsPage.royalPackage, name: "Royal Package" },
    { el: settingsPage.backup, name: "Backup" },
//    { el: settingsPage.skins, name: "Skins" },
    { el: settingsPage.likesDislikes, name: "Likes & Dislikes" },
    { el: settingsPage.nightModeToggle, name: "Night Mode" }

  ];

  for (const option of firstBatch) {
    await option.el.waitForDisplayed({ timeout: 5000 });
    expect(await option.el.isDisplayed(), `${option.name} should be visible`).to.be.true;
  }

  await settingsPage.swipeDownMultipleTimes(2);
  const secondBatch = [
    { el: settingsPage.changeBackground, name: "Change Background" },
    { el: settingsPage.alerts, name: "Alerts" },
    { el: settingsPage.help, name: "Help" },
    { el: settingsPage.privacyPolicy, name: "Privacy Policy" },
    { el: settingsPage.deleteAccount, name: "Delete Account" }
  ];

  for (const option of secondBatch) {
    await option.el.waitForDisplayed({ timeout: 5000 });
    expect(await option.el.isDisplayed(), `${option.name} should be visible`).to.be.true;
  }
}
// Night Mode
async function toggleNightModeAndCheck() {
  const initialState = await settingsPage.isNightModeEnabled();

  await settingsPage.nightModeToggle.click();
  await driver.pause(1000);
  try{
  await closeRecordingPopup()
  }catch(err){"::> popup handling"}
  const afterToggleOn = await settingsPage.isNightModeEnabled();

  await settingsPage.nightModeToggle.click();
  await driver.pause(1000);
  const afterToggleOff = await settingsPage.isNightModeEnabled();

  return { initialState, afterToggleOn, afterToggleOff };
}
//change background
async function changeChatBackground() {
    await settingsPage.tapChangeBG();
    await settingsPage.tapChangeBackgroundCard();
    try {
        const imageExistingChangeBG = await $('id:sa.fadfed.fadfedapp:id/changePicture');
        await imageExistingChangeBG.waitForDisplayed({ timeout: 1500 });
        await imageExistingChangeBG.click();
    } catch (err) {
        console.log("::> no existing image, selecting new background");
    }
    await settingsPage.selectBackgroundImage();
    await settingsPage.tapSaveBackground();

    const pageSource = await driver.getPageSource();
    return pageSource;
}
//alerts
async function verifyAlertsToggles() {
    await settingsPage.swipeDownMultipleTimes(1);
    await settingsPage.openAlerts();

    await settingsPage.handleNotificationsPermission();

    const outApp = await settingsPage.toggleSwitch(settingsPage.toggleOutApp);
    console.log('Out App Toggle changed:', outApp);

    const inApp = await settingsPage.toggleSwitch(settingsPage.toggleInApp);
    console.log('In App Toggle changed:', inApp);

    const anon = await settingsPage.toggleSwitch(settingsPage.toggleAnon);
    console.log('Anon Toggle changed:', anon);

    return { outApp, inApp, anon };
}

//help FAQS
async function verifyHelpSections() {
    await driver.back();
    await settingsPage.swipeDownMultipleTimes(1);

    await settingsPage.help.waitForDisplayed({ timeout: 3000 });
    await settingsPage.help.click();

    const sections = ["الحظر", "الأصدقاء", "الاشتراكات", "المجوهرات"];

//loop around the categories and assert for the questions container
    for (const sectionName of sections) {
        console.log(`::> Testing section: ${sectionName}`);
        const sec = await settingsPage.sectionByText(sectionName);

        await sec.scrollIntoView();
        await sec.click();
        if (sectionName === "الاشتراكات") {
            await settingsPage.swipeDownMultipleTimes(1);
        }

        const questionsContainer = await $('id:sa.fadfed.fadfedapp:id/questions');
        expect(await questionsContainer.isDisplayed()).to.equal(
            true,
            `Questions container should be visible when section ${sectionName} is expanded`
        );

        // ✅ looping around the questions and assert for answers
        const questions = await settingsPage.questionContainers;
        console.log(`::> Found ${questions.length} questions in section: ${sectionName}`);
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            await q.scrollIntoView();

            const question = await q.$('id:sa.fadfed.fadfedapp:id/question');
            const answer = await q.$('id:sa.fadfed.fadfedapp:id/answer');

            await question.click();
            await driver.pause(300);

            const isAnswerVisible = await answer.isDisplayed().catch(() => false);
            expect(isAnswerVisible).to.equal(
                true,
                `Answer should appear when opening question ${i} in section ${sectionName}`
            );

            // اقفل السؤال
            await question.click();
            await driver.pause(300);

            const isAnswerHidden = await answer.isDisplayed().catch(() => false);
            expect(isAnswerHidden).to.equal(
                false,
                `Answer should disappear after closing question ${i} in section ${sectionName}`
            );
        }

        // ✅ قفل السيكشن نفسه
        await sec.click();
        expect(await questionsContainer.isDisplayed()).to.equal(
            false,
            `Questions container should be hidden when section ${sectionName} is collapsed`
        );
    }
}
//feadback
async function sendFeedback(type) {
    // أول مرة لازم نضغط "No"
    if (await settingsPage.HelpNoBtn.isDisplayed()) {
        await settingsPage.tapHelpNoBtn();
    }

    switch (type) {
        case "email":
            await settingsPage.tapEmailFeedback();
            await driver.pause(2000);
            return settingsPage.GmailChip;

        case "twitter":
            await settingsPage.tapTwitterFeedback();
            await driver.pause(2000);
            return driver.getCurrentPackage();

        case "instagram":
            await settingsPage.tapInstagramFeedback();
            await driver.pause(2000);
            return driver.getCurrentPackage();

        default:
            throw new Error(`Unsupported feedback type: ${type}`);
    }
}
//delete account
async function deleteAccountFlow() {
    await settingsPage.swipeDownMultipleTimes(2);
    await settingsPage.tapDeleteAccount();
    await settingsPage.tapConfirmDelete();
    }
module.exports = {
verifySettingsOptions,
toggleNightModeAndCheck,
changeChatBackground,
verifyAlertsToggles,
verifyHelpSections,
sendFeedback,
deleteAccountFlow,
};