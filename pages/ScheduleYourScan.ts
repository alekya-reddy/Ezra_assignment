import { Page, Locator, expect } from '@playwright/test';

export default class ScheduleYourScanPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }   

    async validateScheduleYourScanPageDisplayed() {
        // wait for network activity to quiet down
        await this.page.waitForLoadState('domcontentloaded').catch(() => {});
        await expect(this.page.getByRole('heading', { name: 'Schedule your scan' })).toBeVisible({timeout: 80000});
     };

     async selectPlace(){
        const placeOption = this.page.locator('[class="location-card"]').first();
        await placeOption.click();
     };

     async clickOnlatestEnabledDate(){
        const enabledDates = this.page.locator('//div[contains(@class,"vuecal__cell vuecal__cell")and not(contains(@class, "vuecal__cell--disabled"))]');
        const count = await enabledDates.first().click();
     }; 
     
     async clickOnHoursToBeSelected(){
        const timeSlot = this.page.locator('//*[@class="appointments__individual-appointment" and not(@style="display: none;")]').first();
        await timeSlot.click();
        if(await this.page.getByRole('button', { name: 'I understand' }).isVisible({ timeout: 5000 })){
            await this.page.getByRole('button', { name: 'I understand' }).click();

            try{
            const timeSlot2 = this.page.locator('//*[@class="appointments__individual-appointment" and not(@style="display: none;")]').nth(2);
            await timeSlot2.click();
            } catch (err) {
                console.log("Time slot not available nth(2)");
            }    
            try{
                const timeSlot3 = this.page.locator('//*[@class="appointments__individual-appointment" and not(@style="display: none;")]').nth(3);
                await timeSlot3.click();
            } catch (err) {
                console.log("Time slot not available nth(3)");
            } 
        }
           
     };

     async clickOnContinueButton() {
        const continueBtn = this.page.locator(`[data-test="submit"]`);
        if(await continueBtn.isEnabled({ timeout: 10000 })){
            await continueBtn.click(); 
        }
             
     }; 
}