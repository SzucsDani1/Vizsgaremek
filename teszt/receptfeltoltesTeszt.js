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
    try {
        await bejelentkezes(driver)
        await driver.get('http://localhost/Vizsgaremek/receptfeltolto/receptfeltolto.php');

        await driver.findElement(By.id('receptNev')).sendKeys('tesztadat');
        const hozzavalokGomb = await driver.wait(until.elementIsVisible(driver.findElement(By.id('hozzaadKategoriaGomb'))), 5000);
        await hozzavalokGomb.click();
        await driver.sleep(1000);
        await driver.findElement(By.id('hozzavalokKategoriaInput0')).sendKeys('tesztadatKateg');
        const hozzaAdGomb = await driver.wait(until.elementIsVisible(driver.findElement(By.id('tesztId'))), 5000);
        await hozzaAdGomb.click();
        await driver.findElement(By.id('hozzavNev_tesztId')).sendKeys('tesztadat neve');
        await driver.findElement(By.id('hozzavMenny_tesztId')).sendKeys('150');
        await driver.findElement(By.id('hozzavMertekegy_tesztId')).sendKeys('g');

        const hozzadkGomb = await driver.wait(until.elementIsVisible(driver.findElement(By.id('hozzavHozaad_tesztId'))), 5000);
        await hozzadkGomb.click();
        await driver.sleep(1000);
        
        
        
        let etelfajtaSelect = await driver.findElement(By.id("etelfajtaSearch"))
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", etelfajtaSelect);
        await driver.sleep(500);
        
        await etelfajtaSelect.click()
        
        await driver.sleep(1000);
        
        let etelfajtaOptionLocator = By.css('#etelfajtaSearch option[value="14"]');
        await driver.wait(until.elementLocated(etelfajtaOptionLocator), 5000);
        
        let etelfajtaOption = await driver.findElement(etelfajtaOptionLocator);
        await etelfajtaOption.click();
        

        await driver.sleep(1000);
        
        await driver.findElement(By.id('etrendSearch')).sendKeys('normál');
        
        const labelEtrend = await driver.findElement(By.css('label[for="checkbox-normál"]'));
        await labelEtrend.click();
        await driver.sleep(1000);


        let konyhaSelect = await driver.findElement(By.id("konyhaSearch"))
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", konyhaSelect);
        await driver.sleep(500);
        
        await konyhaSelect.click()
        
        await driver.sleep(1000);
        
        let konyhaOptionLocator = By.css('#konyhaSearch option[value="45"]');
        await driver.wait(until.elementLocated(konyhaOptionLocator), 5000);
        
        let konyhaOption = await driver.findElement(konyhaOptionLocator);
        await konyhaOption.click();

        await driver.sleep(1000);

        const nehezseg = await driver.findElement(By.id('nehezsegInput'));
        await driver.executeScript("arguments[0].value = arguments[1]; arguments[0].dispatchEvent(new Event('input')); arguments[0].dispatchEvent(new Event('change'));", nehezseg, 1);

        await driver.sleep(1000);

        let ido = await driver.findElement(By.id("idoInput"))
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", ido);
        await driver.sleep(500);
        ido.sendKeys(45)

        await driver.findElement(By.id('kaloriaInput')).sendKeys(500);
        await driver.sleep(1000);

        await driver.findElement(By.id('receptLeiras')).sendKeys('Leiras szöveg');
        await driver.sleep(1000);

        const kepInput = await driver.findElement(By.id("fileInput"))
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", kepInput);
        await driver.sleep(500);

        const path = require('path');
        const imagePath = path.resolve(__dirname, 'tesztkep.jpg');
        await kepInput.sendKeys(imagePath)
        await driver.sleep(1000);
        const receptfeltoltGomb = await driver.wait(until.elementIsVisible(driver.findElement(By.id('btnReceptFeltoltes'))), 5000);
        await receptfeltoltGomb.click();
        await driver.sleep(2000)
        
        const alertBox = await driver.wait(until.elementLocated(By.id('feltoltAlert')), 5000);
        await driver.wait(until.elementIsVisible(alertBox), 5000);
        const alertText = await alertBox.getText();
        if (alertText.includes("Sikeres feltöltés!")) {
            console.log("✅ Sikeres recept felöltés.");
        } else {
            console.log("⚠️ Váratlan alert szöveg: " + alertText);
        }

    } catch (error) {
        console.error("❌ Hiba történt:", error);
    } finally {
        await driver.quit();
    }
}

async function tesztReceptHianyos() {
    let driver = await setupDriver();
    try {
        await bejelentkezes(driver)
        await driver.get('http://localhost/Vizsgaremek/receptfeltolto/receptfeltolto.php');

        await driver.findElement(By.id('receptNev')).sendKeys('tesztadat');
        await driver.sleep(1000);
        
        const kepInput = await driver.findElement(By.id("fileInput"))
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", kepInput);
        await driver.sleep(1000);

        const receptfeltoltGomb = await driver.wait(until.elementIsVisible(driver.findElement(By.id('btnReceptFeltoltes'))), 5000);
        await receptfeltoltGomb.click();
        await driver.sleep(500);
       
        
        const alertBox = await driver.wait(until.elementLocated(By.id('kategoriaFigyelmeztet0')), 5000);
        await driver.wait(until.elementIsVisible(alertBox), 5000);
        const alertText = await alertBox.getText();
        if (alertText.includes("Kérem, adjon hozzá legalább egy hozzávalót!")) {
            console.log("✅ Sikeres hiány ellenőrzés.");
        } else {
            console.log("⚠️ Váratlan alert szöveg: " + alertText);
        }

    } catch (error) {
        console.error("❌ Hiba történt:", error);
    } finally {
        await driver.quit();
    }
}


async function bejelentkezes(driver) {

    await driver.get('http://localhost/Vizsgaremek/bejelentkezes/bejelentkezes.php');
        
    await driver.findElement(By.id('felhnev')).sendKeys('admin');
    await driver.findElement(By.id('jelszo')).sendKeys('admin');
    await driver.findElement(By.id('btnBejelentkezes')).click();
   
    

    await driver.wait(until.urlContains('fooldal'), 5000);
}


(async function runAllTests() {
    await tesztReceptFelolt();
    await tesztReceptHianyos();
})();
