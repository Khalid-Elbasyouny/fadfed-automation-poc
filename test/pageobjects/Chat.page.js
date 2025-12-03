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
    
    // Conversation starters elements
    get conversationStarterButton() {
        return $('id:sa.fadfed.fadfedapp:id/imageButtonConversationStarter');
    }
    
    get refreshStarterButton() {
        return $('id:sa.fadfed.fadfedapp:id/buttonRefresh');
    }
    
    get conversationStarterContainer() {
        return $('id:sa.fadfed.fadfedapp:id/recyclerViewQuestions');
    }
    
    get conversationStarters() {
        return $$('//androidx.appcompat.widget.LinearLayoutCompat[contains(@resource-id, "sa.fadfed.fadfedapp:id/questionItem")]');
    }
    
    get cardRoot() {
        return $('id:sa.fadfed.fadfedapp:id/cardViewRoot');
    }

    // Media sharing selectors
    get addMediaButton() { return $('id:sa.fadfed.fadfedapp:id/addMedia'); }
    get galleryButton() { return $('id:sa.fadfed.fadfedapp:id/addMediaAlbum'); }
    get firstVideoItem() { return $('android=new UiSelector().className("android.view.View").instance(14)'); }
    get firstPhotoItem() { return $('android=new UiSelector().className("android.view.View").instance(19)'); }
    get sendMessageButton() { return $('id:sa.fadfed.fadfedapp:id/sendButton'); }
    get sendVideoButton() { return $('id:sa.fadfed.fadfedapp:id/imageButtonSend'); }
    get lastSentMedia() { return $('(//*[@resource-id="sa.fadfed.fadfedapp:id/image"])[last()]'); }
    get allowAllPhotosButton() { return $('id=com.android.permissioncontroller:id/permission_allow_all_button'); }

    // Message elements
    getLastMessageByText(text) {
        // Using XPath to find message by text
        return $(`//android.widget.TextView[@resource-id="sa.fadfed.fadfedapp:id/messageText" and @text="${text}"]`);
    }

    /**
     * Sends a photo from gallery
     */
    async sendPhotoFromGallery() {
        try {
            // 1. Tap Add Media button
            await this.addMediaButton.waitForDisplayed({ timeout: 10000 });
            await this.addMediaButton.click();
            
            // 2. Handle permission dialog if it appears
            try {
                const allowAllBtn = await this.allowAllPhotosButton;
                await allowAllBtn.waitForDisplayed({ timeout: 5000 });
                await allowAllBtn.click();
                console.log('✅ Gallery permission granted');
            } catch (e) {
                console.log('ℹ️ No permission dialog appeared or already granted');
            }
            
            // 3. Wait for and tap Gallery option
            await this.galleryButton.waitForDisplayed({ timeout: 10000 });
            await this.galleryButton.click();

            
            // 5. Select first image
            await this.firstPhotoItem.waitForDisplayed({ timeout: 10000 });
            await this.firstPhotoItem.click();
            
            // 6. Wait for image to be selected
            await driver.pause(2000);
            
            // 7. Tap send button
            await this.sendMessageButton.waitForDisplayed({ timeout: 10000 });
            await this.sendMessageButton.click();
            
            // 8. Wait for the image to be sent
            await this.waitForImageToAppear(15000);
            return true;
            
        } catch (error) {
            console.error('❌ Error in sendPhotoFromGallery:', error.message);
            // Take a screenshot for debugging
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            await driver.saveScreenshot(`./screenshots/error-send-photo-${timestamp}.png`);
            throw error;
        }
    }
    
    /**
     * Waits for an image to appear in the chat
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForImageToAppear(timeout = 10000) {
        const startTime = Date.now();
        const checkInterval = 1000; // Check every second
        
        while (Date.now() - startTime < timeout) {
            try {
                const image = this.lastSentMedia;
                if (await image.isDisplayed()) {
                    console.log('✅ Media is displayed in chat');
                    return true;
                }
            } catch (e) {
                // Media not found yet, continue waiting
                console.log('Waiting for media to appear...');
            }
            await driver.pause(checkInterval);
        }
        
        throw new Error(`Media did not appear in chat after ${timeout}ms`);
    }

    /**
     * Sends a video from gallery
     */
    async sendVideoFromGallery() {
        try {
            // 1. Tap Add Media button
            await this.addMediaButton.waitForDisplayed({ timeout: 10000 });
            await this.addMediaButton.click();
            
            // 2. Handle permission dialog if it appears
            try {
                const allowAllBtn = await this.allowAllPhotosButton;
                await allowAllBtn.waitForDisplayed({ timeout: 5000 });
                await allowAllBtn.click();
                console.log('✅ Gallery permission granted');
            } catch (e) {
                console.log('ℹ️ No permission dialog appeared or already granted');
            }
            
            // 3. Wait for and tap Gallery option
            await this.galleryButton.waitForDisplayed({ timeout: 10000 });
            await this.galleryButton.click();

            
            // 5. Select first video (using same selector as images)
            await this.firstVideoItem.waitForDisplayed({ timeout: 10000 });
            await this.firstVideoItem.click();
            
            // 6. Wait for video to be selected
            await driver.pause(2000);
            
            // 7. Tap SEND VIDEO button (different from photo send button)
            await this.sendVideoButton.waitForDisplayed({ timeout: 10000 });
            await this.sendVideoButton.click();
            
            // 8. Wait for the video to be sent
            await this.waitForVideoToAppear(15000);
            return true;
            
        } catch (error) {
            console.error('❌ Error in sendVideoFromGallery:', error.message);
            // Take a screenshot for debugging
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            await driver.saveScreenshot(`./screenshots/error-send-video-${timestamp}.png`);
            throw error;
        }
    }
    
    /**
     * Waits for a video to appear in the chat
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForVideoToAppear(timeout = 15000) {
        return this.waitForImageToAppear(timeout);
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

    async isMessageDisplayed(text, timeout = 10000) {
        const startTime = Date.now();
        const checkInterval = 1000; // Check every second
        let lastError = '';
        
        while (Date.now() - startTime < timeout) {
            try {
                // 1. First try exact match
                const exactMessage = this.getLastMessageByText(text);
                if (await exactMessage.isDisplayed()) {
                    console.log(`✅ Found exact message match: "${text}"`);
                    return true;
                }
            } catch (e) {
                lastError = `Exact match not found: ${e.message}`;
            }
            
            try {
                // 2. Try partial match in all messages
                const messages = await $$('//android.widget.TextView[contains(@resource-id, "messageText")]');
                
                if (messages.length > 0) {
                    // Check all messages (not just the last one)
                    for (const msg of messages) {
                        try {
                            const msgText = await msg.getText();
                            if (msgText.includes(text)) {
                                console.log(`✅ Found partial match: "${text}" in message: "${msgText}"`);
                                return true;
                            }
                        } catch (e) {
                            // Skip any errors with individual messages
                        }
                    }
                    
                    // If we have messages but no match yet, log the last message for debugging
                    const lastMsg = await messages[messages.length - 1].getText();
                    console.log(`🔍 Last message in chat: "${lastMsg}"`);
                } else {
                    console.log('ℹ️ No messages found in the chat');
                }
            } catch (e) {
                lastError = `Error checking messages: ${e.message}`;
            }
            
            // Wait before next check
            await driver.pause(checkInterval);
        }
        
        // If we get here, the message wasn't found within the timeout
        console.error(`❌ Message not found after ${timeout/1000} seconds: "${text}"`);
        console.error(`Last error: ${lastError}`);
        
        // Take a screenshot for debugging
        try {
            const screenshot = await driver.takeScreenshot();
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const screenshotPath = `./screenshots/error-${timestamp}.png`;
            await require('fs').writeFileSync(screenshotPath, screenshot, 'base64');
            console.log(`📸 Screenshot saved to: ${screenshotPath}`);
        } catch (e) {
            console.error('Failed to take screenshot:', e.message);
        }
        
        return false;
    }

    // Conversation starters methods
    async openConversationStarters() {
        try {
            // Close keyboard if open
            try {
                await this.cardRoot.click();
                await driver.pause(500);
            } catch (e) {
                console.log('No keyboard to close or card not clickable');
            }
            
            // Click the conversation starter button
            await this.conversationStarterButton.waitForDisplayed({ timeout: 10000 });
            await this.conversationStarterButton.click();
            
            // Wait for the container to be visible
            await this.conversationStarterContainer.waitForDisplayed({ timeout: 5000 });
            return true;
        } catch (e) {
            console.error('Failed to open conversation starters:', e);
            return false;
        }
    }
    
    async refreshConversationStarters() {
        try {
            await this.refreshStarterButton.waitForClickable({ timeout: 5000 });
            await this.refreshStarterButton.click();
            return true;
        } catch (e) {
            console.error('Failed to refresh conversation starters:', e);
            return false;
        }
    }
    
    async getCurrentStarterQuestions() {
        try {
            const questions = [];
            const questionElements = await this.conversationStarters;
            
            for (const element of questionElements) {
                try {
                    const text = await element.getText();
                    if (text) questions.push(text.trim());
                } catch (e) {
                    console.log('Could not get text from question element:', e);
                }
            }
            
            console.log('Current starter questions:', questions);
            return questions;
        } catch (e) {
            console.error('Error getting starter questions:', e);
            return [];
        }
    }

    // Conversation starters methods
    async openConversationStarters() {
        try {
            // Close keyboard if open
            try {
                await this.cardRoot.click();
                await driver.pause(500);
            } catch (e) {
                console.log('No keyboard to close or card not clickable');
            }
            
            // Click the conversation starter button
            await this.conversationStarterButton.waitForDisplayed({ timeout: 10000 });
            await this.conversationStarterButton.click();
            
            // Wait for the container to be visible
            await this.conversationStarterContainer.waitForDisplayed({ timeout: 5000 });
            return true;
        } catch (e) {
            console.error('Failed to open conversation starters:', e);
            return false;
        }
    }
    
    async refreshConversationStarters() {
        try {
            await this.refreshStarterButton.waitForClickable({ timeout: 5000 });
            await this.refreshStarterButton.click();
            return true;
        } catch (e) {
            console.error('Failed to refresh conversation starters:', e);
            return false;
        }
    }
    
    async getCurrentStarterQuestions() {
        try {
            const questions = [];
            const questionElements = await this.conversationStarters;
            
            for (const element of questionElements) {
                try {
                    const text = await element.getText();
                    if (text) questions.push(text.trim());
                } catch (e) {
                    console.log('Could not get text from question element:', e);
                }
            }
            
            console.log('Current starter questions:', questions);
            return questions;
        } catch (e) {
            console.error('Error getting starter questions:', e);
            return [];
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
