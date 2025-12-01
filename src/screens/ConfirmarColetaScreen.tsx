import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';



type ConfirmarColetaNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ConfirmarColeta'>;

type Props = {
  navigation: ConfirmarColetaNavigationProp;
};

export default function ConfirmarColetaScreen({ navigation }: Props) {
  const [code, setCode] = useState('');
  const handleConcluirColeta = () => {
    console.log('Código inserido:', code);
    navigation.navigate('RotaEntrega'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <Text style={styles.headerTitle}>
          Informe para a loja o código de coleta ou o nome do cliente
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pedido Nº x</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nome do cliente:</Text>
            <Text style={styles.infoValue}>XXXXXXXXXXXX</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Valor a receber:</Text>
            <Text style={styles.infoValue}>R$ 00,00</Text>
          </View>
        </View>

        {/* Campo de Input de Código */}
        <TextInput
          style={styles.codeInput}
          placeholder="____"
          placeholderTextColor="#B0B0B0"
          keyboardType="numeric"
          maxLength={4}
          value={code}
          onChangeText={setCode}
          secureTextEntry
        />

      </View>

      {/* Botão de Ação na parte inferior */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleConcluirColeta}>
          <Text style={styles.actionButtonText}>Concluir coleta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4', // Fundo cinza claro
  },
  content: {
    flex: 1,
    padding: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#E0E0E0', // Cinza claro do protótipo
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  infoRow: {
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#555',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  codeInput: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 10, // Cria o espaçamento entre os dígitos
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#A0A0A0',
    marginVertical: 40,
    marginHorizontal: 20,
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