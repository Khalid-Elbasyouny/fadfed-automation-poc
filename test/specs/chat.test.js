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
//
//
//    describe('  Chat Media Suite', () => {
//        before(async () => {
//           //  Ensure we're in a chat conversation
////            await chatHelper.openExistingChat();
//        });
//
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
//        it(' ⚡ User can send a video from gallery', async () => {
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
//
//        it(' ⚡ User can send a GIF', async () => {
//            // 1. Send GIF from gallery
//            const gifSent = await chatHelper.sendGif();
//            expect(gifSent, 'Failed to send GIF').to.be.true;
//
//            // 2. Verify GIF is displayed in chat
//            const isGifDisplayed = await chatHelper.validateGifSent();
//            expect(isGifDisplayed, 'GIF was not displayed in chat').to.be.true;
//
//            console.log('🎉 GIF message successfully displayed in chat');
//        });
//    });

    // ====================================
    // Chat Voice Notes Suite
    // ====================================
    describe(' Chat Voice Notes Suite', () => {
        it(' ⚡ User can record and send a voice note', async () => {
            // 1. Take a screenshot before sending the voice note
            await browser.saveScreenshot('./screenshots/voice-note-before.png');
            
            // 2. Send a voice note
            console.log('Sending voice note...');
            await chatHelper.sendVoiceNote();
            
            // 3. Wait for voice note to appear and get the time element
            const timeElement = await $('id:sa.fadfed.fadfedapp:id/textViewTime');
            await timeElement.waitForDisplayed({ timeout: 15000 });
            
            // 4. Get the displayed time text
            const timeText = await timeElement.getText();
            console.log('Displayed recording time:', timeText);
            
            // 5. Verify the time format (should be in MM:SS or M:SS format)
            const timeRegex = /^\d{1,2}:\d{2}$/;
            expect(timeText).to.match(timeRegex, 'Time format should be in MM:SS or M:SS format');
            
            // 6. Parse the displayed time
            const [minutes, seconds] = timeText.split(':').map(Number);
            const totalSeconds = (minutes * 60) + seconds;
            
            // 7. Verify the time is within a reasonable range (1-10 seconds)
            expect(totalSeconds).to.be.within(1, 10, 
                `Recorded time (${totalSeconds}s) should be between 1 and 10 seconds`);
            
            // 8. Check if the voice note bubble is displayed
            const voiceNoteBubble = await $('//*[contains(@resource-id, "voicePlayerView")]');
            const isVoiceNoteDisplayed = await voiceNoteBubble.isDisplayed();
            expect(isVoiceNoteDisplayed, 'Voice note bubble should be displayed').to.be.true;
            
            // 9. Take a screenshot after verification
            await browser.saveScreenshot('./screenshots/voice-note-after.png');
            console.log('✅ Voice note test completed - voice note verified');
        });
    });
});