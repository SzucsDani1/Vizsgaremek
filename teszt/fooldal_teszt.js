let { Builder, By, Key, until } = require('selenium-webdriver');
let assert = require('assert');
let chrome = require('selenium-webdriver/chrome');

describe('Vizsgaremek Tesztek', function() {
    this.timeout(30000);
    let driver;

    before(async () => {
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options())
            .build();
    });

    after(async () => {
        await driver.quit();
    });

    it('1. Bejelentkezés tesztelése', async () => {
        await driver.get('http://localhost/Vizsgaremek/bejelentkezes/bejelentkezes.php');
        
        await driver.findElement(By.id('felhnev')).sendKeys('admin');
        await driver.findElement(By.id('jelszo')).sendKeys('admin');
        await driver.findElement(By.id('btnBejelentkezes')).click();

        await driver.wait(until.urlIs('http://localhost/Vizsgaremek/fooldal/fooldal.php'), 5000);
        let aktualisUrl = await driver.getCurrentUrl();
        assert.strictEqual(aktualisUrl, 'http://localhost/Vizsgaremek/fooldal/fooldal.php');
    });

    it('2. Keresési funkció tesztelése - Találatos keresés', async () => {
        await driver.get('http://localhost/Vizsgaremek/fooldal/fooldal.php');
        
        let keresesiMezo = await driver.findElement(By.id('text_kereses'));
        await keresesiMezo.sendKeys('teszt');
        await driver.findElement(By.id('button_kereses')).click();

        await driver.wait(until.elementLocated(By.css('.card')), 5000);
        let talalatiKartyak = await driver.findElements(By.css('.card'));
        assert(talalatiKartyak.length > 0, 'Legalább 1 találatnak kell lennie');
    });

    it('3. Keresési funkció tesztelése - Nincs találat', async () => {
        await driver.get('http://localhost/Vizsgaremek/fooldal/fooldal.php');
        
        let keresesiMezo = await driver.findElement(By.id('text_kereses'));
        await keresesiMezo.sendKeys('xyz123nonexistent');
        await driver.findElement(By.id('button_kereses')).click();

        let hibaUzenet = await driver.wait(until.elementLocated(By.css('.alert-danger')), 5000);
        let uzenetSzoveg = await hibaUzenet.getText();
        assert.strictEqual(uzenetSzoveg.trim(), 'Nincs találat!');
    });
});
