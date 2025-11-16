import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';


import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NovaEntregaNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NovaEntrega'>;

type Props = {
  navigation: NovaEntregaNavigationProp;
};
export default function NovaEntregaScreen({ navigation }: Props) {


  const handleAceitar = () => {
    navigation.replace('RotaColeta'); 
  };

  const handleRecusar = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Informações de Coleta e Entrega */}
        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Coleta 1</Text>
            <Text style={styles.infoValue}>Nome da Farmácia</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Entrega 1</Text>
            <Text style={styles.infoValue}>Endereço de entrega</Text>
          </View>
        </View>

        {/* Informações de Preço e Rota */}
        <View style={styles.detailsCard}>
          <Text style={styles.price}>R$ 00,00</Text>
          <View style={styles.divider} />
          
          <Text style={styles.routeLabel}>Rota para moto</Text>
          <View style={styles.routeDetails}>
            <Text style={styles.routeText}>Distância total</Text>
            <Text style={styles.routeValue}>4,01 km</Text>
          </View>
          <View style={styles.routeDetails}>
            <Text style={styles.routeText}>Tempo aproximado de rota</Text>
            <Text style={styles.routeValue}>21 min</Text>
          </View>
        </View>

        {/* Devolução */}
        <View style={styles.devolucaoCard}>
          <Text style={styles.infoLabel}>Possibilidade de devolução</Text>
          <Text style={styles.infoValue}>Sim</Text>
        </View>

        {/* Botões */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.recusarButton]} 
            onPress={handleRecusar}
          >
            <Text style={styles.buttonText}>Recusar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.aceitarButton]} 
            onPress={handleAceitar}
          >
            <Text style={styles.buttonText}>Aceitar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end', // Alinha o conteúdo na parte de baixo (para modais)
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoCard: {
    width: '48%',
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: '#555',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  detailsCard: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#D0D0D0',
    marginVertical: 10,
  },
  routeLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  routeText: {
    fontSize: 14,
    color: '#333',
  },
  routeValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  devolucaoCard: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '48%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  recusarButton: {
    backgroundColor: '#FF3B30', // Vermelho
  },
  aceitarButton: {
    backgroundColor: '#34C759', // Verde
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});