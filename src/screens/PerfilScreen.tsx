import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Importamos ícones


import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '../navigation/types';

type PerfilScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Perfil'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = {
  navigation: PerfilScreenNavigationProp;
};


const MenuItem: React.FC<{label: string, onPress: () => void}> = ({ label, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text style={styles.menuText}>{label}</Text>
    <Feather name="chevron-right" size={20} color="#888" />
  </TouchableOpacity>
);


export default function PerfilScreen({ navigation }: Props) {


  const handleLogout = () => {
    const stackNavigator = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();
    if (stackNavigator) {
      stackNavigator.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    }
  };


  const goToDados = () => {
    navigation.navigate('DadosCadastro'); 
  };
  
  const goToExtrato = () => {
    navigation.navigate('MainApp', { screen: 'Extrato' });
  };


  const goToEmergencia = () => {
    navigation.navigate('ContatoEmergencia');
  };

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
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
    borderRadius: 60,
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
    backgroundColor: '#FF3B30',
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