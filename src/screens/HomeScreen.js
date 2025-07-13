import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import {
  FAB,
  Card,
  Title,
  Paragraph,
  Chip,
  Searchbar,
  Text,
  ActivityIndicator,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../utils/i18n';

const HomeScreen = ({ navigation }) => {
  const [debts, setDebts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDebts();
  }, []);

  const getSampleData = () => {
    const currentLang = i18n.getCurrentLanguage();
    
    const sampleData = {
      fi: [
        {
          id: '1',
          name: 'Matti Meikäläinen',
          amount: 1500,
          description: 'Laina autokorjauksen maksamiseen',
          date: '2024-01-15',
          status: 'pending',
          phone: '+358401234567',
        },
        {
          id: '2',
          name: 'Liisa Virtanen',
          amount: 800,
          description: 'Hätäapukulut',
          date: '2024-01-10',
          status: 'paid',
          phone: '+358401234568',
        },
      ],
      en: [
        {
          id: '1',
          name: 'John Doe',
          amount: 1500,
          description: 'Loan for car repair',
          date: '2024-01-15',
          status: 'pending',
          phone: '+1234567890',
        },
        {
          id: '2',
          name: 'Jane Smith',
          amount: 800,
          description: 'Emergency medical expenses',
          date: '2024-01-10',
          status: 'paid',
          phone: '+1234567891',
        },
      ],
      sv: [
        {
          id: '1',
          name: 'Erik Andersson',
          amount: 1500,
          description: 'Lån för bilreparation',
          date: '2024-01-15',
          status: 'pending',
          phone: '+46701234567',
        },
        {
          id: '2',
          name: 'Anna Lindberg',
          amount: 800,
          description: 'Akut medicinskostnader',
          date: '2024-01-10',
          status: 'paid',
          phone: '+46701234568',
        },
      ],
      ru: [
        {
          id: '1',
          name: 'Иван Петров',
          amount: 1500,
          description: 'Кредит на ремонт автомобиля',
          date: '2024-01-15',
          status: 'pending',
          phone: '+74951234567',
        },
        {
          id: '2',
          name: 'Мария Сидорова',
          amount: 800,
          description: 'Экстренные медицинские расходы',
          date: '2024-01-10',
          status: 'paid',
          phone: '+74951234568',
        },
      ],
      ja: [
        {
          id: '1',
          name: '田中太郎',
          amount: 1500,
          description: '車の修理のためのローン',
          date: '2024-01-15',
          status: 'pending',
          phone: '+81901234567',
        },
        {
          id: '2',
          name: '佐藤花子',
          amount: 800,
          description: '緊急医療費',
          date: '2024-01-10',
          status: 'paid',
          phone: '+81901234568',
        },
      ],
    };

    return sampleData[currentLang] || sampleData.fi;
  };

  const loadDebts = async () => {
    try {
      const storedDebts = await AsyncStorage.getItem('debts');
      if (storedDebts) {
        setDebts(JSON.parse(storedDebts));
      } else {
        // Initialize with sample data based on current language
        const sampleDebts = getSampleData();
        setDebts(sampleDebts);
        await AsyncStorage.setItem('debts', JSON.stringify(sampleDebts));
      }
    } catch (error) {
      console.error('Error loading debts:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveDebts = async (newDebts) => {
    try {
      await AsyncStorage.setItem('debts', JSON.stringify(newDebts));
    } catch (error) {
      console.error('Error saving debts:', error);
    }
  };

  const deleteDebt = (id) => {
    Alert.alert(
      i18n.t('deleteDebt'),
      i18n.t('sureDeleteDebt'),
      [
        { text: i18n.t('cancel'), style: 'cancel' },
        {
          text: i18n.t('delete'),
          style: 'destructive',
          onPress: () => {
            const updatedDebts = debts.filter(debt => debt.id !== id);
            setDebts(updatedDebts);
            saveDebts(updatedDebts);
          },
        },
      ]
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDebts();
    setRefreshing(false);
  };

  const filteredDebts = debts.filter(debt =>
    debt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    debt.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    return status === 'paid' ? '#10b981' : '#f59e0b';
  };

  const renderDebtItem = ({ item }) => (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate('DebtDetail', { debt: item })}
    >
      <Card.Content>
        <View style={styles.cardHeader}>
          <Title style={styles.debtName}>{item.name}</Title>
          <Chip
            mode="outlined"
            textStyle={{ color: getStatusColor(item.status) }}
            style={[styles.statusChip, { borderColor: getStatusColor(item.status) }]}
          >
            {i18n.t(item.status)}
          </Chip>
        </View>
        <Paragraph style={styles.amount}>{i18n.formatCurrency(item.amount)}</Paragraph>
        <Paragraph style={styles.description}>{item.description}</Paragraph>
        <Paragraph style={styles.date}>{i18n.t('dateLabel')}: {i18n.formatDate(item.date)}</Paragraph>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>{i18n.t('loadingDebts')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={i18n.t('searchDebts')}
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        iconColor="#2563eb"
      />
      
      <FlatList
        data={filteredDebts}
        renderItem={renderDebtItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{i18n.t('noDebtsFound')}</Text>
            <Text style={styles.emptySubtext}>
              {searchQuery ? i18n.t('tryAdjustingSearch') : i18n.t('addFirstDebt')}
            </Text>
          </View>
        }
      />

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddDebt')}
        color="#ffffff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
  },
  searchbar: {
    margin: 16,
    backgroundColor: '#f8fafc',
    elevation: 2,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  debtName: {
    fontSize: 18,
    color: '#1e293b',
    flex: 1,
  },
  statusChip: {
    backgroundColor: 'transparent',
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#94a3b8',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2563eb',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#64748b',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
});

export default HomeScreen; 