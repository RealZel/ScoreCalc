export const translations = {
  en: {
    // Language Selection
    selectLanguage: 'Select Language',
    
    // Navigation
    home: 'Home',
    charts: 'Charts',
    settings: 'Settings',
    
    // Main Screen
    physicalDevelopment: 'PHYSICAL DEVELOPMENT',
    birthDate: 'Date of Birth',
    measurementDate: 'Measurement Date',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    height: 'Height',
    weight: 'Weight',
    headCircumference: 'Head Circumference',
    calculate: 'Calculate',
    
    // Results
    bodyLength: 'Body length',
    bodyWeight: 'Body weight',
    weightToLength: 'Weight to length',
    headCirc: 'Head circumference',
    zscore: 'z-score',
    percentile: 'percentile',
    age: 'Age',
    years: 'years',
    months: 'months',
    weeks: 'weeks',
    days: 'days',
    
    // Units
    cm: 'cm',
    kg: 'kg',
    inches: 'in',
    pounds: 'lb',
    feet: 'ft',
    ft: 'ft',
    in: 'in',
    
    // Settings
    language: 'Language',
    measurementUnits: 'Measurement Units',
    metric: 'Metric',
    metricUnits: '(cm, kg)',
    imperial: 'Imperial',
    imperialUnits: '(in, lb)',
    aboutPercentiles: 'About Percentiles',
    aboutZscore: 'About Z-score',
    calculationDescription: 'Calculation Description',
    termsOfUse: 'Terms of Use',
    
    // Charts
    growthCharts: 'Growth Charts',
    heightForAge: 'Height for Age',
    weightForAge: 'Weight for Age',
    headCircForAge: 'Head Circumference for Age',
    weightForHeight: 'Weight for Height',
    yourChild: 'Your child',
    median: 'Median',
    
    // About Percentiles
    percentilesTitle: 'What are Percentiles?',
    percentilesDescription: `Percentiles are the most commonly used indicators for assessing child growth and development. A percentile value reflects a relative position compared to children in the control group - it shows what percentage of children of the same sex and age in the control population have a value lower than that measured in a specific child.

For example, a three-year-old boy whose height is at the 25th percentile is taller than 25% and shorter than 75% of three-year-old boys in the control population.`,
    
    // About Z-score
    zscoreTitle: 'What is Z-score?',
    zscoreDescription: `Z-score shows the deviation of the measured value from the mean for the control population, divided by the standard deviation for that population. Z-scores are directly related to percentiles, and it is possible to convert z-scores to percentiles and vice versa.

In most clinical situations, z-score values from -2 to +2 are considered normal. However, often the clinical significance lies not so much in the z-score value of a specific measurement, but in the dynamics of its change over time.`,
    
    // Calculation Description
    calculationTitle: 'Calculation Description',
    calculationDescription1: `Z-score values and percentiles are calculated for assessing the physical development of children.

Z-score values are calculated based on L (Box-Cox transformation coefficient to normality), M (median), S (coefficient of variation of the standard indicator) values according to WHO child growth standards.

Percentile values are calculated from the obtained z-score value.`,
    calculationDescription2: `Z-score and percentile values for body length or height are calculated per day of life for children under 5 years old (up to day 1856) and per month of life for children over 5 years old (from month 61 to month 228).

Z-score and percentile values for body weight are calculated per day of life for children under 5 years old (up to day 1856) and per month of life for children over 5 years old and under 10 years old (from month 61 to month 120).

Z-score and percentile values for body weight to body length or height ratio are calculated per day of life for children under 5 years old (up to day 1856) for children with body length or height from 45 cm to 110 cm.

Z-score and percentile values for head circumference are calculated per day of life for children under 5 years old (up to day 1856).`,
    
    // Terms of Use
    termsTitle: 'Terms of Use & Disclaimer',
    termsContent: `IMPORTANT: PLEASE READ THESE TERMS CAREFULLY BEFORE USING THIS APPLICATION

1. EDUCATIONAL PURPOSE ONLY
The information provided in this application is presented solely for educational and informational purposes. It does not claim to be complete, accurate, or up-to-date.

2. NOT MEDICAL ADVICE
This application is NOT intended to be used as, and should NOT be used as, a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified healthcare provider with any questions you may have regarding your child's health or a medical condition.

3. NO AFFILIATION WITH WHO
This application is NOT affiliated with, endorsed by, or in any way officially connected with the World Health Organization (WHO) or any of its subsidiaries or affiliates. The WHO growth standards used in this application are publicly available reference data.

4. NO WARRANTY
The information in this application is provided "as is" without warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.

5. LIMITATION OF LIABILITY
Under no circumstances shall the developers, authors, or distributors of this application be liable for any direct, indirect, incidental, special, consequential, or exemplary damages arising from the use of or inability to use this application or the information contained herein.

6. USER RESPONSIBILITY
By using this application, you acknowledge and agree that:
- You assume full responsibility for any actions taken based on the information provided
- You will not rely solely on this application for any healthcare decisions
- You will consult appropriate medical professionals for health-related concerns
- The application calculations are based on WHO growth standards and may not apply to all populations or individual circumstances

7. INDEMNIFICATION
You agree to indemnify, defend, and hold harmless the developers and distributors of this application from any claims, damages, losses, or expenses arising from your use of the application.

8. ACCEPTANCE OF TERMS
By using this application, you signify your acceptance of these terms. If you do not agree to these terms, please do not use this application.`,
    
    accept: 'Accept',
    decline: 'Decline',
    
    // Validation
    pleaseEnterAllFields: 'Please enter all required fields',
    invalidDate: 'Invalid date',
    invalidValue: 'Invalid value',
    childTooOld: 'Child is too old for this calculation (max 19 years)',
    
    // Clear
    clear: 'Clear',
    history: 'History',
    noData: 'No data available',
    
    // BMI and interpretation
    bmi: 'BMI',
    interpretation: 'Interpretation',
    normal: 'Normal',
    attention: 'Needs attention',
    risk: 'Risk',
    childMeasurement: 'Your child',
    headCircOptional: 'Head circumference (optional)',
    
    // BMI Categories (Percentiles)
    bmiForAge: 'BMI-for-Age',
    bmiPronouncedDeficit: 'Pronounced weight deficit',
    bmiNormalWeight: 'Normal weight',
    bmiOverweightRisk: 'Risk of overweight',
    bmiUnderweight: 'Underweight',
    bmiHealthy: 'Healthy weight',
    bmiOverweight: 'Overweight',
    bmiObesity: 'Obesity',
    bmiSevereObesity: 'Severe obesity',
    bmiAvailableFrom2: 'BMI-for-age is calculated for children aged 5-19 years',
  },
  ru: {
    // Language Selection
    selectLanguage: 'Выберите язык',
    
    // Navigation
    home: 'Главная',
    charts: 'Графики',
    settings: 'Настройки',
    
    // Main Screen
    physicalDevelopment: 'ФИЗИЧЕСКОЕ РАЗВИТИЕ',
    birthDate: 'Дата рождения',
    measurementDate: 'Дата измерения',
    gender: 'Пол',
    male: 'Мужской',
    female: 'Женский',
    height: 'Рост',
    weight: 'Вес',
    headCircumference: 'Окружность головы',
    calculate: 'Рассчитать',
    
    // Results
    bodyLength: 'Длина тела',
    bodyWeight: 'Масса тела',
    weightToLength: 'Масса тела к длине тела',
    headCirc: 'Окружность головы',
    zscore: 'z-score',
    percentile: 'перцентиль',
    age: 'Возраст',
    years: 'лет',
    months: 'месяцев',
    weeks: 'недель',
    days: 'дней',
    
    // Units
    cm: 'см',
    kg: 'кг',
    inches: 'дюйм',
    pounds: 'фунт',
    feet: 'фут',
    ft: 'фт',
    in: 'дюйм',
    
    // Settings
    language: 'Язык',
    measurementUnits: 'Единицы измерения',
    metric: 'Метрические',
    metricUnits: '(см, кг)',
    imperial: 'Американские',
    imperialUnits: '(дюймы, фунты)',
    aboutPercentiles: 'О перцентилях',
    aboutZscore: 'О z-score',
    calculationDescription: 'Описание вычислений',
    termsOfUse: 'Правила использования',
    
    // Charts
    growthCharts: 'Кривые роста',
    heightForAge: 'Рост по возрасту',
    weightForAge: 'Вес по возрасту',
    headCircForAge: 'Окружность головы по возрасту',
    weightForHeight: 'Вес по росту',
    yourChild: 'Ваш ребёнок',
    median: 'Медиана',
    
    // About Percentiles
    percentilesTitle: 'Что такое перцентили?',
    percentilesDescription: `Перцентили — наиболее часто используемые показатели для оценки роста и развития детей. Значение перцентиля отражает относительную позицию в сравнении с детьми из контрольной группы — показывает какой процент детей из контрольной популяции того же пола и возраста имеет значение ниже измеренного у конкретного ребенка.

Например, трехлетний мальчик, рост которого находится на уровне 25-го перцентиля, имеет рост выше чем у 25% и ниже чем у 75% трехлетних мальчиков из контрольной популяции.`,
    
    // About Z-score
    zscoreTitle: 'Что такое z-score?',
    zscoreDescription: `Z-score показывает отклонение измеренного значения от среднего для контрольной популяции, делённое на стандартное отклонение для этой популяции. Z-score напрямую связаны с перцентилями и возможно преобразование z-score в перцентили и обратно.

В большинстве клинических ситуаций значения z-score от -2 до +2 считаются нормальными. Однако зачастую куда большее клиническое значение имеет не столько значение z-score конкретного измерения, сколько динамика его изменения с течением времени.`,
    
    // Calculation Description
    calculationTitle: 'Описание вычислений',
    calculationDescription1: `Вычисляются значения z-score и перцентили для оценки физического развития детей.

Значения z-score вычисляются исходя из значений L (коэффициент трансформации Бокса-Кокса к нормальности), M (медиана), S (коэффициент вариации стандартного показателя) по данным норм для оценки физического развития детей ВОЗ.

Значения перцентилей вычисляются из полученного значения z-score.`,
    calculationDescription2: `Значения z-score и перцентиля для длины тела или роста вычисляются на день жизни для детей младше 5 лет (до 1856-го дня жизни) и на месяц жизни для детей старше 5 лет (с 61-го по 228-й месяц жизни).

Значения z-score и перцентиля для массы тела вычисляются на день жизни для детей младше 5 лет (до 1856-го дня жизни) и на месяц жизни для детей старше 5 лет и младше 10 лет (с 61-го по 120-й месяц жизни).

Значения z-score и перцентиля для отношения массы тела к длине тела или росту вычисляются на день жизни для детей младше 5 лет (до 1856-го дня жизни) для детей с длиной тела или ростом от 45 см и до 110 см.

Значения z-score и перцентиля для окружности головы вычисляются на день жизни для детей младше 5 лет (до 1856-го дня жизни).`,
    
    // Terms of Use
    termsTitle: 'Правила использования и отказ от ответственности',
    termsContent: `ВАЖНО: ПОЖАЛУЙСТА, ВНИМАТЕЛЬНО ПРОЧИТАЙТЕ ДАННЫЕ УСЛОВИЯ ПЕРЕД ИСПОЛЬЗОВАНИЕМ ПРИЛОЖЕНИЯ

1. ИСКЛЮЧИТЕЛЬНО ОБРАЗОВАТЕЛЬНЫЕ ЦЕЛИ
Информация в данном приложении представлена исключительно в образовательных и информационных целях. Она не претендует на полноту, точность или актуальность.

2. НЕ ЯВЛЯЕТСЯ МЕДИЦИНСКОЙ КОНСУЛЬТАЦИЕЙ
Данное приложение НЕ предназначено для использования в качестве замены профессиональной медицинской консультации, диагностики или лечения. Всегда обращайтесь за советом к своему врачу или другому квалифицированному медицинскому специалисту по любым вопросам, касающимся здоровья вашего ребёнка или медицинского состояния.

3. НЕ СВЯЗАНО С ВОЗ
Данное приложение НЕ связано с Всемирной организацией здравоохранения (ВОЗ), НЕ одобрено ею и никаким образом официально не связано с ВОЗ или любыми её дочерними организациями. Стандарты роста ВОЗ, используемые в данном приложении, являются общедоступными справочными данными.

4. ОТСУТСТВИЕ ГАРАНТИЙ
Информация в данном приложении предоставляется «как есть» без каких-либо гарантий, явных или подразумеваемых, включая, но не ограничиваясь, подразумеваемыми гарантиями товарной пригодности, соответствия определённой цели или ненарушения прав.

5. ОГРАНИЧЕНИЕ ОТВЕТСТВЕННОСТИ
Ни при каких обстоятельствах разработчики, авторы или распространители данного приложения не несут ответственности за любые прямые, косвенные, случайные, особые, последующие или штрафные убытки, возникающие в результате использования или невозможности использования данного приложения или содержащейся в нём информации.

6. ОТВЕТСТВЕННОСТЬ ПОЛЬЗОВАТЕЛЯ
Используя данное приложение, вы признаёте и соглашаетесь с тем, что:
- Вы принимаете на себя полную ответственность за любые действия, предпринятые на основе предоставленной информации
- Вы не будете полагаться исключительно на данное приложение при принятии решений, касающихся здоровья
- Вы будете консультироваться с соответствующими медицинскими специалистами по вопросам здоровья
- Расчёты приложения основаны на стандартах роста ВОЗ и могут быть неприменимы ко всем популяциям или индивидуальным обстоятельствам

7. ОСВОБОЖДЕНИЕ ОТ ОТВЕТСТВЕННОСТИ
Вы соглашаетесь освободить разработчиков и распространителей данного приложения от любых претензий, убытков, потерь или расходов, возникающих в связи с использованием вами приложения.

8. ПРИНЯТИЕ УСЛОВИЙ
Используя данное приложение, вы подтверждаете своё согласие с данными условиями. Если вы не согласны с этими условиями, пожалуйста, не используйте данное приложение.`,
    
    accept: 'Принять',
    decline: 'Отклонить',
    
    // Validation
    pleaseEnterAllFields: 'Пожалуйста, заполните все обязательные поля',
    invalidDate: 'Неверная дата',
    invalidValue: 'Неверное значение',
    childTooOld: 'Ребёнок слишком взрослый для расчёта (макс. 19 лет)',
    
    // Clear
    clear: 'Очистить',
    history: 'История',
    noData: 'Данные отсутствуют',
    
    // BMI and interpretation
    bmi: 'ИМТ',
    interpretation: 'Интерпретация',
    normal: 'Норма',
    attention: 'Требует внимания',
    risk: 'Риск',
    childMeasurement: 'Ваш ребёнок',
    headCircOptional: 'Окружность головы (опционально)',
    
    // BMI Categories (Перцентили)
    bmiForAge: 'ИМТ по возрасту',
    bmiPronouncedDeficit: 'Выраженный дефицит массы тела',
    bmiNormalWeight: 'Нормальная масса тела',
    bmiOverweightRisk: 'Риск избыточной массы тела',
    bmiUnderweight: 'Дефицит массы тела',
    bmiHealthy: 'Нормальный вес',
    bmiOverweight: 'Избыточный вес',
    bmiObesity: 'Ожирение',
    bmiSevereObesity: 'Тяжёлое ожирение',
    bmiAvailableFrom2: 'ИМТ по возрасту рассчитывается для детей от 5 до 19 лет',
  },
  es: {
    // Language Selection
    selectLanguage: 'Seleccionar idioma',
    
    // Navigation
    home: 'Inicio',
    charts: 'Gráficos',
    settings: 'Ajustes',
    
    // Main Screen
    physicalDevelopment: 'DESARROLLO FÍSICO',
    birthDate: 'Fecha de nacimiento',
    measurementDate: 'Fecha de medición',
    gender: 'Sexo',
    male: 'Masculino',
    female: 'Femenino',
    height: 'Estatura',
    weight: 'Peso',
    headCircumference: 'Circunferencia cefálica',
    calculate: 'Calcular',
    
    // Results
    bodyLength: 'Longitud corporal',
    bodyWeight: 'Peso corporal',
    weightToLength: 'Peso para la longitud',
    headCirc: 'Circunferencia cefálica',
    zscore: 'puntuación z',
    percentile: 'percentil',
    age: 'Edad',
    years: 'años',
    months: 'meses',
    weeks: 'semanas',
    days: 'días',
    
    // Units
    cm: 'cm',
    kg: 'kg',
    inches: 'pulg',
    pounds: 'lb',
    feet: 'pie',
    ft: 'pie',
    in: 'pulg',
    
    // Settings
    language: 'Idioma',
    measurementUnits: 'Unidades de medida',
    metric: 'Métrico',
    metricUnits: '(cm, kg)',
    imperial: 'Imperial',
    imperialUnits: '(pulg, lb)',
    aboutPercentiles: 'Sobre percentiles',
    aboutZscore: 'Sobre puntuación z',
    calculationDescription: 'Descripción del cálculo',
    termsOfUse: 'Términos de uso',
    
    // Charts
    growthCharts: 'Curvas de crecimiento',
    heightForAge: 'Estatura para la edad',
    weightForAge: 'Peso para la edad',
    headCircForAge: 'Circunferencia cefálica para la edad',
    weightForHeight: 'Peso para la estatura',
    yourChild: 'Su hijo/a',
    median: 'Mediana',
    
    // About Percentiles
    percentilesTitle: '¿Qué son los percentiles?',
    percentilesDescription: `Los percentiles son los indicadores más utilizados para evaluar el crecimiento y desarrollo infantil. Un valor de percentil refleja una posición relativa en comparación con niños del grupo de control: muestra qué porcentaje de niños del mismo sexo y edad en la población de control tiene un valor inferior al medido en un niño específico.

Por ejemplo, un niño de tres años cuya estatura está en el percentil 25 es más alto que el 25% y más bajo que el 75% de los niños de tres años en la población de control.`,
    
    // About Z-score
    zscoreTitle: '¿Qué es la puntuación z?',
    zscoreDescription: `La puntuación z muestra la desviación del valor medido respecto a la media de la población de control, dividida por la desviación estándar de esa población. Las puntuaciones z están directamente relacionadas con los percentiles, y es posible convertir puntuaciones z a percentiles y viceversa.

En la mayoría de las situaciones clínicas, los valores de puntuación z de -2 a +2 se consideran normales. Sin embargo, a menudo la importancia clínica no radica tanto en el valor de la puntuación z de una medición específica, sino en la dinámica de su cambio a lo largo del tiempo.`,
    
    // Calculation Description
    calculationTitle: 'Descripción del cálculo',
    calculationDescription1: `Se calculan los valores de puntuación z y percentiles para evaluar el desarrollo físico de los niños.

Los valores de puntuación z se calculan basándose en los valores L (coeficiente de transformación de Box-Cox a normalidad), M (mediana), S (coeficiente de variación del indicador estándar) según los estándares de crecimiento infantil de la OMS.

Los valores de percentil se calculan a partir del valor de puntuación z obtenido.`,
    calculationDescription2: `Los valores de puntuación z y percentil para la longitud o estatura corporal se calculan por día de vida para niños menores de 5 años (hasta el día 1856) y por mes de vida para niños mayores de 5 años (del mes 61 al 228).

Los valores de puntuación z y percentil para el peso corporal se calculan por día de vida para niños menores de 5 años (hasta el día 1856) y por mes de vida para niños mayores de 5 años y menores de 10 años (del mes 61 al 120).

Los valores de puntuación z y percentil para la relación peso/longitud corporal se calculan por día de vida para niños menores de 5 años (hasta el día 1856) con longitud corporal de 45 cm a 110 cm.

Los valores de puntuación z y percentil para la circunferencia cefálica se calculan por día de vida para niños menores de 5 años (hasta el día 1856).`,
    
    // Terms of Use
    termsTitle: 'Términos de uso y exención de responsabilidad',
    termsContent: `IMPORTANTE: LEA ATENTAMENTE ESTOS TÉRMINOS ANTES DE USAR ESTA APLICACIÓN

1. SOLO CON FINES EDUCATIVOS
La información proporcionada en esta aplicación se presenta únicamente con fines educativos e informativos. No pretende ser completa, precisa o actualizada.

2. NO ES CONSEJO MÉDICO
Esta aplicación NO está destinada a ser utilizada como, y NO debe usarse como, sustituto del consejo médico profesional, diagnóstico o tratamiento. Siempre consulte a su médico u otro profesional de salud calificado con cualquier pregunta que pueda tener sobre la salud de su hijo o una condición médica.

3. SIN AFILIACIÓN CON LA OMS
Esta aplicación NO está afiliada, respaldada ni conectada oficialmente de ninguna manera con la Organización Mundial de la Salud (OMS) ni con ninguna de sus subsidiarias o afiliadas. Los estándares de crecimiento de la OMS utilizados en esta aplicación son datos de referencia de acceso público.

4. SIN GARANTÍA
La información en esta aplicación se proporciona "tal cual" sin garantía de ningún tipo, ya sea expresa o implícita, incluyendo pero no limitado a las garantías implícitas de comerciabilidad, idoneidad para un propósito particular o no infracción.

5. LIMITACIÓN DE RESPONSABILIDAD
Bajo ninguna circunstancia los desarrolladores, autores o distribuidores de esta aplicación serán responsables de cualquier daño directo, indirecto, incidental, especial, consecuente o ejemplar derivado del uso o la imposibilidad de usar esta aplicación o la información contenida en ella.

6. RESPONSABILIDAD DEL USUARIO
Al usar esta aplicación, usted reconoce y acepta que:
- Asume toda la responsabilidad por cualquier acción tomada basada en la información proporcionada
- No confiará únicamente en esta aplicación para decisiones de atención médica
- Consultará a profesionales médicos apropiados para problemas relacionados con la salud
- Los cálculos de la aplicación se basan en los estándares de crecimiento de la OMS y pueden no aplicarse a todas las poblaciones o circunstancias individuales

7. INDEMNIZACIÓN
Usted acepta indemnizar, defender y mantener indemnes a los desarrolladores y distribuidores de esta aplicación de cualquier reclamo, daño, pérdida o gasto derivado de su uso de la aplicación.

8. ACEPTACIÓN DE LOS TÉRMINOS
Al usar esta aplicación, usted acepta estos términos. Si no está de acuerdo con estos términos, no use esta aplicación.`,
    
    accept: 'Aceptar',
    decline: 'Rechazar',
    
    // Validation
    pleaseEnterAllFields: 'Por favor complete todos los campos requeridos',
    invalidDate: 'Fecha inválida',
    invalidValue: 'Valor inválido',
    childTooOld: 'El niño es demasiado mayor para este cálculo (máx. 19 años)',
    
    // Clear
    clear: 'Borrar',
    history: 'Historial',
    noData: 'Sin datos disponibles',
    
    // BMI and interpretation
    bmi: 'IMC',
    interpretation: 'Interpretación',
    normal: 'Normal',
    attention: 'Requiere atención',
    risk: 'Riesgo',
    childMeasurement: 'Su hijo/a',
    headCircOptional: 'Circunferencia cefálica (opcional)',
    
    // BMI Categories (Percentiles)
    bmiForAge: 'IMC para la edad',
    bmiPronouncedDeficit: 'Déficit de peso pronunciado',
    bmiNormalWeight: 'Peso normal',
    bmiOverweightRisk: 'Riesgo de sobrepeso',
    bmiUnderweight: 'Bajo peso',
    bmiHealthy: 'Peso saludable',
    bmiOverweight: 'Sobrepeso',
    bmiObesity: 'Obesidad',
    bmiSevereObesity: 'Obesidad severa',
    bmiAvailableFrom2: 'El IMC para la edad se calcula para niños de 5 a 19 años',
  },
};

export type Language = 'en' | 'ru' | 'es';
export type TranslationKey = keyof typeof translations.en;
