import puppeteer from "puppeteer";

describe("App.js", () => {
    let browser: any;
    let page: any;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    it("2 presets get served", async () => {
        await page.goto("http://localhost:8080");
        await page.waitForSelector(".swiper-slide");
        const presetCount = await page.$$eval(".swiper-slide", (e: any) => e.length);
        expect(presetCount).toEqual(2);
    });

    it("preset button opens modal and submit movie modal", async () => {
        await page.goto("http://localhost:8080");
        await page.waitForSelector(".swiper-slide");

        let modal = await page.$(".MuiDialogContent-root");
        expect(modal).toBeNull();

        await page.tap(".swiper-slide-active");
        modal = await page.$(".MuiDialogContent-root");
        expect(modal).toBeDefined();

        const [title] = await page.$$(".MuiInputBase-input");
        const [, submitButton] = await page.$$(".MuiButton-root");

        await title.type("HAllo");
        await submitButton.click();

        await page.waitForNavigation();
        expect(page.url()).toContain("/decision/");
    });

    afterAll(() => browser.close());
});
