import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useApp, MeasurementData } from '../context/AppContext';
import { calculateChildGrowth, CalculationResult } from '../utils/calculations';

export function HomeScreen() {
  const { t, isMetric, language, setLastMeasurement } = useApp();
  
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [measurementDate, setMeasurementDate] = useState<Date>(new Date());
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState<string>('');
  const [heightFeet, setHeightFeet] = useState<string>('');
  const [heightInches, setHeightInches] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [headCirc, setHeadCirc] = useState<string>('');
  const [headCircFeet, setHeadCircFeet] = useState<string>('');
  const [headCircInches, setHeadCircInches] = useState<string>('');
  
  const [showBirthDatePicker, setShowBirthDatePicker] = useState(false);
  const [showMeasurementDatePicker, setShowMeasurementDatePicker] = useState(false);
  
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [inputHeightCm, setInputHeightCm] = useState<number>(0);
  const [inputWeightKg, setInputWeightKg] = useState<number>(0);
  const [inputHeadCircCm, setInputHeadCircCm] = useState<number>(0);

  const convertToMetric = useCallback((value: string, feet: string, type: 'height' | 'weight' | 'headCirc'): number => {
    if (isMetric) {
      const numValue = parseFloat(value);
      return isNaN(numValue) ? 0 : numValue;
    }
    
    // Convert from imperial to metric
    if (type === 'height') {
      const feetValue = parseFloat(feet) || 0;
      const inchesValue = parseFloat(value) || 0;
      const totalInches = feetValue * 12 + inchesValue;
      return totalInches * 2.54; // inches to cm
    } else if (type === 'headCirc') {
      // Head circumference: only inches to cm
      const numValue = parseFloat(value);
      return isNaN(numValue) ? 0 : numValue * 2.54;
    } else {
      const numValue = parseFloat(value);
      return isNaN(numValue) ? 0 : numValue * 0.453592; // pounds to kg
    }
  }, [isMetric]);

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Calculate exact age using calendar months
  const calculateAge = (birthDate: Date, measurementDate: Date): string => {
    if (measurementDate < birthDate) return '';
    
    let years = measurementDate.getFullYear() - birthDate.getFullYear();
    let months = measurementDate.getMonth() - birthDate.getMonth();
    let days = measurementDate.getDate() - birthDate.getDate();
    
    // Adjust for negative days
    if (days < 0) {
      months--;
      // Get days in the previous month
      const prevMonth = new Date(measurementDate.getFullYear(), measurementDate.getMonth(), 0);
      days += prevMonth.getDate();
    }
    
    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }
    
    const parts = [];
    if (years > 0) parts.push(`${years} ${t('years')}`);
    if (months > 0) parts.push(`${months} ${t('months')}`);
    if (days > 0 || parts.length === 0) parts.push(`${days} ${t('days')}`);
    
    return parts.join(' ');
  };
  
  // Calculate total months for display in results
  const calculateTotalMonths = (birthDate: Date, measurementDate: Date): number => {
    let years = measurementDate.getFullYear() - birthDate.getFullYear();
    let months = measurementDate.getMonth() - birthDate.getMonth();
    let days = measurementDate.getDate() - birthDate.getDate();
    
    if (days < 0) {
      months--;
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    
    return years * 12 + months;
  };

  const handleCalculate = () => {
    // Height and weight are required, head circumference is optional (not used after 2 years)
    if (isMetric) {
      if (!height || !weight) {
        Alert.alert('', t('pleaseEnterAllFields'));
        return;
      }
    } else {
      if (!heightFeet || !weight) {
        Alert.alert('', t('pleaseEnterAllFields'));
        return;
      }
    }
    
    const heightCm = convertToMetric(isMetric ? height : heightInches, heightFeet, 'height');
    const weightKg = convertToMetric(weight, '', 'weight');
    // Head circumference is optional - only convert if provided
    const headCircValue = isMetric ? headCirc : headCircInches;
    const headCircCm = headCircValue ? convertToMetric(headCircValue, '', 'headCirc') : 0;
    
    if (heightCm <= 0 || weightKg <= 0) {
      Alert.alert('', t('invalidValue'));
      return;
    }
    
    const ageInDays = Math.floor((measurementDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
    if (ageInDays > 6935) { // ~19 years
      Alert.alert('', t('childTooOld'));
      return;
    }
    
    if (ageInDays < 0) {
      Alert.alert('', t('invalidDate'));
      return;
    }
    
    const calculationResult = calculateChildGrowth(
      birthDate,
      measurementDate,
      gender,
      heightCm,
      weightKg,
      headCircCm
    );
    
    setInputHeightCm(heightCm);
    setInputWeightKg(weightKg);
    setInputHeadCircCm(headCircCm);
    setResult(calculationResult);
    
    // Save measurement for charts
    const measurementData: MeasurementData = {
      ageInMonths: calculationResult.ageInMonths,
      lengthCm: heightCm,
      weightKg: weightKg,
      headCircCm: headCircCm > 0 ? headCircCm : undefined,
      gender: gender,
      result: calculationResult,
    };
    setLastMeasurement(measurementData);
  };

  const handleClear = () => {
    setHeight('');
    setHeightFeet('');
    setHeightInches('');
    setWeight('');
    setHeadCirc('');
    setHeadCircFeet('');
    setHeadCircInches('');
    setResult(null);
    setLastMeasurement(null);
  };

  const formatZScore = (zscore: number | undefined): string => {
    if (zscore === undefined) return '-';
    return zscore.toFixed(2);
  };

  const formatPercentile = (percentile: number | undefined): string => {
    if (percentile === undefined) return '-';
    return percentile.toFixed(1);
  };

  const formatHeight = (heightCm: number): string => {
    if (isMetric) {
      return `${heightCm.toFixed(1)} ${t('cm')}`;
    } else {
      const totalInches = heightCm / 2.54;
      const feet = Math.floor(totalInches / 12);
      const inches = (totalInches % 12).toFixed(1);
      return `${feet} ${t('ft')} ${inches} ${t('in')}`;
    }
  };

  const formatWeight = (weightKg: number): string => {
    if (isMetric) {
      return `${weightKg.toFixed(2)} ${t('kg')}`;
    } else {
      const pounds = (weightKg / 0.453592).toFixed(1);
      return `${pounds} ${t('pounds')}`;
    }
  };

  const formatHeadCirc = (headCircCm: number): string => {
    if (isMetric) {
      return `${headCircCm.toFixed(1)} ${t('cm')}`;
    } else {
      const inches = (headCircCm / 2.54).toFixed(1);
      return `${inches} ${t('in')}`;
    }
  };

  const heightUnit = isMetric ? t('cm') : t('inches');
  const weightUnit = isMetric ? t('kg') : t('pounds');

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Text style={styles.pageTitle}>
            {language === 'ru' ? 'Калькулятор физического развития детей' : 'Growth Calculator'}
          </Text>

          {/* Date inputs */}
          <View style={styles.section}>
            <View style={styles.dateRow}>
              <View style={styles.dateField}>
                <Text style={styles.label}>{t('birthDate')}</Text>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowBirthDatePicker(true)}
                >
                  <Text style={styles.dateText}>{formatDate(birthDate)}</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.dateField}>
                <Text style={styles.label}>{t('measurementDate')}</Text>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowMeasurementDatePicker(true)}
                >
                  <Text style={styles.dateText}>{formatDate(measurementDate)}</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {birthDate < measurementDate && (
              <Text style={styles.ageText}>
                {t('age')}: {calculateAge(birthDate, measurementDate)}
              </Text>
            )}
          </View>

          {/* Gender selection */}
          <View style={styles.section}>
            <Text style={styles.label}>{t('gender')}</Text>
            <View style={styles.genderRow}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender === 'male' && styles.genderButtonActive,
                ]}
                onPress={() => setGender('male')}
              >
                <Text style={styles.genderIcon}>👦</Text>
                <Text style={[
                  styles.genderText,
                  gender === 'male' && styles.genderTextActive,
                ]}>
                  {t('male')}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender === 'female' && styles.genderButtonActive,
                ]}
                onPress={() => setGender('female')}
              >
                <Text style={styles.genderIcon}>👧</Text>
                <Text style={[
                  styles.genderText,
                  gender === 'female' && styles.genderTextActive,
                ]}>
                  {t('female')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Measurements */}
          <View style={styles.section}>
            <View style={styles.measurementRow}>
              <View style={styles.measurementField}>
                <Text style={styles.label}>{t('height')}</Text>
                {isMetric ? (
                  <View style={styles.singleInputContainer}>
                    <TextInput
                      style={styles.input}
                      value={height}
                      onChangeText={setHeight}
                      keyboardType="decimal-pad"
                      placeholder="55"
                      placeholderTextColor="#999"
                    />
                    <Text style={styles.unitLabel}>{t('cm')}</Text>
                  </View>
                ) : (
                  <View style={styles.dualInputContainer}>
                    <View style={styles.dualInputField}>
                      <TextInput
                        style={styles.dualInput}
                        value={heightFeet}
                        onChangeText={setHeightFeet}
                        keyboardType="decimal-pad"
                        placeholder="1"
                        placeholderTextColor="#999"
                      />
                      <Text style={styles.unitLabel}>{t('ft')}</Text>
                    </View>
                    <View style={styles.dualInputField}>
                      <TextInput
                        style={styles.dualInput}
                        value={heightInches}
                        onChangeText={setHeightInches}
                        keyboardType="decimal-pad"
                        placeholder="9"
                        placeholderTextColor="#999"
                      />
                      <Text style={styles.unitLabel}>{t('in')}</Text>
                    </View>
                  </View>
                )}
              </View>
              
              <View style={styles.measurementField}>
                <Text style={styles.label}>{t('weight')}</Text>
                <View style={styles.singleInputContainer}>
                  <TextInput
                    style={styles.input}
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType="decimal-pad"
                    placeholder={isMetric ? "4.5" : "10"}
                    placeholderTextColor="#999"
                  />
                  <Text style={styles.unitLabel}>{isMetric ? t('kg') : t('pounds')}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.measurementFieldFull}>
              <Text style={styles.label}>{t('headCircOptional')}</Text>
              <View style={styles.singleInputContainer}>
                <TextInput
                  style={styles.input}
                  value={isMetric ? headCirc : headCircInches}
                  onChangeText={isMetric ? setHeadCirc : setHeadCircInches}
                  keyboardType="decimal-pad"
                  placeholder={isMetric ? "37.5" : "14.8"}
                  placeholderTextColor="#999"
                />
                <Text style={styles.unitLabel}>{isMetric ? t('cm') : t('in')}</Text>
              </View>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClear}
            >
              <Text style={styles.clearButtonText}>{t('clear')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.calculateButton}
              onPress={handleCalculate}
            >
              <Text style={styles.calculateButtonText}>{t('calculate')}</Text>
            </TouchableOpacity>
          </View>

          {/* Results */}
          {result && (
            <View style={styles.resultsSection}>
              <Text style={styles.resultsTitle}>{t('physicalDevelopment')}</Text>
              
              {/* Age display - use calendar-based calculation for accuracy */}
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>
                  {t('age')}: {calculateAge(birthDate, measurementDate)} ({result.ageInDays} {t('days')})
                </Text>
              </View>
              
              {result.lengthZScore !== undefined && (
                <View style={styles.resultRow}>
                  <View style={[styles.statusIndicator, { backgroundColor: result.lengthColor || '#388E3C' }]} />
                  <View style={styles.resultContent}>
                    <Text style={styles.resultLabel}>
                      {t('bodyLength')}: {formatHeight(inputHeightCm)}
                    </Text>
                    <Text style={styles.resultValue}>
                      Z: {formatZScore(result.lengthZScore)} | P: {formatPercentile(result.lengthPercentile)}%
                    </Text>
                  </View>
                </View>
              )}
              
              {result.weightZScore !== undefined && (
                <View style={styles.resultRow}>
                  <View style={[styles.statusIndicator, { backgroundColor: result.weightColor || '#388E3C' }]} />
                  <View style={styles.resultContent}>
                    <Text style={styles.resultLabel}>
                      {t('bodyWeight')}: {formatWeight(inputWeightKg)}
                    </Text>
                    <Text style={styles.resultValue}>
                      Z: {formatZScore(result.weightZScore)} | P: {formatPercentile(result.weightPercentile)}%
                    </Text>
                  </View>
                </View>
              )}
              
              {result.bmi !== undefined && (
                <View style={styles.resultRow}>
                  <View style={[styles.statusIndicator, { backgroundColor: result.bmiColor || '#388E3C' }]} />
                  <View style={styles.resultContent}>
                    <Text style={styles.resultLabel}>
                      {t('bmi')}: {result.bmi.toFixed(1)} kg/m²
                    </Text>
                    {result.bmiPercentile !== undefined ? (
                      <Text style={styles.resultValue}>
                        Z: {formatZScore(result.bmiZScore)} | P: {formatPercentile(result.bmiPercentile)}%
                        {result.bmiCategory && (
                          <Text style={{ color: result.bmiColor }}>
                            {' '}({result.bmiCategory === 'underweight' ? t('bmiUnderweight') :
                             result.bmiCategory === 'healthy' ? t('bmiHealthy') :
                             result.bmiCategory === 'overweight' ? t('bmiOverweight') :
                             result.bmiCategory === 'obesity' ? t('bmiObesity') :
                             t('bmiSevereObesity')})
                          </Text>
                        )}
                      </Text>
                    ) : (
                      <Text style={styles.resultNote}>{t('bmiAvailableFrom2')}</Text>
                    )}
                  </View>
                </View>
              )}
              
              {result.weightForLengthZScore !== undefined && (
                <View style={styles.resultRow}>
                  <View style={[styles.statusIndicator, { backgroundColor: result.weightForLengthColor || '#388E3C' }]} />
                  <View style={styles.resultContent}>
                    <Text style={styles.resultLabel}>{t('weightToLength')}</Text>
                    <Text style={styles.resultValue}>
                      Z: {formatZScore(result.weightForLengthZScore)} | P: {formatPercentile(result.weightForLengthPercentile)}%
                    </Text>
                  </View>
                </View>
              )}
              
              {result.headCircZScore !== undefined && (
                <View style={styles.resultRow}>
                  <View style={[styles.statusIndicator, { backgroundColor: result.headCircColor || '#388E3C' }]} />
                  <View style={styles.resultContent}>
                    <Text style={styles.resultLabel}>
                      {t('headCirc')}: {formatHeadCirc(inputHeadCircCm)}
                    </Text>
                    <Text style={styles.resultValue}>
                      Z: {formatZScore(result.headCircZScore)} | P: {formatPercentile(result.headCircPercentile)}%
                    </Text>
                  </View>
                </View>
              )}

              {/* Legend */}
              <View style={styles.legendContainer}>
                <Text style={styles.legendTitle}>{t('interpretation')}:</Text>
                <View style={styles.legendRow}>
                  <View style={[styles.legendDot, { backgroundColor: '#388E3C' }]} />
                  <Text style={styles.legendText}>{t('normal')} (Z: -2 to +2)</Text>
                </View>
                <View style={styles.legendRow}>
                  <View style={[styles.legendDot, { backgroundColor: '#F57C00' }]} />
                  <Text style={styles.legendText}>{t('attention')} (Z: -3 to -2 / +2 to +3)</Text>
                </View>
                <View style={styles.legendRow}>
                  <View style={[styles.legendDot, { backgroundColor: '#D32F2F' }]} />
                  <Text style={styles.legendText}>{t('risk')} (Z: &lt;-3 / &gt;+3)</Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Date Pickers */}
      <DatePicker
        modal
        open={showBirthDatePicker}
        date={birthDate}
        mode="date"
        locale={language}
        title={t('birthDate')}
        confirmText={language === 'ru' ? 'Подтвердить' : 'Confirm'}
        cancelText={language === 'ru' ? 'Отмена' : 'Cancel'}
        onConfirm={(date) => {
          setShowBirthDatePicker(false);
          setBirthDate(date);
        }}
        onCancel={() => setShowBirthDatePicker(false)}
      />

      <DatePicker
        modal
        open={showMeasurementDatePicker}
        date={measurementDate}
        mode="date"
        locale={language}
        title={t('measurementDate')}
        confirmText={language === 'ru' ? 'Подтвердить' : 'Confirm'}
        cancelText={language === 'ru' ? 'Отмена' : 'Cancel'}
        onConfirm={(date) => {
          setShowMeasurementDatePicker(false);
          setMeasurementDate(date);
        }}
        onCancel={() => setShowMeasurementDatePicker(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 12,
    paddingBottom: 16,
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 6,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateField: {
    flex: 1,
  },
  dateButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  ageText: {
    marginTop: 8,
    fontSize: 14,
    color: '#4A90D9',
    fontWeight: '500',
    textAlign: 'center',
  },
  genderRow: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    gap: 6,
  },
  genderButtonActive: {
    backgroundColor: '#4A90D9',
  },
  genderIcon: {
    fontSize: 20,
  },
  genderText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  genderTextActive: {
    color: '#FFFFFF',
  },
  measurementRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  measurementField: {
    flex: 1,
  },
  measurementFieldFull: {
    width: '100%',
  },
  singleInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dualInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dualInputField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dualInput: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  unitLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
    minWidth: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  calculateButton: {
    flex: 2,
    backgroundColor: '#4A90D9',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  calculateButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  resultsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  resultsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  statusIndicator: {
    width: 4,
    height: '100%',
    minHeight: 35,
    borderRadius: 2,
    marginRight: 10,
  },
  resultContent: {
    flex: 1,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  resultValue: {
    fontSize: 13,
    color: '#666',
  },
  resultNote: {
    fontSize: 11,
    color: '#999',
    fontStyle: 'italic',
  },
  legendContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  legendTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
});
