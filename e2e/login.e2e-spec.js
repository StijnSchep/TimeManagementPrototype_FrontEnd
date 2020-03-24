const nsAppium = require("nativescript-dev-appium");
const assert = require('chai').assert

describe("Login Scenario", function () {
    let driver;
    before((async function () {
        nsAppium.nsCapabilities.testReporter.context = this;
        driver = await nsAppium.createDriver();
    }));

    afterEach(async function () {
        if (this.currentTest.state === "failed") {
            await driver.logTestArtifacts(this.currentTest.title);
        }
    });

    it("should display a login button", async function () {
        const loginButton = await driver.findElementByText("INLOGGEN");
        assert.isTrue(await loginButton.isDisplayed());
    });

    it("should navigate to welcome screen when correct user credentials are provided", async function() {
        const textfields = await driver.driver.waitForElementsByClassName(driver.locators.getElementByName("textfield"));
        textfields[0].sendKeys("Test");
        textfields[1].sendKeys("test");
        textfields[2].sendKeys("tt");

        const dropdown = await driver.findElementByClassName("android.widget.Spinner");
        await dropdown.tap();

        const nostradamus = await driver.findElementByText(".nostradamus.nu");
        await nostradamus.click();

        const loginButton = await driver.findElementByText("INLOGGEN");
        await loginButton.tap();

        const welcomeMessage = await driver.findElementByText("Welkom Robin Schellius")
        assert.isTrue(await welcomeMessage.isDisplayed())
    })

    it('Should navigate from welcome screen to homepage', async function() {
        const homeHeader = await driver.findElementByText("Home");
        assert.isTrue(await homeHeader.isDisplayed())
    })
});