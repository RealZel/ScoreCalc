import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations, Language, TranslationKey } from '../i18n/translations';
import { CalculationResult } from '../utils/calculations';

// Measurement data for charts
export interface MeasurementData {
  ageInMonths: number;
  lengthCm: number;
  weightKg: number;
  headCircCm?: number;
  gender: 'male' | 'female';
  result: CalculationResult;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isMetric: boolean;
  setIsMetric: (metric: boolean) => void;
  hasSelectedLanguage: boolean;
  setHasSelectedLanguage: (selected: boolean) => void;
  hasAcceptedTerms: boolean;
  setHasAcceptedTerms: (accepted: boolean) => void;
  t: (key: TranslationKey) => string;
  // New: store last measurement for charts
  lastMeasurement: MeasurementData | null;
  setLastMeasurement: (data: MeasurementData | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LANGUAGE: '@ScoreCalc:language',
  IS_METRIC: '@ScoreCalc:isMetric',
  HAS_SELECTED_LANGUAGE: '@ScoreCalc:hasSelectedLanguage',
  HAS_ACCEPTED_TERMS: '@ScoreCalc:hasAcceptedTerms',
};

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isMetric, setIsMetricState] = useState<boolean>(true);
  const [hasSelectedLanguage, setHasSelectedLanguageState] = useState<boolean>(false);
  const [hasAcceptedTerms, setHasAcceptedTermsState] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastMeasurement, setLastMeasurement] = useState<MeasurementData | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const [savedLang, savedMetric, savedLangSelected, savedTerms] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE),
        AsyncStorage.getItem(STORAGE_KEYS.IS_METRIC),
        AsyncStorage.getItem(STORAGE_KEYS.HAS_SELECTED_LANGUAGE),
        AsyncStorage.getItem(STORAGE_KEYS.HAS_ACCEPTED_TERMS),
      ]);

      if (savedLang) setLanguageState(savedLang as Language);
      if (savedMetric !== null) setIsMetricState(savedMetric === 'true');
      if (savedLangSelected !== null) setHasSelectedLanguageState(savedLangSelected === 'true');
      if (savedTerms !== null) setHasAcceptedTermsState(savedTerms === 'true');
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  };

  const setIsMetric = async (metric: boolean) => {
    setIsMetricState(metric);
    await AsyncStorage.setItem(STORAGE_KEYS.IS_METRIC, metric.toString());
  };

  const setHasSelectedLanguage = async (selected: boolean) => {
    setHasSelectedLanguageState(selected);
    await AsyncStorage.setItem(STORAGE_KEYS.HAS_SELECTED_LANGUAGE, selected.toString());
  };

  const setHasAcceptedTerms = async (accepted: boolean) => {
    setHasAcceptedTermsState(accepted);
    await AsyncStorage.setItem(STORAGE_KEYS.HAS_ACCEPTED_TERMS, accepted.toString());
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  if (isLoading) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        isMetric,
        setIsMetric,
        hasSelectedLanguage,
        setHasSelectedLanguage,
        hasAcceptedTerms,
        setHasAcceptedTerms,
        t,
        lastMeasurement,
        setLastMeasurement,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
