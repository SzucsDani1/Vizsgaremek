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
        await driver.get('http://localhost/Vizsgaremek/profilszerkeszto/profilszerkeszto.php');

        const modositas = await driver.wait(until.elementIsVisible(driver.findElement(By.id('modositas'))), 5000);
        await driver.executeScript("arguments[0].click();", modositas);
        await driver.sleep(1000);

        await driver.findElement(By.id('email')).sendKeys('email@gmail.com');
        await driver.sleep(1000);
       
        const mentesBtn = await driver.wait(
            until.elementLocated(By.css('input[type="button"][value="Mentés"]')),
            5000
          );
          
          await driver.wait(until.elementIsVisible(mentesBtn), 5000);
          await driver.executeScript("arguments[0].scrollIntoView(true);", mentesBtn);
          await mentesBtn.click();
        
        console.log("✅ Sikeres modosítás.");
        await driver.sleep(2000);
       
        
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
