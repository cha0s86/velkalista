import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Card,
  Title,
  List,
  Switch,
  Divider,
  Text,
  Button,
} from 'react-native-paper';
import i18n from '../utils/i18n';

const SettingsScreen = ({ navigation }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fi');

  useEffect(() => {
    setCurrentLanguage(i18n.getCurrentLanguage());
  }, []);

  const handleLanguageChange = async (language) => {
    await i18n.setLanguage(language);
    setCurrentLanguage(language);
  };

  const availableLanguages = i18n.getAvailableLanguages();

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Asetukset</Title>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Kieli / Language / Språk / Язык / 言語</Text>
            
            {availableLanguages.map((lang) => (
              <List.Item
                key={lang.code}
                title={lang.name}
                description={getLanguageDescription(lang.code)}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon={currentLanguage === lang.code ? 'check-circle' : 'circle-outline'}
                    color={currentLanguage === lang.code ? '#2563eb' : '#64748b'}
                  />
                )}
                onPress={() => handleLanguageChange(lang.code)}
                style={[
                  styles.languageItem,
                  currentLanguage === lang.code && styles.selectedLanguage
                ]}
              />
            ))}
          </View>

          <Divider style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tietoja sovelluksesta</Text>
            <Text style={styles.appInfo}>
              Velkalista v1.0.0{'\n'}
              Offline debt listing app{'\n'}
              Kaikki tiedot tallennetaan paikallisesti laitteelle.{'\n'}
              Supports: Suomi, English, Svenska, Русский, 日本語
            </Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const getLanguageDescription = (code) => {
  const descriptions = {
    fi: 'Suomi (Finnish)',
    en: 'English',
    sv: 'Svenska (Swedish)',
    ru: 'Русский (Russian)',
    ja: '日本語 (Japanese)',
  };
  return descriptions[code] || code;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  card: {
    margin: 16,
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#1e293b',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  languageItem: {
    borderRadius: 8,
    marginBottom: 4,
  },
  selectedLanguage: {
    backgroundColor: '#f1f5f9',
  },
  divider: {
    marginVertical: 16,
  },
  appInfo: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});

export default SettingsScreen; 