
const MatchingPage = require("../../pageobjects/Matching.page");

async function filterByCountry(countryName) {
    // فتح شاشة الماتشينج
    await MatchingPage.openMatchingScreen();

    // فتح فلتر الدولة
    await MatchingPage.tapCountryFilter();
    await MatchingPage.countrySearchLayout.waitForDisplayed({ timeout: 5000 });

    // كتابة اسم الدولة
    const searchInput = await $('android=new UiSelector().resourceId("sa.fadfed.fadfedapp:id/editTextSearchCountries")');
    await searchInput.setValue(countryName);

    // انتظار ظهور قائمة الدول
    const countryList = await $('android=new UiSelector().className("androidx.recyclerview.widget.RecyclerView")');
    await countryList.waitForDisplayed({ timeout: 5000 });

    // اختيار أول نتيجة بعد البحث
    const firstCountry = await $('android=new UiSelector().className("android.view.ViewGroup").instance(1)');
    await firstCountry.waitForDisplayed({ timeout: 5000 });

    if (!(await firstCountry.isDisplayed())) {
        throw new Error(`❌ لم يتم العثور على أي دولة بعد البحث عن: ${countryName}`);
    }

    await firstCountry.click();

    // حفظ التغييرات
    await MatchingPage.savePreferencesBtn.waitForDisplayed({ timeout: 5000 });
    await MatchingPage.savePreferencesBtn.click();
}

module.exports = { filterByCountry };

