import AsyncStorage from '@react-native-async-storage/async-storage';
import en from '../translations/en';
import fi from '../translations/fi';
import sv from '../translations/sv';
import ru from '../translations/ru';
import ja from '../translations/ja';

const translations = {
  en,
  fi,
  sv,
  ru,
  ja,
};

class I18n {
  constructor() {
    this.currentLanguage = 'fi'; // Default to Finnish
    this.translations = translations;
  }

  async init() {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage && this.translations[savedLanguage]) {
        this.currentLanguage = savedLanguage;
      }
    } catch (error) {
      console.error('Error loading language preference:', error);
    }
  }

  async setLanguage(language) {
    if (this.translations[language]) {
      this.currentLanguage = language;
      try {
        await AsyncStorage.setItem('language', language);
      } catch (error) {
        console.error('Error saving language preference:', error);
      }
    }
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  getAvailableLanguages() {
    return Object.keys(this.translations).map(code => ({
      code,
      name: this.getLanguageName(code),
    }));
  }

  getLanguageName(code) {
    const names = {
      en: 'English',
      fi: 'Suomi',
      sv: 'Svenska',
      ru: 'Русский',
      ja: '日本語',
    };
    return names[code] || code;
  }

  t(key, params = {}) {
    const translation = this.translations[this.currentLanguage]?.[key] || 
                      this.translations.en[key] || 
                      key;
    
    // Simple parameter replacement
    return translation.replace(/\{(\w+)\}/g, (match, param) => {
      return params[param] || match;
    });
  }

  // Format currency based on current language
  formatCurrency(amount) {
    const currency = this.t('currency');
    return `${currency}${amount.toFixed(2)}`;
  }

  // Format date based on current language
  formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const localeMap = {
      fi: 'fi-FI',
      sv: 'sv-SE',
      ru: 'ru-RU',
      ja: 'ja-JP',
      en: 'en-US',
    };

    const locale = localeMap[this.currentLanguage] || 'en-US';
    return date.toLocaleDateString(locale, options);
  }
}

export default new I18n(); 