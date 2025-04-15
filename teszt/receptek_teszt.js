let { Builder, By, Key, until } = require('selenium-webdriver');
let assert = require('assert');
let { describe, it, after, before } = require('mocha');
//npx mocha receptek_teszt.js

describe('Receptek oldal tesztelése', function() {
    this.timeout(30000);
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
    });

    after(async function() {
        await driver.quit();
    });

    it('1. Bejelentkezés tesztelése', async () => {
        await driver.get('http://localhost/Vizsgaremek/bejelentkezes/bejelentkezes.php');
        
        await driver.findElement(By.id('felhnev')).sendKeys('admin');
        await driver.findElement(By.id('jelszo')).sendKeys('admin');
        await driver.findElement(By.id('btnBejelentkezes')).click();

        await driver.sleep(1000);
        let aktualisUrl = await driver.getCurrentUrl();
        assert.strictEqual(aktualisUrl, 'http://localhost/Vizsgaremek/fooldal/fooldal.php');
    });

    it('2. Navigálás a receptek oldalra', async () => {
        driver.findElement(By.xpath("//a[text()='Receptek']")).click();
  
        
        await driver.wait(until.urlIs('http://localhost/Vizsgaremek/receptekoldal/receptekoldal.php'), 5000);
        let aktualisUrl = await driver.getCurrentUrl();
        assert.strictEqual(aktualisUrl, 'http://localhost/Vizsgaremek/receptekoldal/receptekoldal.php');
        
        let btnKereses = await driver.findElement(By.id('button_kereses'));
        assert.ok(btnKereses, 'A keresési gombnak láthatónak kell lennie az oldalon');
    });

    it('3. Recept keresése a keresési mezőben', async () => {
        // Poutine-re keresés
        await driver.findElement(By.id('text_kereses')).sendKeys('Poutine');
        await driver.findElement(By.id('button_kereses')).click();
        
        await driver.sleep(2000);
        
        let eredmenyCard = await driver.findElements(By.id('Poutine'));
        assert.ok(eredmenyCard.length > 0, 'Keresési eredményeknek meg kell jelenniük');
        
    });

    it('4. Szűrők tesztelése találattal', async () => {
        let btnNullazas = await driver.findElement(By.id('btnNullazas'));
        await driver.executeScript("arguments[0].scrollIntoView(true);", btnNullazas);
        await driver.sleep(500);
        await btnNullazas.click();

        await driver.sleep(1000);

        //Reggeli szűrő
        let labelReggeli = await driver.findElement(By.id('labelReggeli'));
        await driver.executeScript("arguments[0].scrollIntoView(true);", labelReggeli);
        await driver.sleep(500);
        await labelReggeli.click();

        await driver.sleep(1000);
        
        // Ólcsó ár
        let arRange = await driver.findElement(By.id('arInput'));
        await driver.executeScript('arguments[0].value = 1;', arRange);
        await driver.executeScript('arguments[0].dispatchEvent(new Event("input"))', arRange);
        
        // Könnyű nehézségszint
        let nehezsegRange = await driver.findElement(By.id('nehezsegInput'));
        await driver.executeScript('arguments[0].value = 1;', nehezsegRange);
        await driver.executeScript('arguments[0].dispatchEvent(new Event("input"))', nehezsegRange);
        
        let btnSzures = await driver.findElement(By.id('btnSzures'));
        await driver.executeScript("arguments[0].scrollIntoView(true);", btnSzures);
        await driver.sleep(500);
        await btnSzures.click();

        await driver.executeScript("window.scrollTo(0, 0);");
        await driver.sleep(2000);
        
        let eredmenyCard = await driver.findElements(By.css('.card'));
        assert.ok(eredmenyCard.length > 0, 'Szűrés eredményének meg kell jelennie');
    });

    it('5. Szűrők tesztelése találat nélkül', async () => {
        let btnNullazas = await driver.findElement(By.id('btnNullazas'));
        await driver.executeScript("arguments[0].scrollIntoView(true);", btnNullazas);
        await driver.sleep(1000);
        await btnNullazas.click();
        
        await driver.findElement(By.id('text_kereses')).sendKeys('Nem létező recept');
        
        // 600+ kalória beállítása
        let kaloriaRange = await driver.findElement(By.id('kaloriaInput'));
        await driver.executeScript('arguments[0].value = 4;', kaloriaRange);
        await driver.executeScript('arguments[0].dispatchEvent(new Event("input"))', kaloriaRange);
        
        // 120+ perc idő beállítása
        let idoRange = await driver.findElement(By.id('idoInput'));
        await driver.executeScript('arguments[0].value = 3;', idoRange); 
        await driver.executeScript('arguments[0].dispatchEvent(new Event("input"))', idoRange);
        
        await driver.findElement(By.id('btnSzures')).click();
        await driver.executeScript("window.scrollTo(0, 0);");
  
        await driver.sleep(2000);
        let nincsTalalatAlert = await driver.findElement(By.css('.alert')).getText();    
        assert.ok(nincsTalalatAlert.includes('Nincs találat!'), 'Hibaüzenetnek meg kell jelennie, ha nincs találat');
        
    });
});
