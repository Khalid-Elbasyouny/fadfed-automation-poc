async function ValidInfoForm() {
  const nameInput = await $("id:sa.fadfed.fadfedapp:id/editTextName");
  await nameInput.waitForDisplayed({ timeout: 2000 });
  await nameInput.addValue("face-test");

  const ageField = await $("id:sa.fadfed.fadfedapp:id/textViewAge");
  await ageField.waitForDisplayed({ timeout: 2000 });
  await ageField.click();

  await driver.pause(500);

  await driver
    .action("pointer")
    .move({ duration: 0, x: 570, y: 1366 })
    .down({ button: 0 })
    .move({ duration: 1000, x: 590, y: 2000 })
    .up({ button: 0 })
    .perform();

  await driver.pause(1500);

  const ageOkBtn = await $("id:android:id/button1");
  await ageOkBtn.waitForDisplayed({ timeout: 1000 });
  await ageOkBtn.click();

  const genderBtn = await $("id:sa.fadfed.fadfedapp:id/buttonGenderMale");
  await genderBtn.click();

  await driver.pause(500);
  await driver
    .action("pointer")
    .move({ duration: 0, x: 538, y: 2055 })
    .down({ button: 0 })
    .move({ duration: 1000, x: 554, y: 1346 })
    .up({ button: 0 })
    .perform();

  await driver.pause(500);

  const confirmBtn = await $("id:sa.fadfed.fadfedapp:id/buttonSubmit");
  await confirmBtn.waitForDisplayed({ timeout: 5000 });
  await confirmBtn.waitForEnabled({ timeout: 5000 });
  await confirmBtn.click();
}

module.exports = {
  ValidInfoForm,
};
