const Page = require("./page");

class MatchingPage extends Page {

    get tabMatching() {
        return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/navigation_matching")');
        }
    get  FemaleGenders(){
        return $('-android uiautomator:new UiSelector().className("android.widget.RelativeLayout").instance(0)');
        }
    get  allGenders(){
        return $('-android uiautomator:new UiSelector().className("android.widget.RelativeLayout").instance(1)');
        }
    get MaleGenders(){
        return $('-android uiautomator:new UiSelector().className("android.widget.RelativeLayout").instance(2)');
        }
        // country filter sellectors
    get Countryfilter(){
        return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/textViewCountry")')
        }
    get countrySearchLayout() {
         return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/layoutCountryRange")');
     }
    get savePreferencesBtn() {
         return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/buttonSavePreferences")');
     }
     get tabVoiceConversation() {
         return $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/voiceConversation")');
     }
     get passButton() {
         return $('id:sa.fadfed.fadfedapp:id/buttonSkipMatch');
     }



    async openMatchingScreen() {
        await this.tabMatching.waitForDisplayed({ timeout: 5000 });
        await this.tabMatching.click();
        }
    async tapFemaleGenders() {
        await this.FemaleGenders.waitForDisplayed({ timeout: 5000 });
        await this.FemaleGenders.click();
        }
    async tapAllGenders() {
        await this.allGenders.waitForDisplayed({ timeout: 5000 });
        await this.allGenders.click();
        }
    async tapVoiceConversation() {
        await this.tabVoiceConversation.waitForDisplayed({ timeout: 5000 });
        await this.tabVoiceConversation.click();
        }
    async tapCountryFilter() {
        await this.Countryfilter.waitForDisplayed({ timeout: 5000 });
        await this.Countryfilter.click();
        }
    async tapPassButton() {
        await this.passButton.waitForDisplayed({ timeout: 10000 });
        await this.passButton.click();
    }


}
module.exports = new MatchingPage();