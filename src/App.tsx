import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { HomeScreen, ChartsScreen, SettingsScreen, LanguageSelectionScreen } from './screens';
import { AppProvider, useApp } from './context/AppContext';

const Tab = createBottomTabNavigator();

const SafeAreaWrapper: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
    <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
    {children}
  </SafeAreaView>
);

const HomeScreenWrapper = () => <SafeAreaWrapper><HomeScreen /></SafeAreaWrapper>;
const ChartsScreenWrapper = () => <SafeAreaWrapper><ChartsScreen /></SafeAreaWrapper>;
const SettingsScreenWrapper = () => <SafeAreaWrapper><SettingsScreen /></SafeAreaWrapper>;

function TabNavigator() {
  const { t, language } = useApp();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4A90D9',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreenWrapper}
        options={{
          tabBarLabel: t('home'),
          tabBarIcon: ({ color, size }) => (
            <Text style={[styles.tabIcon, { color }]}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Charts"
        component={ChartsScreenWrapper}
        options={{
          tabBarLabel: t('charts'),
          tabBarIcon: ({ color, size }) => (
            <Text style={[styles.tabIcon, { color }]}>📊</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreenWrapper}
        options={{
          tabBarLabel: t('settings'),
          tabBarIcon: ({ color, size }) => (
            <Text style={[styles.tabIcon, { color }]}>⚙️</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AppContent() {
  const { hasSelectedLanguage } = useApp();

  if (!hasSelectedLanguage) {
    return <LanguageSelectionScreen />;
  }

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  tabIcon: {
    fontSize: 22,
  },
});
