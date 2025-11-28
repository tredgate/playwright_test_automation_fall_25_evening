// tests/learning/forms/forms_actions.spec.ts
import { test } from "@playwright/test";
import path from "path";

test.describe("Forms Actions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/registration.html");
  });

  test("pressSequentially and fill", async ({ page }) => {
    const nameInput = page.locator("#name");
    await nameInput.fill("Start");
    await nameInput.fill("End"); // * Tento fill by měl vymazat předchozí text "Start"
    await nameInput.pressSequentially("Kde toto bude?"); // * Nevymaže předchozí text "End"
    await nameInput.clear(); // ? Vyčistí hodnotu pole
    await nameInput.pressSequentially("Dlouhý text...", { delay: 200 });
  });

  test("select option", async ({ page }) => {
    const genderSelect = page.locator("#gender");
    await genderSelect.selectOption("female"); // ? Vybírá z <select> prvek <option> pomocí atributu value
    await genderSelect.selectOption({ label: "Male" }); // ? Vybírá z <select> prvek <option> pomocí textu: <option>Male</option>
  });

  test("Radio, Checkbox check", async ({ page }) => {
    await page.locator("#contact-phone").check(); // ? Radio button - můžeme jen zakliknout
    await page.locator("#interests-reading").check();
    await page.locator("#interests-sports").check(); // ? Checkbox - můžeme i odkliknout
    await page.locator("#interests-sports").uncheck();
  });

  test("Date fill with date ISO 8601", async ({ page }) => {
    await page.locator("#date-of-birth").fill("1999-05-30"); // ? <input> type = "date" je vždy nutné vyplnit ve formátu ISO 8601: YYYY-MM-DD
  });

  test("File Upload", async ({ page }) => {
    const filePath = path.resolve(__dirname, "../../../assets/upload_file.txt");
    // require("../../../assets/upload_file.txt"); // ? require slouží pouze proto, aby nám pomohl připravit cestu (napovídá), path.resolve nenapovídá a je v něm složitější cestu vytvořit.
    // * Zapneme listenera (odchytávač) na událost vybrání souboru (filechooser) -> toto je asynchronní akce, NESMÍME před ni dát await (chceme aby listener poslouchal, ale nečekal)
    const fileChooserListener = page.waitForEvent("filechooser"); // ? do const uložíme odkaz na listenara, abychom se po kliknutí na input type="file" mohli odkázat na výběr souboru
    // * Klikneme na tlačítko pro nahrání souboru (input type="file")
    await page.locator("#file-upload").click();
    // * Počkáme, než listener fileChooserPromise odchytí otevření okna pro výběr okna a uložíme výsledek (odchycené okno) do proměnné (abychom mohli následně vložit soubor)
    const fileChooser = await fileChooserListener;
    // * Nahrajeme soubor pomocí proměnné filePath, kterou máme nachystanou z předchozích kroků
    await fileChooser.setFiles(filePath);
    // * Počkáme několik sekund, abychom v screenshotu viděli soubor vybraný
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(2000);
  });
});
