const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function setupDriver() {
    return await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options())
        .build();
}

async function testSikeresRegisztracio() {
    let driver = await setupDriver();
    try {
        await driver.get('http://localhost/13c-toth/Vizsgaremek/bejelentkezes/bejelentkezes.php');
        const regButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id('regButton'))), 5000);
        await regButton.click();
        await driver.sleep(1000);
        await driver.findElement(By.id('Regfelhasznalonev')).sendKeys('teszt1');
        await driver.findElement(By.id('Regpassword')).sendKeys('teszt');
        await driver.findElement(By.id('RegpasswordMegint')).sendKeys('teszt');
        await driver.findElement(By.id('Regemail')).sendKeys('tesztadat@gmail.com');
        await driver.sleep(1000);
        await driver.findElement(By.id('regisztral')).click();

        await driver.wait(until.alertIsPresent(), 5000);
        let alert = await driver.switchTo().alert();
        let alertText = await alert.getText();
        alert.accept();

        if (alertText.includes("Sikeres regisztráció")) {
            console.log("✅ Sikeres regisztráció.");
        } else {
            console.log("⚠️ Váratlan alert szöveg: " + alertText);
        }

    } catch (error) {
        console.error("❌ Hiba történt a sikeres regisztrációnál:", error);
    } finally {
        await driver.quit();
    }
}

async function testHianyosRegisztracio() {
    let driver = await setupDriver();
    try {
        await driver.get('http://localhost/13c-toth/Vizsgaremek/bejelentkezes/bejelentkezes.php');
        const regButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id('regButton'))), 5000);
        await regButton.click();
        await driver.sleep(1000);
        await driver.findElement(By.id('Regfelhasznalonev')).sendKeys('teszt2');
        await driver.findElement(By.id('Regpassword')).sendKeys('teszt');
        await driver.findElement(By.id('RegpasswordMegint')).sendKeys('teszt');
        // Missing email on purpose

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
        console.error("❌ Hiba történt a hiányos regisztrációnál:", error);
    } finally {
        await driver.quit();
    }
}

(async function runAllTests() {
    await testSikeresRegisztracio();
    await testHianyosRegisztracio();
})();
