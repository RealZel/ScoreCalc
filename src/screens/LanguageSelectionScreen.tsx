import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { Language } from '../i18n/translations';

export function LanguageSelectionScreen() {
  const { setLanguage, setHasSelectedLanguage, t } = useApp();

  const handleSelectLanguage = async (lang: Language) => {
    await setLanguage(lang);
    await setHasSelectedLanguage(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🌍</Text>
        </View>
        
        <Text style={styles.title}>{t('selectLanguage')}</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => handleSelectLanguage('en')}
          >
            <Text style={styles.flagEmoji}>{"\uD83C\uDDFA\uD83C\uDDF8"}</Text>
            <Text style={styles.buttonText}>English</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => handleSelectLanguage('ru')}
          >
            <Text style={styles.flagEmoji}>🇷🇺</Text>
            <Text style={styles.buttonText}>Русский</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => handleSelectLanguage('es')}
          >
            <Text style={styles.flagEmoji}>🇪🇸</Text>
            <Text style={styles.buttonText}>Español</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    marginBottom: 24,
  },
  icon: {
    fontSize: 64,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 48,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 12,
  },
  flagEmoji: {
    fontSize: 32,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
});
