# Frontend

This folder contains the Expo React Native client for Mafia-Mole.

## Tech stack

- Expo SDK / Expo Router
- React Native
- TypeScript
- Jest for tests

## Setup

```powershell
cd frontend
npm install
```

## Run the app

Start the development server:

```powershell
npm start
```

You can also run platform-specific commands:

```powershell
npm run android
npm run ios
npm run web
```

## Useful commands

```powershell
npm run lint
npm test
```

## App structure

- app/ — screens and navigation routes
- components/ — reusable UI pieces
- function/ — helper logic for positioning and GPS
- assets/ — images and static resources

## Notes

This project uses Expo Router and the main entry point is defined in `package.json` as `expo-router/entry`.
