import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Card,
  Title,
  HelperText,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../utils/i18n';

const AddDebtScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const saveDebt = async () => {
    if (!name.trim() || !amount.trim() || !description.trim()) {
      Alert.alert(i18n.t('error'), i18n.t('pleaseFillAllFields'));
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      Alert.alert(i18n.t('error'), i18n.t('pleaseEnterValidAmount'));
      return;
    }

    setLoading(true);
    try {
      const newDebt = {
        id: Date.now().toString(),
        name: name.trim(),
        amount: amountValue,
        description: description.trim(),
        phone: phone.trim(),
        date: date || today,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      // Load existing debts
      const storedDebts = await AsyncStorage.getItem('debts');
      const existingDebts = storedDebts ? JSON.parse(storedDebts) : [];
      
      // Add new debt
      const updatedDebts = [...existingDebts, newDebt];
      
      // Save to storage
      await AsyncStorage.setItem('debts', JSON.stringify(updatedDebts));

      Alert.alert(
        i18n.t('success'),
        i18n.t('debtAddedSuccessfully'),
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error('Error saving debt:', error);
      Alert.alert(i18n.t('error'), i18n.t('failedToSaveDebt'));
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (text) => {
    // Remove non-numeric characters except decimal point
    const cleaned = text.replace(/[^0-9.]/g, '');
    // Ensure only one decimal point
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }
    return cleaned;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>{i18n.t('addNewDebt')}</Title>
            
            <TextInput
              label={i18n.t('personName')}
              value={name}
              onChangeText={setName}
              style={styles.input}
              mode="outlined"
              placeholder={i18n.t('enterPersonName')}
            />

            <TextInput
              label={i18n.t('amount')}
              value={amount}
              onChangeText={(text) => setAmount(formatAmount(text))}
              style={styles.input}
              mode="outlined"
              placeholder="0,00"
              keyboardType="numeric"
              left={<TextInput.Affix text={i18n.t('currency')} />}
            />

            <TextInput
              label={i18n.t('description')}
              value={description}
              onChangeText={setDescription}
              style={styles.input}
              mode="outlined"
              placeholder={i18n.t('whatIsThisDebtFor')}
              multiline
              numberOfLines={3}
            />

            <TextInput
              label={i18n.t('phoneNumber')}
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              mode="outlined"
              placeholder="+358401234567"
              keyboardType="phone-pad"
            />

            <TextInput
              label={i18n.t('date')}
              value={date}
              onChangeText={setDate}
              style={styles.input}
              mode="outlined"
              placeholder={today}
            />

            <HelperText type="info" style={styles.helperText}>
              {i18n.t('requiredFields')}
            </HelperText>

            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                onPress={() => navigation.goBack()}
                style={[styles.button, styles.cancelButton]}
                disabled={loading}
              >
                {i18n.t('cancel')}
              </Button>
              
              <Button
                mode="contained"
                onPress={saveDebt}
                style={[styles.button, styles.saveButton]}
                loading={loading}
                disabled={loading}
              >
                {i18n.t('saveDebt')}
              </Button>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    padding: 16,
  },
  card: {
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#1e293b',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  helperText: {
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    borderColor: '#64748b',
  },
  saveButton: {
    backgroundColor: '#2563eb',
  },
});

export default AddDebtScreen; 