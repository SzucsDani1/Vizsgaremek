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
        let hozzaszolasok = await driver.findElement(By.id('hozzaszolasok'));
        await driver.executeScript("arguments[0].scrollIntoView(true)", hozzaszolasok);
        await driver.sleep(1000);
        await driver.findElement(By.id('hozzaszolas')).sendKeys('Ez egy hozzászólás');
        await driver.sleep(1000);

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
      });


      it('6. Navigálás a Kedvencek oldalra', async () => {        
        let kedvencekLink = await driver.findElement(By.xpath("//a[contains(text(), 'Kedvencek')]"));
        await driver.executeScript("arguments[0].scrollIntoView(true);", kedvencekLink);
        await driver.sleep(5000);
        await kedvencekLink.click();
        await driver.sleep(1000);
      });
      
      it('7. Burrito kártya megjelenésének ellenőrzése ID alapján', async () => {
        let burritoCard = await driver.findElement(By.id('Burrito'));
        await driver.executeScript("arguments[0].scrollIntoView(true);", burritoCard);
        await driver.sleep(500);
        
        let burritoMegjelen = await burritoCard.isDisplayed();
        assert.strictEqual(burritoMegjelen, true, "A Burrito kártya nem jelenik meg a kedvencek között");
      });
      
      it('8. Burrito törlése a kedvenc receptek közül', async () => {
        //Törlés gomb megnyomása
        let btnTorles = await driver.findElement(By.id('btnTorlesBurrito'));
        await driver.executeScript("arguments[0].scrollIntoView(true);", btnTorles);
        await driver.sleep(500);
        await btnTorles.click();
        
        await driver.sleep(2000);
      });
      
      it('9. Bevásárlólistában a tortilla lap és darált marhahús megjelenik-e', async () => {
        let bevasarloLista = await driver.findElement(By.id("accordionHozzavalok"));
        await driver.executeScript("arguments[0].scrollIntoView(true);", bevasarloLista);
        await driver.sleep(1000);
        
        let tortillaMegjelenik = false;
        let marhahusMegjelenik = false;
        
        let trotilla = await driver.findElement(By.id("listGroupItemtortilla lapalap"));
        tortillaMegjelenik = await trotilla.isDisplayed();
        
        let marhahus = await driver.findElement(By.id("listGroupItemdarált marhahúsTölteték"));
        marhahusMegjelenik = await marhahus.isDisplayed();
        
        assert.strictEqual(tortillaMegjelenik, true, "A tortilla lap nem jelenik meg a bevásárlólistában");
        assert.strictEqual(marhahusMegjelenik, true, "A darált marhahús nem jelenik meg a bevásárlólistában");
      });
      
      it('10. Tortilla lap és darált marhahús törlése a bevásárlólistából ID alapján', async () => {
        let btnTorlesTortilla = await driver.findElement(By.id("btntortilla lap-34"));
        let btnTorlesMarhahus = await driver.findElement(By.id("btndarált marhahús-17"));
        
        await driver.executeScript("arguments[0].scrollIntoView(true);", btnTorlesTortilla);
        await driver.sleep(500);
        await btnTorlesTortilla.click();
        
        await driver.sleep(1000); 
        
        //await driver.executeScript("arguments[0].scrollIntoView(true);", btnTorlesMarhahus);
        await driver.sleep(500);
        await btnTorlesMarhahus.click();
        
        await driver.sleep(2000); 
      });
      
      
});
