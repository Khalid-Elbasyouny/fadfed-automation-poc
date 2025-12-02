const { expect } = require('chai');
const chatHelper = require('../helpers/Chat.helper');
const { beforeHook } = require('../hooks/splashscreen.hooks');
const { loginWithGoogle } = require('../helpers/Login.helper');
const { clearAppCache } = require('../helpers/app.helper');
const { closeRecordingPopup } = require('../helpers/app.helper');
const InfoForm = require('../helpers/InfoForm.helper');
const { popupClose, NotificationAlertClose } = require('../helpers/app.helper');

describe('Chat Functionality Tests', () => {
    before(async () => {
        await clearAppCache();
        await beforeHook();
        try{
            await closeRecordingPopup();
        }catch (err) {"::> No recording alert found"}
        try {
            await loginWithGoogle();
            await driver.pause(2000);
        }catch (err) {"::> Logging to an existing account"}
        try{
            await InfoForm.ValidInfoForm();
        } catch (err) {
            console.log("::> filling user form ");}
        try {
            await NotificationAlertClose();
        }catch (err) {"::> popup handling"}
        try {
            await popupClose();
        } catch (err) {
            console.log("::> popup handling");}
    });

    describe('Text Message Sending', () => {
        it(' open an existing chat', async () => {
            const isChatOpened = await chatHelper.openExistingChat();
            expect(isChatOpened).to.be.true;
        });

        it(' send and verify English text message', async () => {
            const testMessage = 'English text validation123 ' + new Date().getTime();
            console.log('Starting test with message:', testMessage);
            
            // This will handle opening a chat and sending the message
            const isSent = await chatHelper.sendTextMessage(testMessage);
            expect(isSent).to.be.true;
            
            console.log('EN Text validated successfully');
        });

        it(' send and verify Arabic text message', async () => {
           const testMessage = 'إختبار النص العربي ١٢٣ ' + new Date().getTime();
                       console.log('Starting test with message:', testMessage);

                       // This will handle opening a chat and sending the message
                       const isSent = await chatHelper.sendTextMessage(testMessage);
                       expect(isSent).to.be.true;

                       console.log('AR Text validated successfully');
        });
    });
});
