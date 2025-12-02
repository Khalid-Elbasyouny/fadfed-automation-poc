const chatPage = require('../pageobjects/Chat.page');

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
}

module.exports = new ChatHelper();
