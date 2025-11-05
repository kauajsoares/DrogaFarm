import React, { useState } from 'react';
// 1. Correção: Adicionando 'Platform' e o 'StatusBar' do react-native (com um apelido)
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  Switch, 
  Platform,
  StatusBar as RNStatusBar // Importa o StatusBar do React Native como RNStatusBar
} from 'react-native';
// Este é o StatusBar para controlar o estilo (light/dark)
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

// Importar os tipos de navegação
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../navigation/types';

// Vamos simular o mapa por enquanto, pois o componente real (expo-maps)
// requer configuração de chaves de API.
const MapPlaceholder = () => (
  <View style={styles.mapPlaceholder}>
    <Text style={styles.mapText}>Simulação de Mapa</Text>
  </View>
);

// Definir os tipos das props da tela
type HomeScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

// Aplicar os tipos ao componente
export default function HomeScreen({ navigation }: Props) {
  // Tipar o estado (o TypeScript infere 'boolean' aqui, mas podemos ser explícitos)
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const toggleAvailable = () => setIsAvailable(previousState => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      {/* O style "dark" funciona bem com o cabeçalho branco */}
      <StatusBar style="dark" />
      
      {/* Header com Status e Notificações */}
      <View style={styles.header}>
        
        {/* --- MUDANÇA AQUI --- */}
        {/* Adicionamos um TouchableOpacity para navegar para o Perfil */}
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <View style={styles.profilePic} />
        </TouchableOpacity>
        {/* --- FIM DA MUDANÇA --- */}

        <View style={styles.statusToggle}>
          <Text style={styles.statusText}>Ficar disponível</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isAvailable ? "#007AFF" : "#f4f3f4"}
            onValueChange={toggleAvailable}
            value={isAvailable}
          />
        </View>
        <TouchableOpacity>
          <Feather name="bell" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Simulação do Mapa */}
      <MapPlaceholder />

      {/* Conteúdo rolável */}
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

// Os estilos permanecem os mesmos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4', // Um cinza claro de fundo
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    // 2. Correção: Usando o RNStatusBar.currentHeight
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
    width: '48%', // Quase metade da tela
    minHeight: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2, },
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
  }
});

