const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function setupDriver() {
    return await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options())
        .build();
}

async function profilModosit() {
    let driver = await setupDriver();
    try {
        await bejelentkezes(driver)
        await driver.get('http://localhost/Vizsgaremek/adminElfogad/adminElfogad.php');
        await driver.sleep(2000);

        const cards = await driver.findElements(By.className("card"));
        for (let card of cards) {
            const title = await card.findElement(By.className("card-title")).getText();
            if (title === "tesztadat") {
                const btn = await card.findElement(By.xpath(".//input[@type='button' and @value='Részletek']"));
                await driver.executeScript("arguments[0].scrollIntoView(true);", btn);
                await driver.sleep(500); // kis idő a scroll után
                await driver.executeScript("arguments[0].click();", btn);

                break;
            }
        }

        await driver.sleep(2000);
        const torles = await driver.wait(until.elementIsVisible(driver.findElement(By.id('receptTorles'))), 5000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", torles);
        await driver.sleep(500);

        await driver.executeScript("arguments[0].click();", torles);
        
        await driver.sleep(2000)

        console.log("✅ Sikeres törlés az admin álltal.")

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
    await profilModosit();
})();
