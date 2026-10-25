# HB+ Authentication App

A cross-platform authentication application developed as part of the HB+ IT Intern assignment. Built with Expo, React Native, TypeScript, and Firebase Authentication, the app provides Google Sign-In with company-domain validation and a protected dashboard.

## Features

- **Google Sign-In:** Authenticate using a Google account.
- **Company email restriction:** Accept only email addresses belonging to `@hbplus.fit`.
- **Email verification:** Reject accounts whose email address is not verified.
- **Protected dashboard:** Redirect unauthenticated users to the login screen.
- **Session management:** Track authentication state and provide logout functionality.
- **Loading and error handling:** Display appropriate feedback during authentication and session checks.
- **Cross-platform support:** Run the application on Android and the web using Expo.
- **Development-only dashboard preview:** Inspect the dashboard UI without signing in. This preview does not create an authenticated session.

## Tech Stack

- React Native
- Expo and Expo Router
- React and TypeScript
- Firebase Authentication
- Google Sign-In
- Jest for unit testing
- Netlify configuration for web deployment

## Project Structure

```text
.
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── dashboard.tsx
├── assets/
├── netlify/
│   └── functions/
│       └── server.ts
├── src/
│   ├── components/
│   ├── contexts/
│   ├── lib/
│   ├── services/
│   └── utils/
│       └── __tests__/
├── app.json
├── netlify.toml
├── package.json
├── .env.example
└── README.md
```

## Prerequisites

Before running the project, install:

- Node.js and npm
- Git
- A Firebase project with Authentication enabled
- Google OAuth client configuration
- Android Studio and an Android emulator if testing on Android

## Getting Started

### 1. Clone the repository

After the project has been published to GitHub, clone it using the repository URL:

```bash
git clone https://github.com/amitshah12/hbplus-auth.git
cd hbplus-auth
```

Replace the placeholder URL with the actual repository URL.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root using `.env.example` as a reference.

Configure the following variables with values from your Firebase project and Google Cloud OAuth configuration:

| Variable | Purpose |
|---|---|
| `EXPO_PUBLIC_FIREBASE_API_KEY` | Firebase web API key |
| `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase authentication domain |
| `EXPO_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `EXPO_PUBLIC_FIREBASE_APP_ID` | Firebase web app ID |
| `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` | Google OAuth web client ID |
| `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID` | Google OAuth Android client ID |

Use the actual values from your own configuration. Do not commit `.env` or put private credentials in `.env.example`.

### 4. Configure Firebase and Google Sign-In

1. Create or select a project in the Firebase Console.
2. Register a web application and configure its Firebase settings.
3. Enable Google as a sign-in provider under Firebase Authentication.
4. Configure the authorized domains required for local development and the deployed web application.
5. Configure the appropriate Google OAuth client IDs for web and Android.
6. For Android, ensure the OAuth configuration matches the application package name and the relevant signing certificate fingerprints.

The Android package name configured for this project is `com.hbplus.auth`.

**Access policy:** The app validates the email verification status and checks that the email domain is `hbplus.fit`. Successful sign-in requires a real, eligible Google account. Client-side validation alone is not a substitute for server-side authorization when accessing protected backend resources.

### 5. Run the application

Start the Expo development server:

```bash
npx expo start
```

To start the web version:

```bash
npx expo start --web
```

For Android, start an emulator through Android Studio and launch the app using the Expo development workflow.

## Testing and Validation

Run the following commands from the project root.

### TypeScript validation

```bash
npx tsc --noEmit
```

### Unit tests

```bash
npx jest --runInBand
```

The email-domain validation test suite covers official-domain acceptance, rejection of personal and lookalike domains, case-insensitive matching, subdomains, malformed addresses, and empty values.

### Expo project checks

```bash
npx expo-doctor
```

### Web production export

```bash
npx expo export --platform web --clear
```

These checks validate TypeScript, unit tests, project configuration, and web export. Passing them does not independently confirm that production OAuth, successful sign-in with an eligible HB+ account, or deployment is working correctly.

## Development Dashboard Preview

A development-only preview option is available from the login screen to inspect the dashboard UI when an eligible company account is unavailable.

The preview is for UI testing only. It does not authenticate a user and must not be used to access real protected data. Development-only functionality should not be exposed in production builds.

## Deployment

The repository includes a `netlify.toml` file and a Netlify server function for the Expo web output.

Deployment steps:

1. Push the project to GitHub.
2. Link the GitHub repository to a Netlify site.
3. Configure the build command, publish directory, and function settings from `netlify.toml`.
4. Add the required Expo public environment variables in Netlify's site settings.
5. Configure the deployed domain in Firebase Authentication and the relevant Google OAuth settings.
6. Deploy and test login, rejected accounts, session behavior, logout, and protected routes.

The deployment configuration must be validated with a successful Netlify build and live deployment before the hosted application can be considered verified.

## Security Considerations

- Never commit `.env`, private keys, service-account credentials, or other secrets.
- Variables prefixed with `EXPO_PUBLIC_` are included in client-side code and must not contain private secrets.
- Firebase client configuration is not an authorization mechanism.
- Enforce authorization using appropriate backend checks or Firebase Security Rules when protected data is involved.
- Verify domain restrictions with both eligible and ineligible accounts before release.
