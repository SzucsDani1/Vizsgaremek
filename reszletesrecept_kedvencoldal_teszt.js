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

        
        // Tortilla lap hozzáadása
        await driver.findElement(By.id("labeltortilla lap")).click();
        
        // Darált hús hozzáadása
        await driver.findElement(By.id("labeldarált marhahús")).click();
        
        await driver.sleep(1000);

        // Kedvencnek jelölés
        let kedvencReceptCheckbox = await driver.findElement(By.id('kedvencReceptFelirat'));
        await driver.executeScript("arguments[0].scrollIntoView(true);",kedvencReceptCheckbox);
        await driver.sleep(1000);
        await kedvencReceptCheckbox.click();
        await driver.sleep(2000);
    });

    it('3. Recept értékelése', async () => {
        // 5 csillagos értékelés
        const csillagok = await driver.findElements(By.css('span[data-value]'));
        await driver.executeScript("arguments[0].scrollIntoView(true);",csillagok);
        await driver.sleep(1000);
        await csillagok[4].click(); // 5. csillag
        await driver.findElement(By.id('btnErtekelesKuld')).click();
        
        // Sikeres értékelés ellenőrzése
        await driver.wait(until.elementLocated(By.xpath('//div[contains(text(), "Értékelés elküldve!")]')), 5000);
        await driver.sleep(2000);
    });

    it('4. Hozzászólás írása', async () => {
        // Görgetés a hozzászólás részhez
        const commentSection = await driver.findElement(By.id('hozzaszolasok'));
        await driver.executeScript("arguments[0].scrollIntoView(true)", commentSection);
        
        // Hozzászólás küldése
        await driver.findElement(By.id('hozzaszolas')).sendKeys('Ez egy hozzászólás');
        await driver.findElement(By.id('btnHozzaszolasKuld')).click();
        
        // Sikeres küldés ellenőrzése
        await driver.wait(until.elementLocated(
            By.xpath('//div[contains(@class, "alert-success") and contains(text(), "Hozzászólás elküldve")]')
        ), 5000);
        await driver.sleep(2000);
    });
});
