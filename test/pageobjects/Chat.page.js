const Page = require('./page');

class ChatPage extends Page {
    // Friend list elements
    get friendsButton() { return $('id:sa.fadfed.fadfedapp:id/imageButtonFriends'); }
    get friendsList() { return $('id:sa.fadfed.fadfedapp:id/friendsRecyclerView'); }
    get firstFriend() { return $('id:sa.fadfed.fadfedapp:id/relativeLayout2'); }
    // Main page elements
    get conversationsButton() { return $('id:sa.fadfed.fadfedapp:id/navigation_conversations'); }
    get conversationsList() { return $('id:sa.fadfed.fadfedapp:id/recyclerViewConversations'); }
    get firstConversation() { 
        const selector = 'new UiSelector().className(\"androidx.appcompat.widget.LinearLayoutCompat\").instance(0)';
        return $(`android=${selector}`);
    }

    // Chat screen elements
    get messageInput() { 
        // Using the correct class name for the input field
        return $('android.widget.EditText');
    }
    
    get sendButton() { 
        // Using the correct ID for the send button
        return $('id:sa.fadfed.fadfedapp:id/messageSend');
    }
    
    // Message elements
    getLastMessageByText(text) {
        // Using XPath to find message by text
        return $(`//android.widget.TextView[@resource-id="sa.fadfed.fadfedapp:id/messageText" and @text="${text}"]`);
    }

    // Navigation methods
    async openConversations() {
        try {
            // First try to click the conversations button if it's visible
            if (await this.conversationsButton.isDisplayed()) {
                await this.conversationsButton.click();
                await driver.pause(2000); // Wait for the screen to load
            }
            
            // Check if we're already on the conversations screen
            if (await this.conversationsList.isDisplayed()) {
                return true;
            }
            
            // If not, try to find the conversations tab in the bottom navigation
            const conversationsTab = await $('//android.widget.FrameLayout[@content-desc="Conversations"]');
            if (await conversationsTab.isDisplayed()) {
                await conversationsTab.click();
                await driver.pause(2000);
            }
            
            // Final check if conversations list is displayed
            if (!(await this.conversationsList.isDisplayed())) {
                console.log('Conversations list not found, trying to find friends instead');
                return false;
            }
            
            return true;
        } catch (error) {
            console.log('Error in openConversations:', error.message);
            return false;
        }
    }

    async hasConversations() {
        try {
            await this.firstConversation.waitForDisplayed({ timeout: 5000 });
            return await this.firstConversation.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    async openFirstConversation() {
        if (!(await this.hasConversations())) {
            throw new Error('No conversations found');
        }
        await this.firstConversation.click();
        await this.messageInput.waitForDisplayed({ timeout: 10000 });
    }

    // Message methods
    async sendMessage(text) {
        try {
            console.log(`Sending message: "${text}"`);
            
            // 1. Wait for input field to be displayed
            await this.messageInput.waitForDisplayed({ timeout: 10000 });
            
            // 2. Click the input field to focus it
            await this.messageInput.click();
            
            // 3. Clear any existing text
            await driver.keys('\uE017\uE006'); // Ctrl+A then Delete
            
            // 4. Type the text using the native keyboard
            await driver.keys(text.split(''));
            
            // 6. Take a screenshot for debugging
            await driver.saveScreenshot('./before-send.png');
            
            // 7. Click the send button
            await this.sendButton.click();
            
            // 8. Wait for the message to be sent
            await driver.pause(1500);
            
            // 9. Take another screenshot after sending
            await driver.saveScreenshot('./after-send.png');
            
            // 10. Verify the message was sent successfully
            const isDisplayed = await this.isMessageDisplayed(text);
            if (!isDisplayed) {
                throw new Error('Message was not displayed after sending');
            }
            
            console.log('Message sent successfully!');
            return true;
            
        } catch (error) {
            console.error('Error in sendMessage:', error.message);
            // Take a screenshot for debugging
            await driver.saveScreenshot('./error-send-message-failed.png');
            throw error;
        }
    }

    async isMessageDisplayed(text) {
        try {
            // First try to find the message with exact text match
            const message = this.getLastMessageByText(text);
            if (await message.isDisplayed()) {
                return true;
            }
        } catch (e) {
            console.log(`Message with exact text not found, trying partial match for: ${text}`);
        }
        
        try {
            // If exact match fails, try to find a message that contains the text
            // This is more reliable for emojis and dynamic content
            const messages = await $$('//android.widget.TextView[contains(@resource-id, "messageText")]');
            const lastMessage = messages[messages.length - 1];
            const lastMessageText = await lastMessage.getText();
            
            // For debugging
            console.log('Last message in chat:', lastMessageText);
            console.log('Looking for text:', text);
            
            return lastMessageText.includes(text);
        } catch (e) {
            console.error('Error in isMessageDisplayed:', e.message);
            return false;
        }
    }

    // Friend chat methods
    async openFriendsList() {
        await this.friendsButton.waitForDisplayed({ timeout: 10000 });
        await this.friendsButton.click();
        await this.friendsList.waitForDisplayed({ timeout: 10000 });
    }

    async hasFriends() {
        try {
            await this.firstFriend.waitForDisplayed({ timeout: 5000 });
            return await this.firstFriend.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    async openFirstFriendChat() {
        if (!(await this.hasFriends())) {
            throw new Error('No friends found');
        }
        await this.firstFriend.click();
        await this.messageInput.waitForDisplayed({ timeout: 10000 });
    }
}

module.exports = new ChatPage();
