import { Page, Locator } from '@playwright/test';

export default class CommonUtils {
    page: Page;

    constructor( page: Page) {   
        this.page = page;
    }
    /**
     * Generates a random string of specified length
     * @param length Length of the string to generate
     * @returns Random string
     */
    async generateRandomString(length: number): Promise<string> {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    /**
     * Generates a random email address
     * @returns Random email address
     */
    async generateRandomEmail(): Promise<string>    {
        return `test.auto${this.generateRandomString(8)}@myezra.com`;
    }

    /**
     * Formats a date into YYYY-MM-DD format
     * @param date Date to format
     * @returns Formatted date string
     */
    async formatDate(date: Date): Promise<string> {
        return date.toISOString().split('T')[0];
    }
}