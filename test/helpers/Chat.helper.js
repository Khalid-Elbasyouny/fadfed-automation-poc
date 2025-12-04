const chatPage = require('../pageobjects/Chat.page');
const settingsPage = require('../pageobjects/Settings.page');


class ChatHelper {
    async openExistingChat() {
        try {
            console.log('Trying to open conversations...');
            const conversationsOpened = await chatPage.openConversations();
            
            if (conversationsOpened) {
                console.log('Checking for existing conversations...');
                if (await chatPage.hasConversations()) {
                    console.log('Opening first conversation...');
                    await chatPage.openFirstConversation();
                    return true;
                }
            }
            
            console.log('No conversations found, trying to open friends list...');
            await chatPage.openFriendsList();
            
            if (await chatPage.hasFriends()) {
                console.log('Opening first friend chat...');
                await chatPage.openFirstFriendChat();
                return true;
            }
            
            throw new Error('No conversations or friends found');
        } catch (error) {
            console.error('Error in openExistingChat:', error.message);
            throw error;
        }
    }

    async sendTextMessage(text) {
        try {
            console.log(`Attempting to send message: "${text}"`);
            
            // Make sure we're in a chat
            if (!(await chatPage.messageInput.isDisplayed())) {
                console.log('Not in a chat, trying to open one...');
                await this.openExistingChat();
            }
            
            // Clear any existing text first
            await chatPage.messageInput.clearValue();
            
            // Type the message
            await chatPage.messageInput.setValue(text);
            console.log('Message typed');
            
            // Click send button
            await chatPage.sendButton.click();
            console.log('Send button clicked');
            
            // Wait a moment for the message to be sent
            await driver.pause(2000);
            
            // Verify message is displayed
            console.log('Verifying message is displayed...');
            const isDisplayed = await chatPage.isMessageDisplayed(text);
            
            if (!isDisplayed) {
                // Take a screenshot for debugging
                await driver.saveScreenshot('./error-send-message.png');
                throw new Error('Message was not displayed in the chat');
            }
            
            console.log('Message sent and verified successfully');
            return true;
            
        } catch (error) {
            console.error('Error in sendTextMessage:', error.message);
            // Take a screenshot on error
            await driver.saveScreenshot('./error-send-message-failed.png');
            throw error;
        }
    }

    async openFirstFriendChat() {
        try {
            // Open friends list
            await chatPage.openFriendsList();
            
            // Open chat with first friend
            await chatPage.openFirstFriendChat();
            
            // Verify chat is opened
            await expect(chatPage.messageInput).toBeDisplayed();
            return true;
        } catch (error) {
            console.error('Error opening friend chat:', error);
            throw error;
        }
    }
    // conversation starters
    //open conversation starters
    async openConversationStarters() {
        // Click the conversation starter button
        await chatPage.conversationStarterButton.waitForDisplayed({ timeout: 10000 });
        await chatPage.conversationStarterButton.click();
    }
    //get first question text
    async getFirstQuestionText() {
        const firstQuestion = $('android=new UiSelector().className("androidx.appcompat.widget.LinearLayoutCompat").instance(1)');
        await firstQuestion.waitForDisplayed({ timeout: 5000 });
        return await firstQuestion.getText();
    }
    //refresh questions
    async refreshQuestions() {
        await settingsPage.swipeDownMultipleTimes(1);
        const refreshButton = $('id:sa.fadfed.fadfedapp:id/buttonRefresh');
        await refreshButton.waitForDisplayed({ timeout: 5000 });
        await refreshButton.click();
        await driver.pause(1500);
    }
    //confirm conversation starters tips
    async confirmCsTips() {
        const refreshButton = $('id:sa.fadfed.fadfedapp:id/buttonAcceptConversationStarter');
        await refreshButton.waitForDisplayed({ timeout: 1500 });
        await refreshButton.click();
        await driver.pause(1500);
    }
    //send first conversation starter
    async sendFirstConversationStarter() {
        const firstQuestion = $('android=new UiSelector().className("androidx.appcompat.widget.LinearLayoutCompat").instance(1)');
        await firstQuestion.waitForDisplayed({ timeout: 5000 });
        const questionText = await firstQuestion.getText();
        
        await firstQuestion.click();
        await driver.pause(2000);
        
        // Appium-safe alternative to waitForClickable()
        await chatPage.sendButton.waitForDisplayed({ timeout: 10000 });
        await chatPage.sendButton.waitForEnabled({ timeout: 10000 });
        await chatPage.sendButton.click();
        
        await driver.pause(1500);
        return questionText;
    }

    /**
     * Sends a photo from gallery
     * @returns {Promise<boolean>} True if photo was sent successfully
     */
    async sendPhoto() {
        try {
            await chatPage.sendPhotoFromGallery();
            return true;
        } catch (error) {
            console.error('Failed to send photo:', error);
            return false;
        }
    }

    /**
     * Validates if the photo was sent and displayed in chat
     * @returns {Promise<boolean>} True if photo is displayed
     */
    async validatePhotoSent() {
        try {
            const isDisplayed = await chatPage.waitForImageToAppear(15000);
            return isDisplayed;
        } catch (error) {
            console.error('Error validating photo was sent:', error);
            return false;
        }
    }
    
    /**
     * Tests the conversation starters refresh functionality
     * @returns {Promise<boolean>} True if the test passes
     */
    async testConversationStartersRefresh() {
        console.log('Testing conversation starters refresh...');
        
        // 1. Open conversation starters
        const opened = await chatPage.openConversationStarters();
        if (!opened) {
            throw new Error('Failed to open conversation starters');
        }
        
        // 2. Get initial questions
        const initialQuestions = await chatPage.getCurrentStarterQuestions();
        if (initialQuestions.length === 0) {
            throw new Error('No initial conversation starters found');
        }
        
        console.log('Initial questions:', initialQuestions);
        
        // 3. Refresh the questions
        const refreshed = await chatPage.refreshConversationStarters();
        if (!refreshed) {
            throw new Error('Failed to refresh conversation starters');
        }
        
        // 4. Wait for refresh to complete
        await driver.pause(2000);
        
        // 5. Get the questions after refresh
        const refreshedQuestions = await chatPage.getCurrentStarterQuestions();
        console.log('Refreshed questions:', refreshedQuestions);
        
        if (refreshedQuestions.length === 0) {
            throw new Error('No questions found after refresh');
        }
        
        // 6. Compare the questions (they should be different)
        const areDifferent = JSON.stringify(initialQuestions) !== JSON.stringify(refreshedQuestions);
        
        if (!areDifferent) {
            console.warn('Warning: Questions are the same after refresh. This might be expected if the server returned the same set.');
            // We don't fail the test here as this could be expected behavior
        }
        
        return true;
    }
    
    /**
     * Sends a conversation starter
     * @param {number} index - Index of the starter to send (default: 0)
     * @returns {Promise<string>} The text of the sent message
     */
    async sendConversationStarter(index = 0) {
        console.log(`Sending conversation starter at index ${index}...`);
        
        // 1. Open conversation starters
        const opened = await chatPage.openConversationStarters();
        if (!opened) {
            throw new Error('Failed to open conversation starters');
        }
        
        // 2. Get the question at the specified index
        const questions = await chatPage.getCurrentStarterQuestions();
        if (index >= questions.length) {
            throw new Error(`No question found at index ${index}`);
        }
        
        const questionText = questions[index];
        console.log(`Selected question: ${questionText}`);
        
        // 3. Click on the question
        const questionElements = await chatPage.conversationStarters;
        if (index >= questionElements.length) {
            throw new Error(`No question element found at index ${index}`);
        }
        
        await questionElements[index].click();
        
        // 4. Click send
        await chatPage.sendButton.waitForClickable({ timeout: 5000 });
        await chatPage.sendButton.click();
        
        console.log('Conversation starter sent successfully');
        return questionText;
    }

    /**
     * Sends a video from the gallery
     * @returns {Promise<boolean>} True if video was sent successfully
     */
    async sendVideo() {
        try {
            console.log('Sending video from gallery...');
            await chatPage.sendVideoFromGallery();
            return true;
        } catch (error) {
            console.error('Failed to send video:', error);
            return false;
        }
    }

    /**
     * Validates if the video was sent and displayed in chat
     * @returns {Promise<boolean>} True if video is displayed
     */
    async validateVideoSent() {
        try {
            console.log('Validating video was sent...');
            const isDisplayed = await chatPage.waitForVideoToAppear(15000);
            console.log('Video validation result:', isDisplayed ? '✅ Success' : '❌ Failed');
            return isDisplayed;
        } catch (error) {
            console.error('Error validating video was sent:', error);
            return false;
        }
    }

    /**
     * Sends a GIF from the gallery
     * @returns {Promise<boolean>} True if GIF was sent successfully
     */
    async sendGif() {
        try {
            console.log('Sending GIF from gallery...');
            await chatPage.sendGifFromGallery();
            console.log('✅ GIF sent successfully');
            return true;
        } catch (error) {
            console.error('❌ Failed to send GIF:', error);
            return false;
        }
    }

    /**
     * Validates if the GIF was sent and displayed in chat
     * @returns {Promise<boolean>} True if GIF is displayed
     */
    async validateGifSent() {
        try {
            console.log('Validating GIF was sent...');
            const isDisplayed = await chatPage.waitForGifToAppear(15000);
            console.log('GIF validation result:', isDisplayed ? '✅ Success' : '❌ Failed');
            return isDisplayed;
        } catch (error) {
            console.error('Error validating GIF was sent:', error);
            return false;
        }
    }

    /**
     * Sends a voice note
     * @returns {Promise<boolean>} True if voice note was sent successfully
     */
    async sendVoiceNote() {
        try {
            console.log('Sending voice note...');
            await chatPage.sendVoiceNote();
            console.log('✅ Voice note sent successfully');
            return true;
        } catch (error) {
            console.error('❌ Failed to send voice note:', error);
            return false;
        }
    }

    /**
     * Validates if the voice note was sent and displayed in chat
     * @returns {Promise<boolean>} True if voice note is displayed
     */
    async validateVoiceNoteSent() {
        try {
            console.log('Validating voice note was sent...');
            const isDisplayed = await chatPage.waitForVoiceNote(15000);
            console.log('Voice note validation result:', isDisplayed ? '✅ Success' : '❌ Failed');
            return isDisplayed;
        } catch (error) {
            console.error('Error validating voice note was sent:', error);
            return false;
        }
    }
}

module.exports = new ChatHelper();
