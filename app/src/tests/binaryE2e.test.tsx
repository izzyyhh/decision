import puppeteer from "puppeteer";

jest.useRealTimers();

describe("e2e-binary:tests", () => {
    let browser: any;
    let page: any;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    it("create decision opens create decision screen", async () => {
        await page.goto("http://localhost:8080");
        const createDecisionButton = await page.waitForSelector(".decision-create");
        expect(createDecisionButton).toBeDefined();

        await page.tap(".decision-create");
        expect(page.url()).toContain("/poll");
    });

    it("binary decision can be created", async () => {
        await page.goto("http://localhost:8080/poll");
        await page.waitForSelector(".decision-create");

        const inputs = await page.$$(".MuiInputBase-input");

        await page.waitForTimeout(300);
        const titleInput = inputs[0];
        expect(titleInput).toBeDefined();
        await titleInput.focus();
        await titleInput.type("z");

        const option1 = inputs[1];
        const option2 = inputs[2];

        expect(option1).toBeDefined();
        expect(option2).toBeDefined();

        await page.waitForTimeout(300);
        await option1.focus();
        await option1.type("a");

        await page.waitForTimeout(300);
        await option2.focus();
        await option2.type("b");

        await page.waitForTimeout(300);
        await page.tap(".decision-create");

        await page.waitForTimeout(3000);

        await page.screenshot({ path: "src/tests/binary.png" });
        const errors = await page.$("MuiPaper-root");
        expect(errors).toBeNull();

        // const text = await page.evaluate(() => Array.from(document.querySelectorAll(".MuiInputBase-input"), element => element.value));
        // console.log(text)

        await page.waitForSelector(".decision-start");
        await page.tap(".decision-start");

        expect(page.url()).toContain("/decision/");
    }, 20000);

    afterAll(() => browser.close());
});
