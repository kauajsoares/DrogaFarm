import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Importamos ícones

// 1. Importações de tipos
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '../navigation/types';

// 2. Definição dos tipos das props
type PerfilScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Perfil'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = {
  navigation: PerfilScreenNavigationProp;
};

// Componente reutilizável para os itens do menu
// Usamos React.FC (Functional Component) para tipar o componente
const MenuItem: React.FC<{label: string, onPress: () => void}> = ({ label, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text style={styles.menuText}>{label}</Text>
    <Feather name="chevron-right" size={20} color="#888" />
  </TouchableOpacity>
);

// 3. Aplicar os tipos ao componente
export default function PerfilScreen({ navigation }: Props) {

  // 4. Lógica de Logout CORRIGIDA
  const handleLogout = () => {
    // Pegamos o navegador 'pai' (o Stack Navigator)
    const stackNavigator = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();
    
    // Verificamos se ele existe e chamamos o reset nele
    if (stackNavigator) {
      stackNavigator.reset({
        index: 0,
        routes: [{ name: 'Welcome' }], // Agora o TypeScript sabe que 'Welcome' é válido
      });
    }
  };

  // Funções de navegação para os novos itens
  const goToDados = () => {
    // Você precisará criar a tela 'DadosCadastro' e adicioná-la ao RootStackParamList
    // navigation.navigate('DadosCadastro'); 
    alert('Tela "Dados de cadastro" não implementada.');
  };
  
  // 5. Navegação para Extrato CORRIGIDA
  const goToExtrato = () => {
    // CORREÇÃO AQUI: Navega para a aba 'Extrato' (o nome da rota no Tab Navigator)
    navigation.navigate('MainApp', { screen: 'Extrato' });
  };

  const goToDocumentos = () => {
    // Você precisará criar a tela 'Documentos' e adicioná-la ao RootStackParamList
    // navigation.navigate('Documentos');
    alert('Tela "Documentos" não implementada.');
  };
  
  const goToEmergencia = () => {
    // Você precisará criar a tela 'ContatoEmergencia' e adicioná-la ao RootStackParamList
    // navigation.navigate('ContatoEmergencia');
    alert('Tela "Contato de emergência" não implementada.');
  };


  // 6. O JSX (UI) foi completamente refeito para bater com o protótipo
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Cabeçalho do Perfil */}
        <View style={styles.profileHeader}>
          <Text style={styles.profileName}>Nome D. Entregador</Text>
          <View style={styles.profilePic} />
        </View>

        {/* Itens do Menu */}
        <View style={styles.menuContainer}>
          <MenuItem label="Dados de cadastro" onPress={goToDados} />
          <MenuItem label="Extrato" onPress={goToExtrato} />
          <MenuItem label="Documentos" onPress={goToDocumentos} />
          <MenuItem label="Contato de emergência" onPress={goToEmergencia} />
        </View>

        {/* Botão de Sair */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair (Logout)</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// 7. Estilos atualizados para o novo layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4', // Fundo cinza claro
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 90,
    backgroundColor: '#E0E0E0',
  },
  menuContainer: {
    marginTop: 20,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#FF3B30', // Vermelho
    paddingVertical: 15,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

