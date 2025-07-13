# Velkalista - Debt Listing Mobile App

A modern, offline-capable debt listing application built with React Native. Velkalista allows you to track debts, manage payments, and keep all your financial records locally on your device.

## Features

- 📱 **Mobile-First Design** - Optimized for Android with responsive UI
- 🔵 **Modern Blue Theme** - Clean, professional blue and white color scheme
- 📴 **Offline Functionality** - Works completely offline, no internet required
- 🔍 **Search & Filter** - Quickly find specific debts
- 📊 **Status Tracking** - Mark debts as pending or paid
- 📞 **Contact Integration** - Call debtors directly from the app
- 💾 **Local Storage** - All data stored securely on your device
- 🔄 **Pull to Refresh** - Easy data refresh with swipe gesture
- 🌍 **Multilingual Support** - 5 languages: Finnish, English, Swedish, Russian, Japanese

## Screenshots

- **Home Screen**: List all debts with search functionality
- **Add Debt**: Simple form to add new debt entries
- **Debt Details**: View and edit individual debt information
- **Settings**: Language switching and app information

## Installation

### Prerequisites

- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Android SDK

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install React Native CLI globally:**
   ```bash
   npm install -g @react-native-community/cli
   ```

3. **Start Metro bundler:**
   ```bash
   npm start
   ```

4. **Run on Android:**
   ```bash
   npm run android
   ```

## Project Structure

```
velkalista/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js      # Main debt list
│   │   ├── AddDebtScreen.js   # Add new debt form
│   │   ├── DebtDetailScreen.js # View/edit debt details
│   │   └── SettingsScreen.js  # Language settings
│   ├── translations/
│   │   ├── fi.js             # Finnish translations
│   │   ├── en.js             # English translations
│   │   ├── sv.js             # Swedish translations
│   │   ├── ru.js             # Russian translations
│   │   └── ja.js             # Japanese translations
│   ├── utils/
│   │   └── i18n.js           # Internationalization utility
│   └── App.js                # Main app component
├── index.js                   # App entry point
├── app.json                   # App configuration
├── metro.config.js           # Metro bundler config
├── babel.config.js           # Babel configuration
└── package.json              # Dependencies and scripts
```

## Data Structure

Each debt entry contains:
- **id**: Unique identifier
- **name**: Person's name
- **amount**: Debt amount (number)
- **description**: Purpose of the debt
- **date**: Date of the debt
- **status**: 'pending' or 'paid'
- **phone**: Contact number (optional)
- **createdAt**: Timestamp when created

## Offline Storage

The app uses React Native's AsyncStorage to save all data locally on the device. No internet connection is required for any functionality.

## Language Support

Velkalista supports 5 languages with full localization:

### 🌍 **Supported Languages**

- **Finnish (Suomi)**: Default language with complete translation
- **English**: Full English translation
- **Swedish (Svenska)**: Complete Swedish translation
- **Russian (Русский)**: Full Russian translation with Cyrillic support
- **Japanese (日本語)**: Complete Japanese translation with Kanji support

### 🔧 **Language Features**

- **Language Switching**: Change language via Settings screen (gear icon in header)
- **Localized Sample Data**: Sample names and descriptions in each language
- **Currency Symbols**: € (Finnish), $ (English), kr (Swedish), ₽ (Russian), ¥ (Japanese)
- **Date Formatting**: Proper date formatting for each locale
- **Phone Number Formats**: Country-specific phone number formats

### 📱 **Sample Data by Language**

- **Finnish**: Matti Meikäläinen, Liisa Virtanen
- **English**: John Doe, Jane Smith
- **Swedish**: Erik Andersson, Anna Lindberg
- **Russian**: Иван Петров, Мария Сидорова
- **Japanese**: 田中太郎, 佐藤花子

## Development

### Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm test` - Run tests
- `npm run lint` - Run ESLint

### Building for Production

```bash
# Build Android APK
npm run build-android
```

## Technologies Used

- **React Native** - Cross-platform mobile development
- **React Navigation** - Screen navigation
- **React Native Paper** - Material Design components
- **AsyncStorage** - Local data persistence
- **Vector Icons** - Icon library
- **i18n** - Internationalization system

## Color Scheme

- **Primary Blue**: #2563eb
- **Accent Blue**: #1d4ed8
- **Background**: #ffffff
- **Surface**: #f8fafc
- **Text**: #1e293b
- **Secondary Text**: #64748b

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC License - see LICENSE file for details

## Support

For issues and feature requests, please create an issue in the repository. 