# Test Scenarios – automationintesting.online

Generated using the **official Playwright MCP Server** (browser automation) to explore https://automationintesting.online.

## Application overview

- **Site:** Shady Meadows B&B (Restful-booker-platform demo)
- **Base URL:** https://automationintesting.online
- **Sections:** Home, Rooms, Booking, Amenities, Location, Contact, Admin

---

## Scenario 1: Home page load and branding

- **Given** the user opens the site  
- **When** the home page loads  
- **Then** the page title is "Restful-booker-platform demo"  
- **And** the main heading is "Welcome to Shady Meadows B&B"  
- **And** the welcome paragraph describes the B&B  
- **And** a "Book Now" link is visible and points to the booking section  

**Assertions:** `title()`, heading text, welcome text visible, "Book Now" link visible and has correct href.

---

## Scenario 2: Book Now repositions to booking section

- **Given** the user is on the home page  
- **When** the user clicks the "Book Now" button in the hero (welcome) section  
- **Then** the page repositions (scrolls) to the booking part of the page  
- **And** the "Check Availability & Book Your Stay" section is visible or brought into view  

**Assertions:** "Book Now" button in hero is clickable; after click, booking section is in view (e.g. section heading visible or scroll position / hash updated).

---

## Scenario 3: Main navigation

- **Given** the user is on the home page  
- **When** the main navigation is visible  
- **Then** the following links are present: Shady Meadows B&B (home), Rooms, Booking, Amenities, Location, Contact, Admin  
- **And** each link has a valid target (hash or /admin)  

**Assertions:** All nav links visible and clickable; Admin links to `/admin`, others to `/#...`.

---

### Scenario 24: Main nav links scroll to sections (Rooms, Booking, Amenities, Location, Contact)

- **Given** the user is on the home page  
- **When** the user clicks each main nav link in turn: Rooms, Booking, Amenities, Location, Contact  
- **Then** the page scrolls to the corresponding section (or the URL hash updates)  
- **And** the target section is visible or brought into view  

**Assertions:** Each nav link is clickable; after click, the matching section (#rooms, #booking, #amenities, #location, #contact) is in view or URL reflects the hash.

---

## Scenario 4: Booking / availability section

- **Given** the user is on the home page  
- **When** the "Check Availability & Book Your Stay" section is visible  
- **Then** "Check In" and "Check Out" date inputs are present  
- **And** a "Check Availability" button is present  
- **And** after selecting dates and clicking the button, room options are shown  

**Assertions:** Section heading, both date fields, button visible; optional: room cards appear after action.

---

## Scenario 5: Check Availability with date selection

- **Given** the user is on the home page  
- **When** the "Check Availability & Book Your Stay" section is visible  
- **And** the user changes the Check In and Check Out dates  
- **And** the user clicks the "Check Availability" button  
- **Then** room options or availability results are shown (e.g. room cards or links to book)  

**Assertions:** Check In and Check Out inputs are editable; after setting dates and clicking "Check Availability", room results or room-related content is visible.

---

## Scenario 6: Rooms section

- **Given** the user is on the home page  
- **When** the "Our Rooms" section is visible  
- **Then** three room types are displayed: Single, Double, Suite  
- **And** Single shows "£100 per night" and a "Book now" link  
- **And** Double shows "£150 per night" and a "Book now" link  
- **And** Suite shows "£225 per night" and a "Book now" link  
- **And** each room has an image and description  

**Assertions:** Section heading "Our Rooms"; three room cards; correct prices and "Book now" links; room images present.

---

## Scenario 7: Click Single room

- **Given** the user is on the home page and the "Our Rooms" section is visible  
- **When** the user clicks on the Single room (card or "Book now" link for Single)  
- **Then** the user is taken to the Single room booking/detail page  
- **And** the "Book This Room" section is visible  

**Assertions:** Single room "Book now" is clickable; after click, room detail page shows "Single Room" heading and "Book This Room" section.

---

## Single Room page (booking)

### Scenario 14: Single Room – Page layout and sections

- **Given** the user is on the Single Room page (/reservation/1)  
- **When** the page has loaded  
- **Then** the main heading "Single Room" is displayed  
- **And** the "Room Description" section is visible  
- **And** the "Room Features" section is visible  
- **And** the "Room Policies" section is visible (e.g. Check-in & Check-out, House Rules)  
- **And** the "Book This Room" section is visible (calendar, price, Reserve Now)  
- **And** the "Similar Rooms You Might Like" section is visible  

**Assertions:** URL contains `/reservation/1`; all key sections and headings are present and visible.

---

### Scenario 15: Single Room – Reserve Now without selecting dates

- **Given** the user is on the Single Room page (/reservation/1)  
- **When** the user does not select Check In or Check Out dates in the calendar  
- **And** the user clicks the "Reserve Now" button  
- **Then** the booking is not submitted (user remains on the page or a validation message is shown)  
- **And** dates are required or an error/validation is displayed  

**Assertions:** Reserve Now is clickable; without dates, no successful submission; error/validation visible or URL unchanged.

---

### Scenario 16: Single Room – Reserve Now with dates but without mandatory guest details

- **Given** the user is on the Single Room page  
- **When** the user selects Check In and Check Out dates in the calendar  
- **And** the user does not fill mandatory guest fields (e.g. First name, Last name, Email, Phone)  
- **And** the user clicks the "Reserve Now" button  
- **Then** the booking is not submitted or validation errors are shown for the missing fields  

**Assertions:** With dates but empty mandatory fields, submission is blocked or validation messages appear.

---

### Scenario 17: Single Room – Happy path: dates + guest details + Reserve Now

- **Given** the user is on the Single Room page  
- **When** the user selects Check In and Check Out dates in the calendar  
- **And** the user fills all mandatory guest fields (First name, Last name, Email, Phone)  
- **And** the user clicks the "Reserve Now" button  
- **Then** the booking is submitted successfully  
- **And** a confirmation message or success state is shown (or user is taken to a confirmation page)  

**Assertions:** With valid dates and guest details, Reserve Now succeeds and confirmation/success is visible.

---

### Scenario 18: Single Room – Reserve with First name empty (other fields valid)

- **Given** the user is on the Single Room page  
- **When** the user selects Check In and Check Out dates  
- **And** the user leaves First name empty and fills Last name, Email, Phone with valid values  
- **And** the user clicks "Reserve Now"  
- **Then** validation is shown (e.g. alert or inline error) and the booking is not submitted  

**Assertions:** First name is mandatory; with only First name empty, validation/alert is visible.

---

### Scenario 19: Single Room – Reserve with Last name empty (other fields valid)

- **Given** the user is on the Single Room page  
- **When** the user selects dates and leaves Last name empty; fills First name, Email, Phone  
- **And** the user clicks "Reserve Now"  
- **Then** validation is shown and the booking is not submitted  

**Assertions:** Last name is mandatory; with only Last name empty, validation/alert is visible.

---

### Scenario 20: Single Room – Reserve with Email empty (other fields valid)

- **Given** the user is on the Single Room page  
- **When** the user selects dates and leaves Email empty; fills First name, Last name, Phone  
- **And** the user clicks "Reserve Now"  
- **Then** validation is shown and the booking is not submitted  

**Assertions:** Email is mandatory; with only Email empty, validation/alert is visible.

---

### Scenario 21: Single Room – Reserve with Phone empty (other fields valid)

- **Given** the user is on the Single Room page  
- **When** the user selects dates and leaves Phone empty; fills First name, Last name, Email  
- **And** the user clicks "Reserve Now"  
- **Then** validation is shown and the booking is not submitted  

**Assertions:** Phone is mandatory; with only Phone empty, validation/alert is visible.

---

### Scenario 22: Single Room – Navigate to Double room via "View Details"

- **Given** the user is on the Single Room page  
- **When** the "Similar Rooms You Might Like" section is visible  
- **And** the user clicks "View Details" for the Double room  
- **Then** the Double room page is opened (/reservation/2)  
- **And** the page shows the Double room heading and "Book This Room" section  

**Assertions:** View Details link for Double is clickable; after click, URL contains `/reservation/2` and Double room content is visible.

---

### Scenario 23: Single Room – Navigate to Suite room via "View Details"

- **Given** the user is on the Single Room page  
- **When** the "Similar Rooms You Might Like" section is visible  
- **And** the user clicks "View Details" for the Suite room  
- **Then** the Suite room page is opened (/reservation/3)  
- **And** the page shows the Suite room heading and "Book This Room" section  

**Assertions:** View Details link for Suite is clickable; after click, URL contains `/reservation/3` and Suite room content is visible.

---

## Double Room page (booking)

The same scenario types as for the Single Room page apply to the Double room page (/reservation/2):

- **Page layout and sections** – Double heading, Room Description, Room Features, Room Policies, Book This Room, Similar Rooms visible.
- **Reserve Now** – Without dates; with dates but no guest details; with one mandatory field empty (First name, Last name, Email, Phone); happy path with all fields filled.
- **Navigate via View Details** – From Double room, "View Details" for Single room opens /reservation/1; "View Details" for Suite room opens /reservation/3.

**Assertions:** Same as Single Room scenarios 14–21 and 22/23, applied to the Double room page and its Similar Rooms links.

---

## Suite Room page (booking)

The same scenario types as for the Single Room page apply to the Suite room page (/reservation/3):

- **Page layout and sections** – Suite heading, Room Description, Room Features, Room Policies, Book This Room, Similar Rooms visible.
- **Reserve Now** – Without dates; with dates but no guest details; with one mandatory field empty; happy path.
- **Navigate via View Details** – From Suite room, "View Details" for Single room opens /reservation/1; "View Details" for Double room opens /reservation/2.

**Assertions:** Same as Single Room scenarios 14–21 and 22/23, applied to the Suite room page and its Similar Rooms links.

---

## Scenario 8: Click Double room

- **Given** the user is on the home page and the "Our Rooms" section is visible  
- **When** the user clicks on the Double room (card or "Book now" link for Double)  
- **Then** the user is taken to the Double room booking/detail page  
- **And** the "Book This Room" section is visible  

**Assertions:** Double room "Book now" is clickable; after click, room detail page shows Double heading and "Book This Room" section.

---

## Scenario 9: Click Suite room

- **Given** the user is on the home page and the "Our Rooms" section is visible  
- **When** the user clicks on the Suite room (card or "Book now" link for Suite)  
- **Then** the user is taken to the Suite room booking/detail page  
- **And** the "Book This Room" section is visible  

**Assertions:** Suite room "Book now" is clickable; after click, room detail page shows Suite heading and "Book This Room" section.

---

## Scenario 10: Our Location section

- **Given** the user is on the home page  
- **When** the "Our Location" section is visible  
- **Then** the section heading "Our Location" is displayed  
- **And** the address is shown as "Shady Meadows B&B, Shadows valley, Newingtonfordburyshire, Dilbery, N1 1AA"  
- **And** contact details (phone and/or email) or a map are present in the section  

**Assertions:** Section heading "Our Location"; address text correct; location/contact content or map visible.

---

## Scenario 11: Contact form

- **Given** the user is on the home page  
- **When** the "Send Us a Message" section is visible  
- **Then** form fields are present: Name, Email, Phone, Subject, Message  
- **And** a "Submit" button is present  
- **And** submitting with valid data results in a success message or confirmation  

**Assertions:** Section heading; all five fields and Submit button visible; optional: success state after submit.

---

## Scenario 12: Admin login page

- **Given** the user navigates to /admin  
- **When** the admin page loads  
- **Then** the page shows a "Login" heading  
- **And** "Username" and "Password" inputs are present  
- **And** a "Login" button is present  
- **And** valid credentials (from env) allow the user to log in and see admin UI (e.g. Logout)  

**Assertions:** URL contains `/admin`; Login heading; username and password fields; Login button; after login, logout or admin-only content visible.

---

### Scenario 12a: Admin – Login with no credentials (empty fields)

- **Given** the user is on the admin login page (/admin)  
- **When** the user does not enter Username or Password  
- **And** the user clicks the "Login" button  
- **Then** the "Invalid credentials" message appears  

**Assertions:** Login button clickable; with empty fields, "Invalid credentials" message is visible; URL remains /admin.

---

### Scenario 12b: Admin – Login with only Username (Password empty)

- **Given** the user is on the admin login page  
- **When** the user enters a valid Username but leaves Password empty  
- **And** the user clicks "Login"  
- **Then** the "Invalid credentials" message appears  

**Assertions:** Password is required; with only Username, "Invalid credentials" message is visible.

---

### Scenario 12c: Admin – Login with only Password (Username empty)

- **Given** the user is on the admin login page  
- **When** the user leaves Username empty and enters a Password  
- **And** the user clicks "Login"  
- **Then** the "Invalid credentials" message appears  

**Assertions:** Username is required; with only Password, "Invalid credentials" message is visible.

---

## Scenario 13: Contact information (footer / location)

- **Given** the user is on the home page  
- **When** the Contact Information / Location section is visible  
- **Then** the address is "Shady Meadows B&B, Shadows valley, Newingtonfordburyshire, Dilbery, N1 1AA"  
- **And** phone is "012345678901"  
- **And** email is "fake@fakeemail.com"  

**Assertions:** Address, phone, and email text match expected values.

---

## Scenario 14: Footer and policies

- **Given** the user is on the home page  
- **When** the footer is visible  
- **Then** links to Cookie Policy (/cookie), Privacy Policy (/privacy), and Admin panel (/admin) are present  
- **And** footer mentions "restful-booker-platform" and "Mark Winteringham"  

**Assertions:** Cookie-Policy, Privacy-Policy, Admin panel links; optional: footer text content.

---

### Scenario 25: Footer – Cookie Policy and Privacy Policy links open correct pages

- **Given** the user is on the home page  
- **When** the user clicks the "Cookie Policy" / "Cookie-Policy" link in the footer  
- **Then** the user is taken to the Cookie Policy page (URL contains /cookie)  
- **When** the user returns to the home page and clicks the "Privacy Policy" / "Privacy-Policy" link  
- **Then** the user is taken to the Privacy Policy page (URL contains /privacy)  

**Assertions:** Footer Cookie and Privacy links are clickable and navigate to /cookie and /privacy respectively.

---

### Scenario 26: Room page – Breadcrumb "Home" navigates back to home

- **Given** the user is on a room page (e.g. Single, Double, or Suite)  
- **When** the user clicks the "Home" link in the breadcrumb navigation  
- **Then** the user is taken back to the home page (base URL or /)  
- **And** the home page content (e.g. welcome heading) is visible  

**Assertions:** Breadcrumb Home link is clickable; after click, URL is home and welcome content is visible.

---

### Scenario 27: Room page – Cancel button in booking form

- **Given** the user is on a room page and has selected dates and opened the guest form (e.g. by clicking "Reserve Now")  
- **When** the "Cancel" button is visible and the user clicks it  
- **Then** the booking form is dismissed (user remains on the room page; no submission)  

**Assertions:** Cancel button is visible after the guest form is shown; after click, user stays on room page.

---

## Tests implemented (from these scenarios)

1. **Home page and navigation** – Scenarios 1, 2, 3, 24, 5, 6, 7, 8, 9, 10 (title, welcome, Book Now → booking scroll, nav links scroll to sections, Check Availability with dates, rooms, Single/Double/Suite click → booking, Our Location); Scenario 25 (footer Cookie/Privacy links).  
2. **Single Room page** – Scenarios 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 26, 27 (page layout and sections; reserve flows; one mandatory field empty; happy path; navigate to Double/Suite via View Details; breadcrumb Home; Cancel button).  
3. **Double Room page** – Same as Single (layout, reserve flows, one field empty, happy path; navigate to Single/Suite via View Details; breadcrumb Home; Cancel).  
4. **Suite Room page** – Same as Single (layout, reserve flows, one field empty, happy path; navigate to Single/Double via View Details; breadcrumb Home; Cancel).  
5. **Contact form visibility and submission** – Scenario 11 (form fields, submit, success/validation).  
6. **Admin login page** – Scenarios 12, 12a, 12b, 12c (login form visible; login with empty fields, username only, password only; login with valid credentials, logout visible).

All exploration was performed via the **Playwright MCP Server** (user-playwright), not playwright-test.
