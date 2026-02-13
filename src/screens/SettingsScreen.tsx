import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { Language } from '../i18n/translations';

type InfoModal = 'percentiles' | 'zscore' | 'calculations' | 'terms' | null;

export function SettingsScreen() {
  const { t, language, setLanguage, isMetric, setIsMetric, setHasAcceptedTerms } = useApp();
  const [infoModal, setInfoModal] = useState<InfoModal>(null);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const renderInfoModal = () => {
    let title = '';
    let content = '';

    switch (infoModal) {
      case 'percentiles':
        title = t('percentilesTitle');
        content = t('percentilesDescription');
        break;
      case 'zscore':
        title = t('zscoreTitle');
        content = t('zscoreDescription');
        break;
      case 'calculations':
        title = t('calculationTitle');
        content = t('calculationDescription1') + '\n\n' + t('calculationDescription2');
        break;
      case 'terms':
        title = t('termsTitle');
        content = t('termsContent');
        break;
    }

    return (
      <Modal
        visible={infoModal !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setInfoModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{title}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setInfoModal(null)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              <Text style={styles.modalText}>{content}</Text>
            </ScrollView>
            
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setInfoModal(null)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('settings')}</Text>
        </View>

        {/* Language Setting */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('language')}</Text>
          <View style={styles.optionRow}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                language === 'en' && styles.optionButtonActive,
              ]}
              onPress={() => handleLanguageChange('en')}
            >
              <Text style={styles.optionIcon}>{"\uD83C\uDDFA\uD83C\uDDF8"}</Text>
              <Text style={[
                styles.optionText,
                language === 'en' && styles.optionTextActive,
              ]}>
                English
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.optionButton,
                language === 'ru' && styles.optionButtonActive,
              ]}
              onPress={() => handleLanguageChange('ru')}
            >
              <Text style={styles.optionIcon}>🇷🇺</Text>
              <Text style={[
                styles.optionText,
                language === 'ru' && styles.optionTextActive,
              ]}>
                Русский
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.optionButton,
                language === 'es' && styles.optionButtonActive,
              ]}
              onPress={() => handleLanguageChange('es')}
            >
              <Text style={styles.optionIcon}>🇪🇸</Text>
              <Text style={[
                styles.optionText,
                language === 'es' && styles.optionTextActive,
              ]}>
                Español
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Measurement Units */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('measurementUnits')}</Text>
          <View style={styles.optionRow}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                isMetric && styles.optionButtonActive,
              ]}
              onPress={() => setIsMetric(true)}
            >
              <Text style={styles.optionIcon}>📏</Text>
              <View style={styles.optionTextContainer}>
                <Text style={[
                  styles.optionText,
                  isMetric && styles.optionTextActive,
                ]}>
                  {t('metric')}
                </Text>
                <Text style={[
                  styles.optionSubtext,
                  isMetric && styles.optionTextActive,
                ]}>
                  {t('metricUnits')}
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.optionButton,
                !isMetric && styles.optionButtonActive,
              ]}
              onPress={() => setIsMetric(false)}
            >
              <Text style={styles.optionIcon}>📐</Text>
              <View style={styles.optionTextContainer}>
                <Text style={[
                  styles.optionText,
                  !isMetric && styles.optionTextActive,
                ]}>
                  {t('imperial')}
                </Text>
                <Text style={[
                  styles.optionSubtext,
                  !isMetric && styles.optionTextActive,
                ]}>
                  {t('imperialUnits')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ {language === 'ru' ? 'Информация' : 'Information'}</Text>
          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setInfoModal('percentiles')}
          >
            <Text style={styles.menuItemIcon}>📊</Text>
            <Text style={styles.menuItemText}>{t('aboutPercentiles')}</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setInfoModal('zscore')}
          >
            <Text style={styles.menuItemIcon}>📈</Text>
            <Text style={styles.menuItemText}>{t('aboutZscore')}</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setInfoModal('calculations')}
          >
            <Text style={styles.menuItemIcon}>🧮</Text>
            <Text style={styles.menuItemText}>{t('calculationDescription')}</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.menuItem, styles.menuItemLast]}
            onPress={() => setInfoModal('terms')}
          >
            <Text style={styles.menuItemIcon}>⚖️</Text>
            <Text style={styles.menuItemText}>{t('termsOfUse')}</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Version Info */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>ScoreCalc v1.0.0</Text>
          <Text style={styles.copyrightText}>
            {language === 'ru' 
              ? 'Данные основаны на стандартах роста ВОЗ'
              : 'Based on WHO Child Growth Standards'}
          </Text>
        </View>
      </ScrollView>

      {renderInfoModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  optionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    gap: 6,
  },
  optionButtonActive: {
    backgroundColor: '#4A90D9',
  },
  optionIcon: {
    fontSize: 20,
  },
  optionTextContainer: {
    alignItems: 'center',
  },
  optionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  optionSubtext: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  menuItemArrow: {
    fontSize: 24,
    color: '#CCC',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  versionText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: '#BBB',
    textAlign: 'center',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    flex: 1,
    paddingRight: 16,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  modalContent: {
    padding: 20,
    paddingBottom: 8,
    flexShrink: 1,
    flexGrow: 1,
  },
  modalText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
    paddingBottom: 16,
  },
  modalButton: {
    margin: 16,
    marginTop: 8,
    backgroundColor: '#4A90D9',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
