const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function setupDriver() {
    return await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options())
        .build();
}

async function tesztReceptFelolt() {
    let driver = await setupDriver();
    bejelentkezes()
    try {
        await driver.get('http://localhost/13c-toth/Vizsgaremek/receptfeltolto/receptfeltolto.php');

        await driver.findElement(By.id('receptNev')).sendKeys('tesztadat');
        const hozzavalokGomb = await driver.wait(until.elementIsVisible(driver.findElement(By.id('hozzaadKategoriaGomb'))), 5000);
        await hozzavalokGomb.click();
        await driver.sleep(1000);
        await driver.findElement(By.id('hozzavalokKategoriaInput0')).sendKeys('tesztadatKateg');
        const hozzaAdGomb = await driver.wait(until.elementIsVisible(driver.findElement(By.id('tesztId'))), 5000);
        await hozzaAdGomb.click();
        await driver.findElement(By.id('hozzavNev_tesztId')).sendKeys('tesztadat neve');
        await driver.findElement(By.id('receptNev')).sendKeys('tesztadat');
        await driver.findElement(By.id('receptNev')).sendKeys('tesztadat');

        /*
        await driver.wait(until.alertIsPresent(), 5000);
        let alert = await driver.switchTo().alert();
        let alertText = await alert.getText();
        alert.accept();

        if (alertText.includes("Sikeres regisztráció")) {
            console.log("✅ Sikeres regisztráció.");
        } else {
            console.log("⚠️ Váratlan alert szöveg: " + alertText);
        }*/

    } catch (error) {
        console.error("❌ Hiba történt a sikeres regisztrációnál:", error);
    } finally {
        await driver.quit();
    }
}

async function bejelentkezes() {
    let driver = await setupDriver();

    await driver.get('http://localhost/13c-toth/Vizsgaremek/bejelentkezes/bejelentkezes.php');
        
    await driver.findElement(By.id('felhnev')).sendKeys('admin');
    await driver.findElement(By.id('jelszo')).sendKeys('admin');
    await driver.findElement(By.id('btnBejelentkezes')).click();

        // await driver.sleep(1000);
        // let aktualisUrl = await driver.getCurrentUrl();
        // assert.strictEqual(aktualisUrl, 'http://localhost/13c-szucs/Vizsgaremek/fooldal/fooldal.php');
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
    await tesztReceptFelolt();
   // await testHianyosRegisztracio();
})();
