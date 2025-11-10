import { Page, Locator, expect } from '@playwright/test';

export default class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        
    }

    async gotoUrl(url:string) {
        await this.page.goto(url);
    }

    async login(username: string, password: string) {
        await this.page.waitForLoadState('domcontentloaded').catch(() => {});
        await this.page.getByRole('textbox', { name: 'Email' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await Promise.all([
            // await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }).catch(() => {}),
            await this.page.locator(`[class="basic fullWidth normal dark fullWidth submit-btn"]`).scrollIntoViewIfNeeded(),
            await expect(this.page.locator(`[class="basic fullWidth normal dark fullWidth submit-btn"]`)).toBeVisible({ timeout: 10000 }),
            await this.page.locator(`[class="basic fullWidth normal dark fullWidth submit-btn"]`).click(),
        ]);
    }

}