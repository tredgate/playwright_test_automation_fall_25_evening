# Login Prototype App

A modern, colorful login page prototype with Playwright test automation.

## 📁 Project Structure

```
src/app/
├── login.html          # Main login page
├── login.css           # Colorful modern styling
├── login.js            # Login logic with hardcoded credentials
├── dashboard.html      # Dashboard page after successful login
└── server.ts           # Simple HTTP server for testing

src/pages/prototype/
├── login_page.ts       # Page object for login page
└── dashboard_page.ts   # Page object for dashboard page

tests/exercises/
├── prototype_login_tests.spec.ts      # Login functionality tests (17 tests)
└── prototype_dashboard_tests.spec.ts  # Dashboard functionality tests (9 tests)
```

## 🎨 Features

### Design

- **Modern & Colorful**: Gradient backgrounds with animated floating shapes
- **Responsive**: Works on desktop and mobile devices
- **Interactive**: Smooth animations and transitions
- **User-Friendly**: Clear error and success messages

### Functionality

- ✅ Login with hardcoded credentials (no database needed)
- ✅ Form validation
- ✅ Session management using sessionStorage
- ✅ Error handling with user-friendly messages
- ✅ Loading states during login
- ✅ Automatic redirect after successful login
- ✅ Protected dashboard page

## 🔐 Test Credentials

The app includes three hardcoded users:

| Username | Password  |
| -------- | --------- |
| admin    | Admin123! |
| testuser | Test123!  |
| demo     | Demo123!  |

## 🧪 Testing

### Run All Tests

```bash
npx playwright test tests/exercises/prototype_login_tests.spec.ts tests/exercises/prototype_dashboard_tests.spec.ts
```

### Run Login Tests Only

```bash
npx playwright test tests/exercises/prototype_login_tests.spec.ts
```

### Run Dashboard Tests Only

```bash
npx playwright test tests/exercises/prototype_dashboard_tests.spec.ts
```

### Test Coverage

- **26 total tests** - All passing ✅
- **17 login tests** covering:
  - Page visibility and elements
  - Successful login scenarios
  - Failed login scenarios
  - Form validation
  - Error message handling
  - UI interactions
- **9 dashboard tests** covering:
  - Dashboard display
  - User information
  - Logout functionality
  - Session management
  - Protected routes

## 🚀 Development

The app is automatically served during test runs via Playwright's `webServer` configuration.

To manually run the server:

```bash
npx tsx src/app/server.ts
```

Then open: http://localhost:8080/login.html

## 📝 Technical Details

- **No Backend**: All credentials are hardcoded in JavaScript
- **No Database**: User data stored in sessionStorage
- **Playwright Tests**: Following project patterns with Page Object Model
- **ESLint**: Configured with browser globals for app scripts
- **TypeScript**: Used for page objects and server
- **Modern CSS**: Using CSS variables, gradients, and animations

## ✨ Key Features Tested

1. ✅ Login form validation
2. ✅ Successful authentication with all test users
3. ✅ Error handling for invalid credentials
4. ✅ Empty field validation
5. ✅ Dynamic error message display/hide
6. ✅ Remember me checkbox functionality
7. ✅ Loading states during login
8. ✅ Dashboard access control
9. ✅ Session persistence
10. ✅ Logout functionality
11. ✅ Protected route handling

All tests pass with no syntax or ESLint issues! 🎉
