# ScoreCalc - Child Growth Calculator

A React Native mobile application for tracking and evaluating child physical development using WHO (0-24 months) and CDC (2-20 years) growth standards.

## Features

### Core Functionality
- **Physical Development Assessment**: Calculate z-scores and percentiles for:
  - Height/Length for age (0-24 months)
  - Weight for age (0-24 months)
  - Weight for length (45-110 cm)
  - Head circumference for age (0-24 months)
  - **BMI-for-age (2-20 years)** - CDC standards with sex-specific percentile categories

### BMI Categories (CDC, ages 2-20)
- **Underweight**: < 5th percentile
- **Healthy Weight**: 5th to < 85th percentile
- **Overweight**: 85th to < 95th percentile
- **Obesity**: ≥ 95th percentile
- **Severe Obesity**: ≥ 120% of 95th percentile or BMI ≥ 35

### Growth Charts
- Interactive growth curve visualization
- **Age range zoom**: View full 0-24 months or detailed 6-month intervals
- Visual comparison with WHO reference curves
- Child's measurement point display on charts

### Multi-Language Support
- English
- Russian (Русский)
- Spanish (Español)

### Unit System Support
- Metric (cm, kg)
- Imperial (ft/in, lb)

## Version History

### v2.3.0 (Current)
- Added CDC BMI-for-age calculation for children 2-20 years
- BMI percentile categories with color-coded indicators
- Improved chart zoom with age range selection (0-6m, 6-12m, etc.)
- Better axis visibility when viewing detailed ranges

### v2.2.0
- Added Spanish language support
- Pinch-to-zoom for growth charts
- Compact horizontal legend
- WHO disclaimer in terms of use

### v2.1.0
- Bug fixes for charts and measurements

### v2.0.0
- WHO growth standards implementation
- Multiple measurement indicators

## Technical Stack

- **Framework**: React Native 0.83.1
- **Language**: TypeScript
- **Navigation**: React Navigation (Bottom Tabs)
- **Charts**: react-native-chart-kit, react-native-svg
- **Date Picker**: react-native-date-picker
- **Storage**: @react-native-async-storage/async-storage

## Data Sources

- **WHO Child Growth Standards** (0-24 months): [WHO Growth Charts](https://www.who.int/tools/child-growth-standards)
- **CDC Growth Charts** (2-20 years BMI): [CDC Growth Charts](https://www.cdc.gov/growthcharts/)
- LMS method for z-score calculation

## Building

### Prerequisites
- Node.js 18+
- Java JDK 17
- Android SDK

### Development
```sh
npm install
npm start
npm run android
```

### Release APK
```sh
cd android
./gradlew assembleRelease
```

The APK will be in: `android/app/build/outputs/apk/release/app-release.apk`

## Disclaimer

This application is for educational and informational purposes only. It is NOT intended to replace professional medical advice. The application is NOT affiliated with WHO or CDC. Always consult healthcare professionals for medical decisions.

## License

Proprietary - All rights reserved
