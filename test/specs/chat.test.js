const { expect } = require('chai');
const chatHelper = require('../helpers/Chat.helper');
const chatPage = require('../pageobjects/Chat.page');
const { beforeHook } = require('../hooks/splashscreen.hooks');
const { loginWithGoogle } = require('../helpers/Login.helper');
const { clearAppCache } = require('../helpers/app.helper');
const { closeRecordingPopup } = require('../helpers/app.helper');
const InfoForm = require('../helpers/InfoForm.helper');
const { popupClose, NotificationAlertClose } = require('../helpers/app.helper');

describe(' Chat Functionality Tests', () => {


//    describe(' Text Message Sending', () => {
//    before(async () => {
//            await clearAppCache();
//            await beforeHook();
//            try{
//                await closeRecordingPopup();
//            }catch (err) {"::> No recording alert found"}
//            try {
//                await loginWithGoogle();
//                await driver.pause(2000);
//            }catch (err) {"::> Logging to an existing account"}
//            try{
//                await InfoForm.ValidInfoForm();
//            } catch (err) {
//                console.log("::> filling user form ");}
//            try {
//                await NotificationAlertClose();
//            }catch (err) {"::> popup handling"}
//            try {
//                await popupClose();
//            } catch (err) {
//                console.log("::> popup handling");}
//        });
//        it(' ⚡ User can open an existing chat', async () => {
//            const isChatOpened = await chatHelper.openExistingChat();
//            expect(isChatOpened).to.be.true;
//        });
//        it(' ⚡ User can send and verify English text message', async () => {
//            const testMessage = 'English text validation123 ' + new Date().getTime();
//            console.log('Starting test with message:', testMessage);
//
//            // This will handle opening a chat and sending the message
//            const isSent = await chatHelper.sendTextMessage(testMessage);
//            expect(isSent).to.be.true;
//
//            console.log('EN Text validated successfully');
//        });
//
//        it(' ⚡ User can send and verify Arabic text message', async () => {
//           const testMessage = 'إختبار النص العربي ١٢٣ ' + new Date().getTime();
//                       console.log('Starting test with message:', testMessage);
//
//                       // This will handle opening a chat and sending the message
//                       const isSent = await chatHelper.sendTextMessage(testMessage);
//                       expect(isSent).to.be.true;
//
//                       console.log('AR Text validated successfully');
//        });
//
//        it(' ⚡ User can send and verify Emojis', async () => {
//            // Using Unicode escape sequences for emojis
//            const emojiFaceWithTears = '\u{1F602}'; // 😂
//            const emojiHeartEyes = '\u{1F60D}';    // 😍
//            const emojiSmile = '\u{1F60A}';        // 😊
//
//            const testMessage = `Emoji Test ${emojiFaceWithTears}${emojiHeartEyes}${emojiSmile} ${new Date().getTime()}`;
//            console.log('Starting emoji test with message:', testMessage);
//
//            // This will handle opening a chat and sending the message
//            const isSent = await chatHelper.sendTextMessage(testMessage);
//        });
//    });
//    describe(' Conversation Starters', () => {
//        it(' ⚡ Verify conversation starters refresh btn', async () => {
//            //  Close keyboard by tapping at coordinates (300, 900)
//            await driver.performActions([{
//                type: 'pointer',
//                id: 'finger1',
//                parameters: { pointerType: 'touch' },
//                actions: [
//                    { type: 'pointerMove', duration: 0, x: 300, y: 900 },
//                    { type: 'pointerDown', button: 0 },
//                    { type: 'pause', duration: 100 },
//                    { type: 'pointerUp', button: 0 }
//                ]
//            }]);
//            await driver.pause(500); // Small delay after tap
//
//                //Open conversation starters
//            await chatHelper.openConversationStarters();
//
//                //confirm conversation starters tips
//            try {
//                await chatHelper.confirmCsTips();
//            } catch (err) {
//                console.log("::> popup handling");
//            }
//
//            //Get first question text
//            const firstQuestionText = await chatHelper.getFirstQuestionText();
//
//            //Refresh questions
//            await chatHelper.refreshQuestions();
//
//            //Get first question text after refresh
//            const firstQuestionTextAfterRefresh = await chatHelper.getFirstQuestionText();
//
//            //Assert text is the same
//            expect(firstQuestionText).to.equal(firstQuestionTextAfterRefresh);
//        });
//
//        it(' ⚡ User can send a conversation starter', async () => {
//            // 1. Send first conversation starter
//            const questionText = await chatHelper.sendFirstConversationStarter();
//            console.log('Sent question text:', questionText);
//
//            // 2. Verify message was sent and is displayed
//            const isDisplayed = await chatPage.isMessageDisplayed(questionText);
//            console.log('Is message displayed?', isDisplayed);
//            expect(isDisplayed, 'Message was not displayed in the chat').to.be.true;
//        });
//    });


    describe('Chat Media Suite', () => {
        before(async () => {
            // Ensure we're in a chat conversation
//            await chatHelper.openExistingChat();
        });

//        it(' ⚡ User can send a photo from gallery', async () => {
//            // 1. Send photo from gallery
//            const photoSent = await chatHelper.sendPhoto();
//            expect(photoSent, 'Failed to send photo').to.be.true;
//
//            // 2. Verify photo is displayed in chat
//            const isPhotoDisplayed = await chatHelper.validatePhotoSent();
//            expect(isPhotoDisplayed, 'Photo was not displayed in chat').to.be.true;
//        });
//
//        it('TC-0XY – User can send a video from gallery', async () => {
//            // 1. Send video from gallery
//            const videoSent = await chatHelper.sendVideo();
//            expect(videoSent, 'Failed to send video').to.be.true;
//
//            // 2. Verify video is displayed in chat
//            const isVideoDisplayed = await chatHelper.validateVideoSent();
//            expect(isVideoDisplayed, 'Video was not displayed in chat').to.be.true;
//
//            console.log('🎥 Video message successfully displayed in chat');
//        });

        it('TC-0XZ – User can send a GIF', async () => {
            // 1. Send GIF from gallery
            const gifSent = await chatHelper.sendGif();
            expect(gifSent, 'Failed to send GIF').to.be.true;

            // 2. Verify GIF is displayed in chat
            const isGifDisplayed = await chatHelper.validateGifSent();
            expect(isGifDisplayed, 'GIF was not displayed in chat').to.be.true;

            console.log('🎉 GIF message successfully displayed in chat');
        });
    });
});