## 2025-08-17
# AutoAuction

![Project Preview](https://drive.google.com/uc?export=view&id=1QPJMTfk6NiYWgswb47cSkuK1WyKaKd5P)

Mobile challenge application built with React Native (Expo), designed for browsing and managing auction vehicles.  

## 📖 Additional Notes

Builds: the app currently runs through Expo Go. A next step would be to generate native builds (APK for Android, IPA for iOS) to simplify testing and distribution.

E2E Testing: so far only unit and integration tests are included. Adding end-to-end testing would improve coverage — using Cypress (if keeping Expo) or Detox (if migrating to bare workflow) could be considered.

Quality workflow: Husky is already set up to run checks before commits. As a further improvement, running these validations automatically before Pull Requests are merged (via GitHub Actions) would enforce quality at the PR level.

## 🚀 Technologies

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Zustand](https://github.com/pmndrs/zustand)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [React Navigation](https://reactnavigation.org/)
- [Testing Library](https://testing-library.com/)


## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/autoauction.git

# Move into the project folder
cd autoauction

# Install dependencies
yarn / npm install

# Start the app with Expo
npx expo start
````


## 📱 Available Scripts

* `npm start` → start the app with Expo
* `npm run android` → run on Android emulator/device
* `npm run ios` → run on iOS simulator
* `npm run web` → run on web browser
* `npm run lint` → run ESLint
* `npm run format` → format code with Prettier
* `npm run test` → run tests
* `npm run test:watch` → run tests in watch mode
* `npm run test:coverage` → generate coverage report


## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```
