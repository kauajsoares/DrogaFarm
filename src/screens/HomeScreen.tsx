import React, { useState } from 'react';
// 1. Importações corretas (adicionamos 'Alert' para o 'else')
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  Platform,
  StatusBar as RNStatusBar,
  Alert, // Precisamos do Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

// Importar os tipos de navegação
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '../navigation/types';

const MapPlaceholder = () => (
  <View style={styles.mapPlaceholder}>
    <Text style={styles.mapText}>Simulação de Mapa</Text>
  </View>
);

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const toggleAvailable = () => setIsAvailable(previousState => !previousState);

  // 2. MUDANÇA AQUI: A função do sino agora tem a lógica
  const handleBellPress = () => {
    // 1. Se estiver disponível, simula uma entrega
    if (isAvailable) {
      const stackNavigator =
        navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();
      if (stackNavigator) {
        stackNavigator.navigate('NovaEntrega');
      }
    } else {
      // 2. Se não estiver disponível, não faz nada
      // (Você pode adicionar um 'else' aqui no futuro, se quiser,
      // para navegar para a tela de Notificações)
      console.log('Botão de sino pressionado enquanto indisponível.');
    }
  };

  const goToPerfil = () => {
    navigation.navigate('Perfil');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity onPress={goToPerfil}>
          <View style={styles.profilePic} />
        </TouchableOpacity>

        <View style={styles.statusToggle}>
          <Text style={styles.statusText}>Ficar disponível</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isAvailable ? '#007AFF' : '#f4f3f4'}
            onValueChange={toggleAvailable}
            value={isAvailable}
          />
        </View>

        {/* 3. O Sino agora usa a nova função 'handleBellPress' */}
        <TouchableOpacity onPress={handleBellPress}>
          <Feather name="bell" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <MapPlaceholder />

      <ScrollView style={styles.contentArea}>
        <Text style={styles.sectionTitle}>Novidades</Text>
        <View style={styles.newsCard} />

        <Text style={styles.sectionTitle}>Seus ganhos</Text>
        <View style={styles.earningsContainer}>
          <View style={styles.earningsCard}>
            <Text style={styles.cardTitle}>Ganhos do dia</Text>
            <Text style={styles.earningsValue}>R$ 00,00</Text>
            <Text style={styles.cardSubtitle}>Saldo total: R$ 00,00</Text>
          </View>
          <View style={styles.earningsCard}>
            <Text style={styles.cardTitle}>Rotas aceitas: x</Text>
            <Text style={styles.cardTitle}>Finalizadas: y</Text>
            <Text style={styles.cardTitle}>Recusadas: z</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 10,
    paddingBottom: 10,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  statusToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#DDEEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: '#555',
    fontSize: 18,
  },
  contentArea: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
  },
  newsCard: {
    height: 150,
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
    marginBottom: 20,
  },
  earningsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  earningsCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    width: '48%', 
    minHeight: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 14,
    color: '#555',
  },
  earningsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 5,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#888',
  },
});