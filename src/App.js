import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, DefaultTheme, IconButton } from 'react-native-paper';
import { StatusBar } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import AddDebtScreen from './screens/AddDebtScreen';
import DebtDetailScreen from './screens/DebtDetailScreen';
import SettingsScreen from './screens/SettingsScreen';
import i18n from './utils/i18n';

const Stack = createStackNavigator();

// Custom blue theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2563eb', // Modern blue
    accent: '#1d4ed8',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
    placeholder: '#64748b',
    border: '#e2e8f0',
  },
};

const App = () => {
  useEffect(() => {
    i18n.init();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2563eb',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            cardStyle: { backgroundColor: '#ffffff' },
          }}>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={({ navigation }) => ({
              title: i18n.t('appTitle'),
              headerRight: () => (
                <IconButton
                  icon="cog"
                  iconColor="#ffffff"
                  onPress={() => navigation.navigate('Settings')}
                />
              ),
            })}
          />
          <Stack.Screen 
            name="AddDebt" 
            component={AddDebtScreen} 
            options={{ title: i18n.t('addDebt') }}
          />
          <Stack.Screen 
            name="DebtDetail" 
            component={DebtDetailScreen} 
            options={{ title: i18n.t('debtDetails') }}
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={{ title: 'Asetukset' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App; 