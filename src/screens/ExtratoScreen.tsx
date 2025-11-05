import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// 1. Importar os tipos de navegação
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../navigation/types';

// 2. Definir o tipo para os dados do histórico
type RotaItemData = {
  id: string;
  date: string;
  value: string;
};

// 3. Aplicar o tipo ao array de dados
const HISTORICO_DATA: RotaItemData[] = [
  { id: '1', date: '28/09 - 14:00', value: 'R$ 00,00' },
  { id: '2', date: '28/09 - 14:00', value: 'R$ 00,00' },
  { id: '3', date: '28/09 - 14:00', value: 'R$ 00,00' },
  { id: '4', date: '28/09 - 14:00', value: 'R$ 00,00' },
  { id: '5', date: '28/09 - 14:00', value: 'R$ 00,00' },
];

// 4. Definir os tipos das props para o RotaItem
type RotaItemProps = {
  date: string;
  value: string;
};

// 5. Aplicar os tipos ao componente RotaItem
const RotaItem = ({ date, value }: RotaItemProps) => (
  <View style={styles.rotaItem}>
    <View>
      <Text style={styles.rotaTitle}>Rota completa</Text>
      <Text style={styles.rotaDate}>{date}</Text>
    </View>
    <Text style={styles.rotaValue}>{value}</Text>
  </View>
);

// 6. Definir os tipos das props da tela principal
type ExtratoScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Extrato'>;

type Props = {
  navigation: ExtratoScreenNavigationProp;
};

// 7. Aplicar os tipos ao componente principal
export default function ExtratoScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Extrato</Text>
        </View>

        {/* Ganhos */}
        <View style={styles.ganhosContainer}>
          <View style={styles.ganhosBox}>
            <Text style={styles.ganhosLabel}>Ganhos da semana</Text>
            <Text style={styles.ganhosValue}>R$ 000,00</Text>
          </View>
          <View style={styles.ganhosBox}>
            <Text style={styles.ganhosLabel}>Ganhos de hoje</Text>
            <Text style={styles.ganhosValue}>R$ 000,00</Text>
          </View>
        </View>

        {/* Histórico */}
        <View style={styles.historicoContainer}>
          <Text style={styles.sectionTitle}>Histórico</Text>
          <Text style={styles.dateHeader}>Hoje, x de setembro</Text>
          
          <FlatList
            data={HISTORICO_DATA}
            // 8. O TypeScript infere o tipo 'item' como RotaItemData aqui
            renderItem={({ item }) => <RotaItem date={item.date} value={item.value} />}
            keyExtractor={item => item.id}
            scrollEnabled={false} // Desabilita a rolagem da FlatList (o ScrollView já cuida disso)
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// 9. Os estilos permanecem os mesmos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  ganhosContainer: {
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  ganhosBox: {
    backgroundColor: '#E9E9E9',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  ganhosLabel: {
    fontSize: 16,
    color: '#555',
  },
  ganhosValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  historicoContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateHeader: {
    fontSize: 16,
    color: '#888',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingBottom: 10,
  },
  rotaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  rotaTitle: {
    fontSize: 16,
    color: 'black',
  },
  rotaDate: {
    fontSize: 14,
    color: '#888',
  },
  rotaValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
