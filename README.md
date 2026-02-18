# ScoreCalc - Child Growth Calculator

ScoreCalc is a React Native mobile app for tracking and evaluating child growth.
The app is available for **Android** and **iOS**.

## Description (EN)

ScoreCalc is a practical child growth assessment app designed for parents, pediatricians, and healthcare teams. It helps evaluate physical development using WHO growth references and presents results in a clear, clinical-friendly format.

With ScoreCalc, you can enter a child's birth date, measurement date, sex, height, weight, and optional head circumference. The app calculates key indicators:

- Length/height-for-age
- Weight-for-age
- Weight-for-length (when applicable)
- Head circumference-for-age (when applicable)
- BMI-for-age (WHO 5-19 reference)

For each indicator, ScoreCalc provides z-scores and percentiles, plus color-coded interpretation to quickly highlight normal values, potential undernutrition, and risk of excess weight. BMI status is also classified by percentile ranges for easier screening.

## Описание (RU)

ScoreCalc — это практичное приложение для оценки физического развития детей, созданное для родителей, педиатров и медицинских специалистов. Оно помогает оценивать развитие по референсам роста ВОЗ и показывает результаты в понятном, клинически удобном формате.

В ScoreCalc можно ввести дату рождения ребёнка, дату измерения, пол, рост, вес и (при необходимости) окружность головы. Приложение рассчитывает ключевые показатели:

- Длина/рост по возрасту
- Масса тела по возрасту
- Масса тела к длине/росту (при применимости)
- Окружность головы по возрасту (при применимости)
- ИМТ по возрасту (референс ВОЗ 5-19 лет)

Для каждого показателя ScoreCalc показывает z-score и перцентили, а также цветовую интерпретацию, чтобы быстро выделять нормальные значения, возможный дефицит питания и риск избыточной массы тела.

## Descripción (ES)

ScoreCalc es una aplicación práctica para la evaluación del crecimiento infantil, diseñada para padres, pediatras y equipos de salud. Ayuda a evaluar el desarrollo físico usando referencias de crecimiento de la OMS y presenta los resultados en un formato claro y útil para el entorno clínico.

Con ScoreCalc, puedes ingresar la fecha de nacimiento del niño, la fecha de medición, el sexo, la talla, el peso y, de forma opcional, el perímetro cefálico. La app calcula indicadores clave:

- Longitud/talla para la edad
- Peso para la edad
- Peso para la longitud/talla (cuando aplica)
- Perímetro cefálico para la edad (cuando aplica)
- IMC para la edad (referencia OMS 5-19 años)

Para cada indicador, ScoreCalc proporciona puntuaciones z y percentiles, además de una interpretación con código de colores para identificar rápidamente valores normales, posible desnutrición y riesgo de exceso de peso.

## Features

- WHO-based child growth assessment
- Z-score and percentile calculation
- Color-coded interpretation
- Multi-language support (EN / RU / ES)
- Metric and imperial units
- Interactive growth charts

## Data Sources

- WHO Child Growth Standards (0-24 months): https://www.who.int/tools/child-growth-standards
- WHO Growth Reference Data for 5-19 years (BMI-for-age): https://www.who.int/tools/growth-reference-data-for-5to19-years/indicators/bmi-for-age

## Tech Stack

- React Native 0.83.1
- TypeScript
- React Navigation
- react-native-chart-kit / react-native-svg
- react-native-date-picker
- @react-native-async-storage/async-storage

## Build

```sh
npm install
npm start
npm run android
npm run ios
```

## Disclaimer

This app is for educational and screening support purposes only and does not replace professional medical diagnosis.

## Privacy Policy

- Repository page: `privacy-policy.md`

## License

Proprietary - All rights reserved.
