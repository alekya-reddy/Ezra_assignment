import { Page, Locator, expect } from '@playwright/test';

export default class AppointmentsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;       
    }

    async validateAppointmentsPageDisplayed(){
        await this.page.waitForLoadState('domcontentloaded').catch(() => {});       
        await expect(this.page.getByRole('heading', { name: 'Appointments' })).toBeVisible({ timeout: 80000 }); 
    }; 
    
    async searchForAppointmentWithEmail(email: string){
        await this.page.waitForLoadState('domcontentloaded').catch(() => {});
        const searchField = this.page.getByPlaceholder('Search appointments...');
        await searchField.fill(email); 
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('domcontentloaded').catch(() => {});         
    };
    
    async validateGivenAppintmentExists(email: string){
        await this.page.waitForLoadState('domcontentloaded').catch(() => {});       
        await expect(this.page.locator(`[class="profile-cell__email b2"]`).first()).toBeVisible({ timeout: 80000 }); 
        const appointmentEmail = await this.page.locator(`[class="profile-cell__email b2"]`).first().innerText();
        return appointmentEmail;

    };    

}    