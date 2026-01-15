# ScoreCalc Project Instructions

## Project Overview
ScoreCalc is a React Native mobile application for tracking child physical development using WHO and CDC growth standards.

## Technical Stack
- React Native 0.83.1
- TypeScript
- Java 17 (JAVA_HOME: C:\Program Files\Java\jdk-17)
- Android SDK

## Key Directories
- `src/screens/` - Main UI screens (HomeScreen, ChartsScreen, SettingsScreen)
- `src/utils/calculations.ts` - Growth calculation logic with WHO/CDC LMS data
- `src/i18n/translations.ts` - Multi-language support (en, ru, es)
- `src/context/AppContext.tsx` - Global app state management
- `android/` - Android native code and build configuration

## Growth Standards
- WHO Standards (0-24 months): Length, weight, head circumference
- CDC Standards (24-240 months): BMI-for-age with sex-specific percentiles

## Building
```sh
# Development
npm start
npm run android

# Release APK
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
cd android
./gradlew assembleRelease
```

## Current Version
v2.3.0 (versionCode: 4)

## Recent Changes (v2.3.0)
- Added CDC BMI-for-age calculation for ages 2-20 years
- BMI categories: Underweight, Healthy, Overweight, Obesity, Severe Obesity
- Improved chart zoom with age range selection buttons
- Fixed axis visibility when viewing detailed ranges
