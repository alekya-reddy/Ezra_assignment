import { Page, Locator, expect } from '@playwright/test';

export default class RegistrationPage {
    readonly page: Page;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly emailField: Locator;
    readonly phoneNumberField: Locator;
    readonly passwordField: Locator;
    readonly termsCheckbox: Locator;
    readonly marketingCheckbox: Locator;
    readonly privacyCheckbox: Locator;
    readonly submitButton: Locator;                 
    
    constructor(page: Page) {
        this.page = page;
        this.firstNameField = page.getByRole('textbox', { name: 'Legal First Name' });
        this.lastNameField = page.getByRole('textbox', { name: 'Legal Last Name' });
        this.emailField = page.getByRole('textbox', { name: 'Email' });
        this.phoneNumberField = page.getByRole('textbox', { name: 'Phone Number' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.termsCheckbox = page.getByRole('button', { name: "I agree to Ezra's terms of" });
        this.marketingCheckbox = page.getByRole('button', { name: 'I agree to receive marketing' });
        this.privacyCheckbox = page.getByRole('button', { name: 'I agree that Ezra, directly' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
    }   

    async gotoGivenUrl(urlLink: any) {
        await this.page.goto(urlLink);
    };

    async clickOnGivenLink(linkName: string) {
        await this.page.getByRole('link', { name: linkName }).click();
    }

    async register(firstName: string, lastName: string, email: string, phoneNumber: string, password: string) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.emailField.fill(email);
        await this.phoneNumberField.fill(phoneNumber);
        await this.passwordField.fill(password);
        await this.termsCheckbox.click();
        await this.marketingCheckbox.click();
        await this.privacyCheckbox.click();  
        await this.page.waitForLoadState('domcontentloaded').catch(() => {});   
        // wait for it to be visible and not disabled
        await expect(this.submitButton).toBeEnabled({ timeout: 10000 });
        // try normal click first, fallback to force click
        try {
            await this.submitButton.click();
            await this.submitButton.click();
            await this.submitButton.click();
        } catch (err) {
            // fallback if element is covered/disabled momentarily
            await this.submitButton.click({ force: true });
        }
         

        await this.page.waitForLoadState('domcontentloaded').catch(() => {});
    };
    
    

}