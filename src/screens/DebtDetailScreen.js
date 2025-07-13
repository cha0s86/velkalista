import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Chip,
  Text,
  Divider,
  IconButton,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../utils/i18n';

const DebtDetailScreen = ({ route, navigation }) => {
  const { debt } = route.params;
  const [currentDebt, setCurrentDebt] = useState(debt);

  const getStatusColor = (status) => {
    return status === 'paid' ? '#10b981' : '#f59e0b';
  };

  const getStatusIcon = (status) => {
    return status === 'paid' ? 'check-circle' : 'clock';
  };

  const toggleStatus = async () => {
    const newStatus = currentDebt.status === 'paid' ? 'pending' : 'paid';
    const updatedDebt = { ...currentDebt, status: newStatus };

    try {
      // Load all debts
      const storedDebts = await AsyncStorage.getItem('debts');
      const allDebts = JSON.parse(storedDebts);
      
      // Update the specific debt
      const updatedDebts = allDebts.map(d => 
        d.id === currentDebt.id ? updatedDebt : d
      );
      
      // Save back to storage
      await AsyncStorage.setItem('debts', JSON.stringify(updatedDebts));
      setCurrentDebt(updatedDebt);
      
      Alert.alert(
        i18n.t('statusUpdated'),
        `${i18n.t('debtMarkedAs')} ${i18n.t(newStatus)}`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error updating debt status:', error);
      Alert.alert(i18n.t('error'), i18n.t('failedToUpdateStatus'));
    }
  };

  const deleteDebt = () => {
    Alert.alert(
      i18n.t('deleteDebt'),
      i18n.t('sureDeleteDebt'),
      [
        { text: i18n.t('cancel'), style: 'cancel' },
        {
          text: i18n.t('delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              const storedDebts = await AsyncStorage.getItem('debts');
              const allDebts = JSON.parse(storedDebts);
              const updatedDebts = allDebts.filter(d => d.id !== currentDebt.id);
              await AsyncStorage.setItem('debts', JSON.stringify(updatedDebts));
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting debt:', error);
              Alert.alert(i18n.t('error'), i18n.t('failedToDeleteDebt'));
            }
          },
        },
      ]
    );
  };

  const callPerson = () => {
    if (currentDebt.phone) {
      Linking.openURL(`tel:${currentDebt.phone}`);
    } else {
      Alert.alert(i18n.t('error'), i18n.t('noPhoneNumber'));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <Title style={styles.name}>{currentDebt.name}</Title>
            <Chip
              mode="outlined"
              textStyle={{ color: getStatusColor(currentDebt.status) }}
              style={[styles.statusChip, { borderColor: getStatusColor(currentDebt.status) }]}
              icon={getStatusIcon(currentDebt.status)}
            >
              {i18n.t(currentDebt.status)}
            </Chip>
          </View>

          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>{i18n.t('amountLabel')}</Text>
            <Text style={styles.amount}>{i18n.formatCurrency(currentDebt.amount)}</Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{i18n.t('descriptionLabel')}</Text>
            <Text style={styles.description}>{currentDebt.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{i18n.t('dateLabel')}</Text>
            <Text style={styles.date}>{i18n.formatDate(currentDebt.date)}</Text>
          </View>

          {currentDebt.phone && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{i18n.t('phoneNumberLabel')}</Text>
              <Text style={styles.phone}>{currentDebt.phone}</Text>
            </View>
          )}

          {currentDebt.createdAt && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{i18n.t('createdLabel')}</Text>
              <Text style={styles.createdAt}>{i18n.formatDate(currentDebt.createdAt)}</Text>
            </View>
          )}
        </Card.Content>
      </Card>

      <View style={styles.actionButtons}>
        <Button
          mode="contained"
          onPress={toggleStatus}
          style={[styles.actionButton, styles.statusButton]}
          icon={getStatusIcon(currentDebt.status)}
        >
          {currentDebt.status === 'paid' ? i18n.t('markAsPending') : i18n.t('markAsPaid')}
        </Button>

        {currentDebt.phone && (
          <Button
            mode="outlined"
            onPress={callPerson}
            style={styles.actionButton}
            icon="phone"
          >
            {i18n.t('call')}
          </Button>
        )}

        <Button
          mode="outlined"
          onPress={deleteDebt}
          style={[styles.actionButton, styles.deleteButton]}
          icon="delete"
          textColor="#ef4444"
        >
          {i18n.t('delete')}
        </Button>
      </View>
    </ScrollView>
  );
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    color: '#1e293b',
    flex: 1,
  },
  statusChip: {
    backgroundColor: 'transparent',
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  amountLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  divider: {
    marginVertical: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#64748b',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 16,
    color: '#1e293b',
    lineHeight: 24,
  },
  date: {
    fontSize: 16,
    color: '#1e293b',
  },
  phone: {
    fontSize: 16,
    color: '#2563eb',
  },
  createdAt: {
    fontSize: 14,
    color: '#94a3b8',
  },
  actionButtons: {
    padding: 16,
    gap: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
  statusButton: {
    backgroundColor: '#2563eb',
  },
  deleteButton: {
    borderColor: '#ef4444',
  },
});

export default DebtDetailScreen; 