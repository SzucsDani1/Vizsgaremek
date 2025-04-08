const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const { describe, it, after, before } = require('mocha');

describe('Receptek oldal tesztelése', function() {
    this.timeout(30000); // Megnövelt időkorlát a lassabb műveletekhez
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
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
        const aktualisUrl = await driver.getCurrentUrl();
        assert.strictEqual(aktualisUrl, 'http://localhost/13c-szucs/Vizsgaremek/fooldal/fooldal.php');
    });

    it('2. Navigálás a receptek oldalra', async () => {
        // Navigálás a receptek oldalra a navigációs sávon keresztül
        await driver.findElement(By.linkText('Receptek')).click();
        
        // Várakozás az oldal betöltésére és URL ellenőrzése
        await driver.wait(until.urlIs('http://localhost/13c-szucs/Vizsgaremek/receptekoldal/receptekoldal.php'), 5000);
        const aktualisUrl = await driver.getCurrentUrl();
        assert.strictEqual(aktualisUrl, 'http://localhost/13c-szucs/Vizsgaremek/receptekoldal/receptekoldal.php');
        
        // Az oldal helyes betöltésének ellenőrzése
        const searchButton = await driver.findElement(By.id('button_kereses'));
        assert.ok(searchButton, 'A keresési gombnak láthatónak kell lennie az oldalon');
    });

    it('3. Recept keresése a keresési mezőben', async () => {
        // Szűrők törlése először
        await driver.findElement(By.id('btnNullazas')).click();
        await driver.sleep(1000); // Várakozás a szűrők visszaállítására
        
        // Keresés egy specifikus receptre
        await driver.findElement(By.id('text_kereses')).sendKeys('Poutine');
        await driver.findElement(By.id('button_kereses')).click();
        
        // Várakozás a keresési eredmények betöltésére
        await driver.sleep(2000);
        
        // Ellenőrizzük, hogy vannak-e eredmények
        const resultCards = await driver.findElements(By.css('.card'));
        assert.ok(resultCards.length > 0, 'Keresési eredményeknek meg kell jelenniük');
        
        // Ellenőrizzük, hogy a recept neve megjelenik-e legalább egy kártyán
        let foundMatchingRecipe = false;
        for (const card of resultCards) {
            const cardTitle = await card.findElement(By.css('.card-title')).getText();
            if (cardTitle.toLowerCase().includes('poutine')) {
                foundMatchingRecipe = true;
                break;
            }
        }
        assert.ok(foundMatchingRecipe, 'A keresésnek meg kell jelenítenie a "Poutine" receptet');
    });

    it('4. Szűrők tesztelése találattal', async () => {
        // Szűrők törlése először
        await driver.findElement(By.id('btnNullazas')).click();
        await driver.sleep(1000);
        
        // Több szűrő beállítása, amelyek találatot kell, hogy adjanak
        
        // "REGGELI" étkezés típus kiválasztása
        await driver.findElement(By.id('flexCheckREGGELI')).click();
        
        // Árszint beállítása "Olcsó"-ra
        const arRange = await driver.findElement(By.id('arInput'));
        await driver.executeScript('arguments[0].value = 1;', arRange);
        await driver.executeScript('arguments[0].dispatchEvent(new Event("input"))', arRange);
        
        // Nehézségi szint beállítása "Könnyű"-re
        const nehezsegRange = await driver.findElement(By.id('nehezsegInput'));
        await driver.executeScript('arguments[0].value = 1;', nehezsegRange);
        await driver.executeScript('arguments[0].dispatchEvent(new Event("input"))', nehezsegRange);
        
        // Szűrők alkalmazása
        await driver.findElement(By.id('btnSzures')).click();
        
        // Várakozás az eredmények betöltésére
        await driver.sleep(2000);
        
        // Ellenőrizzük, hogy vannak-e eredmények
        const resultCards = await driver.findElements(By.css('.card'));
        assert.ok(resultCards.length > 0, 'Szűrés eredményének meg kell jelennie');
        
        // Ellenőrizzük, hogy az eredmények megfelelnek-e a szűrőinknek
        if (resultCards.length > 0) {
            // Ellenőrizzük, hogy bármelyik kártya mutatja-e a "Könnyű" információt
            let hasMatchingFilter = false;
            for (const card of resultCards) {
                const cardInfo = await card.getText();
                if (cardInfo.includes('Könnyű')) {
                    hasMatchingFilter = true;
                    break;
                }
            }
            assert.ok(hasMatchingFilter, 'A szűrt eredményeknek meg kell felelniük a szűrési feltételeknek');
        }
    });

    it('5. Szűrők tesztelése találat nélkül', async () => {
        // Szűrők törlése először
        await driver.findElement(By.id('btnNullazas')).click();
        await driver.sleep(1000);
        
        // Olyan szűrők beállítása, amelyek nem adnak találatot
        // Nem létező receptre való keresés
        await driver.findElement(By.id('text_kereses')).clear();
        await driver.findElement(By.id('text_kereses')).sendKeys('XYZNemLetezoRecept12345');
        
        // Extrém kalória érték beállítása
        const kaloriaRange = await driver.findElement(By.id('kaloriaInput'));
        await driver.executeScript('arguments[0].value = 4;', kaloriaRange); // 600+ kcal
        await driver.executeScript('arguments[0].dispatchEvent(new Event("input"))', kaloriaRange);
        
        // Extrém időérték beállítása
        const idoRange = await driver.findElement(By.id('idoInput'));
        await driver.executeScript('arguments[0].value = 3;', idoRange); // Hosszan (120+ perc)
        await driver.executeScript('arguments[0].dispatchEvent(new Event("input"))', idoRange);
        
        // Szűrők alkalmazása
        await driver.findElement(By.id('btnSzures')).click();
        
        // Várakozás az eredmények betöltésére
        await driver.sleep(2000);
        
        try {
            // "Nincs találat" üzenet keresése
            const noResultsMessage = await driver.findElement(By.css('.alert')).getText();
            assert.ok(noResultsMessage.includes('Nincs találat') || noResultsMessage.includes('Nincs találat!'), 
                     'Hibaüzenetnek meg kell jelennie, ha nincs találat');
        } catch (e) {
            // Ha nem találjuk az alertet, ellenőrizzük, hogy nincsenek-e megjelenített kártyák
            const resultCards = await driver.findElements(By.css('.card'));
            assert.strictEqual(resultCards.length, 0, 'Nem szabad találatnak lennie az extrém szűrési feltételekkel');
        }
    });
});
