const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

(async function runTests() {
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options())
        .build();

    try {
        // 1. Regisztráció tesztelése
        /*await driver.get('http://localhost/vizsgaremek/Vizsgaremek/bejelentkezes/bejelentkezes.php');
        console.log("reg gomb keere")
        const regButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id('regButton'))), 5000);
        await regButton.click();
        await driver.sleep(1000);
        await driver.findElement(By.id('Regfelhasznalonev')).sendKeys('teszt1');
        await driver.findElement(By.id('Regpassword')).sendKeys('teszt');
        await driver.findElement(By.id('RegpasswordMegint')).sendKeys('teszt');
        await driver.findElement(By.id('Regemail')).sendKeys('tesztadat@gmail.com');
        await driver.sleep(1000);

        await driver.findElement(By.id('regisztral')).click();

        await driver.sleep(1000);


        await driver.wait(until.alertIsPresent(), 5000);
        let alert = await driver.switchTo().alert();
        let alertText = await alert.getText();

        if (alertText.includes("Sikeres regisztráció")) {
            console.log("✅ Sikeres regisztráció.");
        } else {
            console.log("⚠️ Váratlan alert szöveg: " + alertText);
        }
        

        await driver.sleep(2000);
        */
        // 2. Hiányos regisztráció tesztelése
        await driver.get('http://localhost/vizsgaremek/Vizsgaremek/bejelentkezes/bejelentkezes.php');

        const regButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id('regButton'))), 5000);
        await regButton.click();
        await driver.sleep(1000);
        await driver.findElement(By.id('Regfelhasznalonev')).sendKeys('teszt1');
        await driver.findElement(By.id('Regpassword')).sendKeys('teszt');
        await driver.findElement(By.id('RegpasswordMegint')).sendKeys('teszt');
       
        await driver.sleep(1000);

        await driver.findElement(By.id('regisztral')).click();

        await driver.sleep(1000);
        let latszike;
        try {
            let progressBar = await driver.wait(until.elementLocated(By.id('regisztracioProgressBar')), 5000);
            latszike = await progressBar.isDisplayed();
        } catch (err) {
            latszike = false;
        }

        if (latszike) {
            console.log("✅ Regisztráció hiba jelzés megjelent.");
        } else {
            console.log("❌ Probléma adódott a hiba jelzéssel.");
        }

    } catch (error) {
        console.error("❌ Hiba történt:", error);
    } finally {
        await driver.quit();
    }
})();
