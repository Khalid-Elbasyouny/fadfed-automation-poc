const Page = require('./page');

class ChatPage extends Page {
    // Friend list elements
    get friendsButton() { return $('id:sa.fadfed.fadfedapp:id/imageButtonFriends'); }
    get friendsList() { return $('id:sa.fadfed.fadfedapp:id/friendsRecyclerView'); }
    get firstFriend() { return $('id:sa.fadfed.fadfedapp:id/relativeLayout2'); }
    
    // Friend's Profile Validation elements
    get NormalContactPhoto() { return $('id:sa.fadfed.fadfedapp:id/contactPhoto'); }
    get PremiumContactPhoto() { return $('id:sa.fadfed.fadfedapp:id/userPhotoPremium'); }
    get removeConversationOption() { return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutRemoveConversation")'); }
    get confirmDeleteButton() { return $('android=new UiSelector().resourceId("android:id/button1")'); }
    get messagesList() { return $('id:sa.fadfed.fadfedapp:id/messagesList'); }
    get bubbleContainers() { return $$('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/bubbleContainer")'); }
    get contactName() { return $('id:sa.fadfed.fadfedapp:id/contactName'); }
    get removeFriendOption() { return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutRemoveFriend")'); }
    get confirmRemoveFriendButton() { return $('id:android:id/button1'); }
    get conversationsList() { return $('id:sa.fadfed.fadfedapp:id/recyclerViewConversations'); }
    get noFriendsImage() { return $('id:sa.fadfed.fadfedapp:id/imageViewNoFriends'); }
    get conversationUserNames() { return $$('id:sa.fadfed.fadfedapp:id/textViewUserName'); }
    get notifyOnceOnlineSwitch() { return $('id:sa.fadfed.fadfedapp:id/switchNotifyOnline'); }
    get backBtn() { return $('id:sa.fadfed.fadfedapp:id/layoutStartButton'); }

    // tap back button
    async tapBackButton() {
        await this.backBtn.waitForDisplayed({ timeout: 5000 });
        await this.backBtn.click();
    }
    // Friend's Profile Validation methods
    async openFriendProfile() {
        await this.contactName.waitForDisplayed({ timeout: 10000 });
        await this.contactName.click();
    }

    async removeConversation() {
        await this.removeConversationOption.waitForDisplayed({ timeout: 10000 });
        await this.removeConversationOption.click();
        await this.confirmDeleteButton.waitForDisplayed({ timeout: 5000 });
        await this.confirmDeleteButton.click();
    }

    /**
     * Toggles a switch and returns the before/after states
     * @param {WebdriverIO.Element} element - The switch element to toggle
     * @returns {Promise<{before: string, after: string}>} Object containing before and after states
     */
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

    async removeFriend() {
        await this.contactName.waitForDisplayed({ timeout: 10000 });
        const name = await this.contactName.getText();
        await this.contactName.click();
        await this.removeFriendOption.waitForDisplayed({ timeout: 5000 });
        await this.removeFriendOption.click();
        await this.confirmRemoveFriendButton.waitForDisplayed({ timeout: 5000 });
        await this.confirmRemoveFriendButton.click();
        return name;
    }

    async getBubbleContainerCount() {
        await this.messagesList.waitForDisplayed({ timeout: 10000 });
        return (await this.bubbleContainers).length;
    }

    async isConversationInList(contactName) {
        await this.conversationsList.waitForDisplayed({ timeout: 2000 });
        const userNames = await this.conversationUserNames;
        for (const element of userNames) {
            if ((await element.getText()) === contactName) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Opens the conversations screen
     * @returns {Promise<boolean>} True if conversations screen is opened successfully
     */
    async openConversations() {
        try {
            console.log('Opening conversations...');
            // Try to click the conversations button if it's visible
            if (await this.conversationsButton.isDisplayed()) {
                await this.conversationsButton.click();
                await driver.pause(2000); // Wait for the screen to load
                return true;
            }
            
            // If conversations button is not found, try to navigate back to home first
            await driver.back();
            await driver.pause(1000);
            
            if (await this.conversationsButton.isDisplayed()) {
                await this.conversationsButton.click();
                await driver.pause(2000);
                return true;
            }
            
            console.log('Could not find conversations button');
            return false;
        } catch (error) {
            console.error('Error in openConversations:', error.message);
            return false;
        }
    }
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
    
    // Voice note selectors
    get recordButton() { return $('id:sa.fadfed.fadfedapp:id/record_ib'); }
    get allowMicrophoneButton() { return $('id=com.android.permissioncontroller:id/permission_allow_foreground_only_button'); }
    
    // Voice message container (the main bubble)
    get lastVoiceMessage() { 
        // Look for the most recent voice message container
        // It might be in a FrameLayout or other container
        return $('(//*[contains(@resource-id, "voice") or contains(@class, "VoiceMessageView")])[last()]');
    }
    
    // Duration text (e.g., "0:03")
    get lastVoiceNoteDuration() { 
        // Look for any text view that contains a colon (e.g., "0:03")
        // Search in the last voice message or globally if not found
        return $('(//*[contains(@resource-id, "duration") or contains(@text, ":")])[last()]');
    }
    
    // Play/pause button
    get lastVoiceNotePlayButton() {
        // Look for any play button in the voice message or globally
        return $('(//*[contains(@resource-id, "play") or contains(@content-desc, "play") or @content-desc="Play"])[last()]');
    }
    
    // GIF selectors
    get gifTabButton() { return $('id:sa.fadfed.fadfedapp:id/rbGifs'); }
    get firstGif() { return $('(//*[@resource-id="sa.fadfed.fadfedapp:id/gifRecycler"]//android.widget.ImageView)[1]'); }

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
                await allowAllBtn.waitForDisplayed({ timeout: 1200 });
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

    /**
     * Sends a GIF from the GIF picker
     */
    async sendGifFromGallery() {
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
            
            // 3. Tap GIF tab
            await this.gifTabButton.waitForDisplayed({ timeout: 10000 });
            await this.gifTabButton.click();
            
            // 4. Select first GIF
            await this.firstGif.waitForDisplayed({ timeout: 10000 });
            await this.firstGif.click();
            
            // 6. Wait for GIF to appear in chat
            await this.waitForGifToAppear(15000);
            return true;
            
        } catch (error) {
            console.error('❌ Error in sendGifFromGallery:', error.message);
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            await driver.saveScreenshot(`./screenshots/error-send-gif-${timestamp}.png`);
            throw error;
        }
    }
    
    /**
     * Waits for a GIF to appear in the chat
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForGifToAppear(timeout = 10000) {
        return this.waitForImageToAppear(timeout);
    }

    /**
     * Performs a short tap on the record button
     */
    async tapRecordButtonShort() {
        await this.recordButton.waitForDisplayed({ timeout: 10000 });
        await this.recordButton.click();
        console.log('✅ Tapped record button');
    }

    /**
     * Performs a long press on the record button
     * @param {number} duration - Duration of the long press in milliseconds (default: 3000ms)
     */
    async longPressRecordButton(duration = 3000) {
        console.log(`Starting long press on record button for ${duration}ms...`);
        await this.recordButton.waitForDisplayed({ timeout: 10000 });
        
        // Add a small delay before starting the long press
        await driver.pause(500);
        
        // Get the location and size of the record button
        const location = await this.recordButton.getLocation();
        const size = await this.recordButton.getSize();
        
        // Calculate the center of the button
        const centerX = location.x + (size.width / 2);
        const centerY = location.y + (size.height / 2);
        
        try {
            // Perform the long press using touch actions
            await driver.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: centerX, y: centerY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: duration },
                    { type: 'pointerUp', button: 0 }
                ]
            }]);
            
            console.log(`✅ Successfully performed long press on record button for ${duration}ms`);
            
            // Add a small delay after the long press to ensure the recording is processed
            await driver.pause(1000);
            
        } catch (error) {
            console.error('❌ Error during long press:', error.message);
            throw error;
        }
    }

    /**
     * Handles microphone permission dialog if it appears
     */
    async handleMicrophonePermission() {
        try {
            const allowBtn = await this.allowMicrophoneButton;
            await allowBtn.waitForDisplayed({ timeout: 3000 });
            await allowBtn.click();
            console.log('✅ Microphone permission granted');
        } catch (e) {
            console.log('ℹ️ No microphone permission dialog appeared or already granted');
        }
    }

    /**
     * Records and sends a voice note
     */
    async sendVoiceNote() {
        try {
            // 1. Short tap to initialize recording
            await this.tapRecordButtonShort();
            
            // 2. Handle microphone permission if it appears
            await this.handleMicrophonePermission();
            
            // 3. Long press to record (3 seconds)
            await this.longPressRecordButton(3000);
            
            // 4. Wait for voice note to be sent and appear in chat
            await this.waitForVoiceNote(15000);
            return true;
            
        } catch (error) {
            console.error('❌ Error in sendVoiceNote:', error.message);
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            await driver.saveScreenshot(`./screenshots/error-voice-note-${timestamp}.png`);
            throw error;
        }
    }

    /**
     * Waits for a voice note to appear in the chat by checking for the timestamp
     * @param {number} timeout - Timeout in milliseconds (default: 15000)
     * @returns {Promise<boolean>} True if voice note is found, false otherwise
     */
    async waitForVoiceNote(timeout = 15000) {
        console.log(`Waiting for voice note timestamp to appear (timeout: ${timeout}ms)...`);
        const startTime = Date.now();
        const checkInterval = 1000; // Check every second
        
        while (Date.now() - startTime < timeout) {
            try {
                // Check for the timestamp element which indicates a voice note was sent
                const timeElement = await $('id:sa.fadfed.fadfedapp:id/textViewTime');
                
                if (await timeElement.isDisplayed()) {
                    const timeText = await timeElement.getText();
                    console.log(`✅ Found voice note timestamp: ${timeText}`);
                    
                    // Verify the time format (e.g., "00:03" or "0:03")
                    const timeRegex = /^\d{1,2}:\d{2}$/;
                    if (timeRegex.test(timeText)) {
                        console.log('✅ Voice note timestamp format is valid');
                        
                        // Also check if the voice note player is visible
                        const voicePlayer = await $('//*[contains(@resource-id, "voicePlayerView")]');
                        const isPlayerVisible = await voicePlayer.isDisplayed().catch(() => false);
                        
                        if (isPlayerVisible) {
                            console.log('✅ Voice note player is visible');
                            return true;
                        } else {
                            console.log('⚠️ Voice note player not found');
                        }
                    } else {
                        console.log(`⚠️ Unexpected time format: ${timeText}`);
                    }
                }
            } catch (e) {
                // Log the error but continue trying
                console.log(`⚠️ Error while checking for voice note: ${e.message}`);
            }
            
            // Log progress
            const elapsed = Math.round((Date.now() - startTime) / 1000);
            if (elapsed % 2 === 0) { // Log every 2 seconds to avoid cluttering
                console.log(`ℹ️ Waiting for voice note... (${elapsed}s elapsed)`);
                
                // Take a screenshot every 4 seconds for debugging
                if (elapsed % 4 === 0) {
                    try {
                        await driver.saveScreenshot(`./screenshots/voice-note-wait-${elapsed}s.png`);
                    } catch (e) {
                        console.log('⚠️ Could not take screenshot:', e.message);
                    }
                }
            }
            
            await driver.pause(checkInterval);
        }
        
        // Before failing, take a screenshot for debugging
        try {
            console.log('❌ Voice note not found, capturing debug information...');
            await driver.saveScreenshot(`./screenshots/voice-note-timeout-${Date.now()}.png`);
            
            // Save page source for further analysis
            const pageSource = await driver.getPageSource();
            require('fs').writeFileSync(`./screenshots/page-source-${Date.now()}.xml`, pageSource);
            console.log('📄 Page source saved for debugging');
            
            // Try to find any elements that might help with debugging
            try {
                const allElements = await driver.$$('*');
                console.log(`📊 Found ${allElements.length} elements on the page`);
                
                // Log the first 20 elements for debugging
                for (let i = 0; i < Math.min(20, allElements.length); i++) {
                    try {
                        const elem = allElements[i];
                        const id = await elem.getAttribute('resource-id') || 'no-id';
                        const text = await elem.getText().catch(() => 'no-text');
                        const className = await elem.getAttribute('class') || 'no-class';
                        console.log(`  - Element ${i + 1}: id=${id}, class=${className}, text=${text.substring(0, 50)}`);
                    } catch (e) {
                        console.log(`  - Element ${i + 1}: Error getting element info`);
                    }
                }
            } catch (e) {
                console.log('⚠️ Could not log page elements:', e.message);
            }
            
        } catch (e) {
            console.log('⚠️ Could not save debug information:', e.message);
        }
        
        console.error('❌ Voice note not found within timeout');
        return false;
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
