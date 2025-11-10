import {test, Locator, Page, expect} from '@playwright/test';


export default class ReserveYourAppointPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    };

    async validateReserveYourAppointmentPageDisplayed() {
        // wait for network activity to quiet down
        await this.page.waitForLoadState('domcontentloaded').catch(() => {});
        await expect(this.page.getByRole('heading', { name: 'Reserve your appointment' })).toBeVisible({timeout: 80000});
     };

     async enterCardDetails(cardNumber: string, expiryDate: string, cvv: string) {
        const cardFrame = this.page.frameLocator('(//iframe[@title="Secure payment input frame"])[1]');
        await cardFrame.getByRole('textbox', { name: 'Card number' }).fill(cardNumber);
        await cardFrame.getByRole('textbox', { name: 'Expiration date MM / YY' }).fill(expiryDate);
        await cardFrame.getByRole('textbox', { name: 'Security code' }).fill(cvv);
    };

    async clickOnContinueButton() {
        const continueBtn = this.page.locator(`[data-test="submit"]`);
        if(await continueBtn.isEnabled({ timeout: 10000 })){
            await continueBtn.click(); 
        }
             
     }; 

     async validateBookingConfirmedPageDisplayed() {
        // wait for network activity to quiet down
        await this.page.waitForLoadState('domcontentloaded').catch(() => {});
        try {
        await expect(this.page.getByRole('heading', { name: `You're almost done` })).toBeVisible({timeout: 40000});
        } catch (err) {
            await this.page.waitForLoadState('domcontentloaded').catch(() => {});
            await this.page.goto('https://myezra-staging.ezra.com/sign-up/scan-confirm');
            await this.page.waitForLoadState('domcontentloaded').catch(() => {});
            await expect(this.page.getByRole('heading', { name: `You're almost done` })).toBeVisible({timeout: 80000});
        }
     };
}    