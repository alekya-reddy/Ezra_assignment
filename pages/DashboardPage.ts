import { Page, Locator, expect } from '@playwright/test';

export default class DashboardPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;       
    }       

    async validateDashboardMenuDisplayed(){
        await this.page.waitForLoadState('domcontentloaded').catch(() => {});
        await expect(this.page.getByRole('navigation').getByRole('button').filter({ hasText: /^$/ })).toBeVisible({ timeout: 80000 });  
    };

    async cickOnDashboardMenuOption(){
        await this.page.getByRole('navigation').getByRole('button').filter({ hasText: /^$/ }).click();
    }

    async clickOnGivenLinkOption(optionName: string){
        await this.page.getByRole('link', { name: optionName }).click();
    }

    async clickOnBookAScanButton(){

        const bookAScanBtn = this.page.getByRole('button', { name: 'Book a scan' });
        await expect(bookAScanBtn).toBeVisible({ timeout: 40000 });
        await bookAScanBtn.click(); 
    }       

}