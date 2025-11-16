import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Para o ícone de "Mapa"

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';


type RotaColetaNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RotaColeta'>;

type Props = {
  navigation: RotaColetaNavigationProp;
};

export default function RotaColetaScreen({ navigation }: Props) {

  // Função para abrir o mapa (ex: Google Maps)
  const handleOpenMap = () => {
    // No futuro, usaria o endereço real aqui
    const address = "Endereço da Farmácia, 123";
    Linking.openURL(`https://maps.google.com/?q=${address}`);
  };

  // Função para a próxima etapa
  const handleChegueiNaColeta = () => {
    // Navega para a próxima tela do fluxo
    navigation.navigate('ConfirmarColeta'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Card da Farmácia */}
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.title}>Nome da farmácia</Text>
            <Text style={styles.subtitle}>Endereço completo</Text>
          </View>
          <TouchableOpacity style={styles.mapButton} onPress={handleOpenMap}>
            <Feather name="map" size={24} color="#007AFF" />
            <Text style={styles.mapButtonText}>Mapa</Text>
          </TouchableOpacity>
        </View>

        {/* Card de Status*/}
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.title}>Você está indo para a coleta</Text>
            <Text style={styles.subtitle}>Previsão de chegada:{"\n"}14:13</Text>
          </View>
        </View>

      </View>

      {/* Botão de Ação na parte inferior */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleChegueiNaColeta}>
          <Text style={styles.actionButtonText}>Cheguei na coleta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4', // Fundo cinza claro
  },
  
  content: {
    flex: 1,
    padding: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flex: 1, // Permite que o texto quebre a linha se necessário
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  mapButton: {
    marginLeft: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  mapButtonText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: 'bold',
    marginTop: 2,
  },
  bottomButtonContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  actionButton: {
    backgroundColor: '#007AFF', // Azul
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});