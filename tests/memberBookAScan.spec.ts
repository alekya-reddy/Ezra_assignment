import { test, expect } from '@playwright/test';
import RegistrationPage from '../pages/RegistrationPage';
import CommonUtils  from '../utils/commonUtils';
import SelectYourPlanPage from '../pages/SelectYourPlanPage';
import ScheduleYourScanPage from '../pages/ScheduleYourScan';
import ReserveYourAppointPage from '../pages/ReserveYourAppointPage';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import AppointmentsPage from '../pages/AppointmentsPage';
import ReviewYourPlanPage from '../pages/ReviewYourPlanPage';


let emailGlobal = '';
let passwordGlobal = '';

test('member registration to successful booking', async ({ page }) => {

    const registrationPage = new RegistrationPage(page);
    const commonUtils = new CommonUtils(page);
    const selectYourPlanPage = new SelectYourPlanPage(page);
    const scheduleYourScanPage = new ScheduleYourScanPage(page);

    await registrationPage.gotoGivenUrl('https://myezra-staging.ezra.com/');

    await registrationPage.clickOnGivenLink('Join');

    const randString = await commonUtils.generateRandomString(6);

    const firstName = 'Test';
    const lastName = 'Auto'+randString;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@myezra.com`;
    const phoneNumber = '201555' + Math.floor(1000 + Math.random() * 9000).toString();
    const password = 'A8121369833auyg@';
    console.log("Password:"+password);   
    console.log("email:"+email);
    emailGlobal = email;  
    passwordGlobal= password;  
    await registrationPage.register(firstName, lastName, email, phoneNumber, password); 

    await selectYourPlanPage.validateSelectYourPageDisplayed();
    
    await selectYourPlanPage.fillDOB('01-05-1980');

    await selectYourPlanPage.selectGender('Male');  

    await selectYourPlanPage.selectPlan('MRI Scan with Spine Available at $1499 Everything in the MRI Scan, plus spine-');

    await selectYourPlanPage.clickOnContinueButton(); 
    
    await page.waitForLoadState('domcontentloaded').catch(() => {});

    await scheduleYourScanPage.validateScheduleYourScanPageDisplayed();  

    await scheduleYourScanPage.selectPlace();

    await page.waitForLoadState('domcontentloaded').catch(() => {});

    await scheduleYourScanPage.clickOnlatestEnabledDate();

    await scheduleYourScanPage.clickOnHoursToBeSelected();

    await scheduleYourScanPage.clickOnContinueButton();
    
    await page.waitForLoadState('domcontentloaded').catch(() => {});

    const reserveYourAppointment = new ReserveYourAppointPage(page);

    await reserveYourAppointment.validateReserveYourAppointmentPageDisplayed(); 

    await reserveYourAppointment.enterCardDetails('4242424242424242', '12/34', '123');

    await reserveYourAppointment.clickOnContinueButton();

    await page.waitForLoadState('domcontentloaded').catch(() => {}); 

    await reserveYourAppointment.validateBookingConfirmedPageDisplayed();

}); 

test('login with exisitng user member credentials', async ({ page }) => {

    // book appointment with existing user credentials
    const loginPage =  new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const reviewYourPlanPage =  new ReviewYourPlanPage(page);
    const registrationPage = new RegistrationPage(page); 
    const scheduleYourScanPage = new ScheduleYourScanPage(page);

    // login to the user profile
    await registrationPage.gotoGivenUrl('https://myezra-staging.ezra.com/');

    await loginPage.login('test.automation12345@myezra.com', 'A8121369833t@');

    await page.waitForLoadState('domcontentloaded').catch(() => {}); 
    
    await page.getByRole('button', { name: 'Close' }).click();

    await dashboardPage.clickOnBookAScanButton();

    await page.waitForLoadState('domcontentloaded').catch(() => {});        

    await reviewYourPlanPage.validateReviewYourPlanPageDisplayed(); 

    await reviewYourPlanPage.selectPlan('MRI Scan with Spine Available at $1499 Everything in the MRI Scan, plus spine-');

    await reviewYourPlanPage.clickOnContinueButton(); 
    
    await page.waitForLoadState('domcontentloaded').catch(() => {});

    await scheduleYourScanPage.validateScheduleYourScanPageDisplayed();  

    await scheduleYourScanPage.selectPlace();

    await page.waitForLoadState('domcontentloaded').catch(() => {});

    await scheduleYourScanPage.clickOnlatestEnabledDate();

    await scheduleYourScanPage.clickOnHoursToBeSelected();

    await scheduleYourScanPage.clickOnContinueButton();
    
    await page.waitForLoadState('domcontentloaded').catch(() => {});

    const reserveYourAppointment = new ReserveYourAppointPage(page);

    await reserveYourAppointment.validateReserveYourAppointmentPageDisplayed(); 

    await reserveYourAppointment.enterCardDetails('4242424242424242', '12/34', '123');

    await reserveYourAppointment.clickOnContinueButton();

    await page.waitForLoadState('domcontentloaded').catch(() => {}); 

    await reserveYourAppointment.validateBookingConfirmedPageDisplayed();

});    

test('login with user faced member credentials and validate the appointment', async ({ page }) => {

    const loginPage =  new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const appointmentsPage =  new AppointmentsPage(page); 
    
    // login to the user profile
    await loginPage.gotoUrl('https://staging-hub.ezra.com/sign-in/');

    await page.waitForLoadState('domcontentloaded').catch(() => {});

    await loginPage.login('michael.krakovsky+test_interview@ezra.com', '12121212Aa');

    await page.waitForLoadState('domcontentloaded').catch(() => {});

    await dashboardPage.validateDashboardMenuDisplayed();

    await dashboardPage.cickOnDashboardMenuOption();

    await dashboardPage.clickOnGivenLinkOption('Schedule');

    await page.waitForLoadState('domcontentloaded').catch(() => {});

    await dashboardPage.clickOnGivenLinkOption('Appointments');

    await appointmentsPage.validateAppointmentsPageDisplayed();

    await appointmentsPage.searchForAppointmentWithEmail(emailGlobal); 

    // validate newly created appointment by user is displayed
    await appointmentsPage.validateGivenAppintmentExists(emailGlobal);
});
