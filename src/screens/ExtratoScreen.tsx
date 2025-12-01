import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  FlatList,
  TouchableOpacity
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../navigation/types';

type RotaItemData = {
  id: string;
  date: string;
  value: string;
};

const HISTORICO_DATA: RotaItemData[] = [
  { id: '1', date: '28/09 - 14:00', value: 'R$ 00,00' },
  { id: '2', date: '28/09 - 14:00', value: 'R$ 00,00' },
  { id: '3', date: '28/09 - 14:00', value: 'R$ 00,00' },
  { id: '4', date: '28/09 - 14:00', value: 'R$ 00,00' },
  { id: '5', date: '28/09 - 14:00', value: 'R$ 00,00' },
];

type RotaItemProps = {
  date: string;
  value: string;
  isLast?: boolean; 
};

const RotaItem = ({ date, value, isLast = false }: RotaItemProps) => (
  <View style={[styles.rotaItem, isLast && styles.lastRotaItem]}>
    <View>
      <Text style={styles.rotaTitle}>Rota completa</Text>
      <Text style={styles.rotaDate}>{date}</Text>
    </View>
    <Text style={styles.rotaValue}>{value}</Text>
  </View>
);

type ExtratoScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Extrato'>;

type Props = {
  navigation: ExtratoScreenNavigationProp;
};

export default function ExtratoScreen({ navigation }: Props) {
  
  // Function to ensure we go back to Profile
  const handleBackToProfile = () => {
    navigation.navigate('Perfil');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackToProfile} style={styles.backButton}>
          <Feather name="chevron-left" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Extrato</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.card}>
          <View style={styles.ganhosItem}>
            <Text style={styles.ganhosLabel}>Ganhos da semana</Text>
            <Text style={styles.ganhosValue}>R$ 000,00</Text>
          </View>
          <View style={[styles.ganhosItem, { borderBottomWidth: 0 }]}>
            <Text style={styles.ganhosLabel}>Ganhos de hoje</Text>
            <Text style={styles.ganhosValue}>R$ 000,00</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Histórico</Text>
        <View style={styles.card}>
          <Text style={styles.dateHeader}>Hoje, x de setembro</Text>
          
          <FlatList
            data={HISTORICO_DATA}
            renderItem={({ item, index }) => (
              <RotaItem 
                date={item.date} 
                value={item.value} 
                isLast={index === HISTORICO_DATA.length - 1}
              />
            )}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#E0E0E0',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContent: {
    padding: 20,
    backgroundColor: '#F4F4F4', 
  },
  card: {
    backgroundColor: '#E0E0E0', 
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10, 
  },
  ganhosItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
  },
  ganhosLabel: {
    fontSize: 14,
    color: '#555',
  },
  ganhosValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: 'black',
  },
  dateHeader: {
    fontSize: 16,
    color: '#555',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
  },
  rotaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0', 
  },
  lastRotaItem: {
    borderBottomWidth: 0, 
  },
  rotaTitle: {
    fontSize: 16,
    color: 'black',
  },
  rotaDate: {
    fontSize: 14,
    color: '#555',
  },
  rotaValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});