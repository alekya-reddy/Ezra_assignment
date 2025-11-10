import { Page, Locator, expect } from '@playwright/test';

export default class SelectYourPlanPage {
    readonly    page: Page;
    readonly    dobField: Locator;
     constructor(page: Page) {
        this.page = page;
        this.dobField = page.getByRole('textbox', { name: 'Date of birth (MM-DD-YYYY)' });
     }

     async clickOnAcceptButton(){
        const acceptBtn = this.page.locator('[data-tid="banner-accept"]');
        if (await acceptBtn.isVisible({timeout: 5000})) {
        await acceptBtn.click();
}
     }

     async validateSelectYourPageDisplayed() {
        // wait for network activity to quiet down
        await this.page.waitForLoadState('domcontentloaded').catch(() => {});
        await expect(this.page.getByRole('button', { name: 'Select your plan' })).toBeVisible({timeout: 80000});
        await expect(this.page.getByRole('heading', { name: 'Select your Scan' })).toBeVisible({timeout: 80000});
     };

     async fillDOB(dob: string) {
        const dobField = this.page.getByRole('textbox', { name: 'Date of birth (MM-DD-YYYY)' });
        await dobField.fill(dob);
     };

     async selectGender(gender: string) {
        await this.page.locator('.multiselect__tags').click();
        await this.page.locator('span').filter({ hasText: gender }).first().click();
     };

     async selectPlan(planName: string) {
        await this.page.getByText(planName).first().click();
     };

     async clickOnContinueButton() {
        const continueBtn = this.page.locator(`[data-test="submit"]`);
        if(await continueBtn.isEnabled({ timeout: 10000 })){
            await continueBtn.click(); 
        }
             
     };    



}