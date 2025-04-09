let { Builder, By, Key, until } = require('selenium-webdriver');
let assert = require('assert');
let { describe, it, after, before } = require('mocha');

describe('Receptek oldal tesztelése', function() {
    this.timeout(60000);
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
    });

    after(async function() {
        await driver.quit();
    });

    it('1. Bejelentkezés tesztelése', async () => {
        await driver.get('http://localhost/13c-szucs/Vizsgaremek/bejelentkezes/bejelentkezes.php');
        
        await driver.findElement(By.id('felhnev')).sendKeys('admin');
        await driver.findElement(By.id('jelszo')).sendKeys('admin');
        await driver.findElement(By.id('btnBejelentkezes')).click();

        await driver.wait(until.urlIs('http://localhost/13c-szucs/Vizsgaremek/fooldal/fooldal.php'), 5000);
    });

    it('2. Burrito recept részletei és bevásárlólista kezelése', async () => {
        // Burrito recept megnyomása
        await driver.sleep(2000);
        let btnBurrito= await driver.findElement(By.id("btnBurrito"));
        await driver.executeScript("arguments[0].scrollIntoView(true);", btnBurrito);
        await driver.sleep(500);
        btnBurrito.click();
  

        // Adag növelése
        await driver.sleep(500);
        let btnHozzaad = await driver.findElement(By.id('adagHozzaad'));
        await driver.executeScript("arguments[0].scrollIntoView(true);", btnHozzaad);
        await driver.sleep(500);
        btnHozzaad.click();
        await driver.sleep(1000);

        
        await driver.findElement(By.id("labeltortilla lap")).click();
        
        await driver.findElement(By.id("labeldarált marhahús")).click();
        
        await driver.sleep(1000);

        // Checkbox bejelölése
        let kedvencReceptCheckbox = await driver.findElement(By.id('kedvencReceptFelirat'));
        await driver.executeScript("arguments[0].scrollIntoView(true);",kedvencReceptCheckbox);
        await driver.sleep(1000);
        await kedvencReceptCheckbox.click();
        await driver.sleep(2000);
    });

    it('3. Recept képének megjelenítése', async () => {
        await driver.sleep(1000);
  
        let receptKep = await driver.findElement(By.id('receptKep'));
        
        let kepMegjelen = await receptKep.isDisplayed();
        assert.strictEqual(kepMegjelen, true, "A recept képe nem jelenik meg az oldalon");
    });

    it('4. Hozzászólás írása', async () => {
        let commentSection = await driver.findElement(By.id('hozzaszolasok'));
        await driver.executeScript("arguments[0].scrollIntoView(true)", commentSection);
        
        await driver.findElement(By.id('hozzaszolas')).sendKeys('Ez egy hozzászólás');
        await driver.sleep(2000);

        let btnElkuld = await driver.findElement(By.id('btnHozzaszolasKuldes'));
        await driver.executeScript("arguments[0].scrollIntoView(true)", btnElkuld);
        await btnElkuld.click();
 
        await driver.wait(until.elementLocated(By.css('.alert-success')), 5000);
        await driver.sleep(2000);
    });

    it('5. Recept leírásának megjelenítése', async () => {
        let receptLeiras = await driver.findElement(By.id('receptLeiras'));
        await driver.executeScript("arguments[0].scrollIntoView(true)", receptLeiras);
        
        await driver.sleep(500);
        
        let leirasMegjelen = await receptLeiras.isDisplayed();
        assert.strictEqual(leirasMegjelen, true, "A recept leírása nem jelenik meg");
        
        let leirasSzoveg = await receptLeiras.getText();
        assert.ok(leirasSzoveg.length > 0, "A recept leírása üres");
      });
      
});
