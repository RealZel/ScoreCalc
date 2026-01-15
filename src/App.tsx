import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet, StatusBar, View, Platform } from 'react-native';
import { HomeScreen, ChartsScreen, SettingsScreen, LanguageSelectionScreen } from './screens';
import { AppProvider, useApp } from './context/AppContext';

const Tab = createBottomTabNavigator();

const SafeAreaWrapper: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <View style={styles.safeArea}>
    <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
    {children}
  </View>
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
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
