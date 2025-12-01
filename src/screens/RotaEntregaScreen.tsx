import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type RotaEntregaNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RotaEntrega'>;

type Props = {
  navigation: RotaEntregaNavigationProp;
};

export default function RotaEntregaScreen({ navigation }: Props) {

  const handleOpenMap = () => {
    const address = "Endereço do Cliente, 456"; // Endereço do cliente
    Linking.openURL(`https://maps.google.com/?q=${address}`);
  };
  const handleChegueiNaEntrega = () => {
    navigation.navigate('ConfirmarEntrega'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.title}>Nome do cliente</Text>
            <Text style={styles.subtitle}>Endereço completo</Text>
          </View>
          <TouchableOpacity style={styles.mapButton} onPress={handleOpenMap}>
            <Feather name="map" size={24} color="#007AFF" />
            <Text style={styles.mapButtonText}>Mapa</Text>
          </TouchableOpacity>
        </View>

        {/* Card de Status */}
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.title}>Você está indo para a entrega</Text>
            <Text style={styles.subtitle}>
              Previsão de chegada:{"\n"}14:30
            </Text>
          </View>
        </View>

      </View>

      {/* Botão de Ação na parte inferior */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleChegueiNaEntrega}>
          <Text style={styles.actionButtonText}>Cheguei na entrega</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
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
    flex: 1,
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
    backgroundColor: '#FFFFFF', // Botão branco
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000', // Borda preta
  },
  actionButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});