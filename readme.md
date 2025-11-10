Test Scenarios Overview:
1. Member Registration Flow:
Navigate to staging environment
Click Join button
Fill registration form with random data
Validate successful registration
Verify "Select your plan" page display
And pay using the card
Validate the booking is successful

2. Existing memeber tries to book the scan:
Navigate to staging environment
Click Login button
Enter credentials
Validate successful login
Click on the Book A Scan option
Enter the details and select your plan 
And pay using the card.
Validate the booking is successful

3. Validate in the User faced Url:
Login to the user faced url.
Goto to appointments.
Search for the user created in the 1st scenario. 
validate the booked scan user details displayed.

How to Execute Tests
Setup Prerequisites
npm install

Run All Tests
npx playwright test

Run Specific Test with UI Mode
npx playwright test "tests/memberRegistration.spec.ts" --headed --project=chromium

Run Tests with Debug Mode
npx playwright test "tests/memberRegistration.spec.ts" --headed --project=chromium --debug
