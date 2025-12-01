import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Alert 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

import { auth, db } from '../services/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

type CadastroBancarioScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CadastroBancario'>;

type Props = {
  navigation: CadastroBancarioScreenNavigationProp;
};

const formatAgencia = (text: string) => {

  const digits = text.replace(/\D/g, '');
  

  const truncated = digits.slice(0, 5);

  if (truncated.length > 4) {
    return `${truncated.slice(0, 4)}-${truncated.slice(4)}`;
  }
  
  return truncated;
};

export default function CadastroBancarioScreen({ navigation }: Props) {
  const [banco, setBanco] = useState('');
  const [agencia, setAgencia] = useState('');
  const [conta, setConta] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);

  const handleAgenciaChange = (text: string) => {
    setAgencia(formatAgencia(text));
  };

  const handleContaChange = (text: string) => {
    setConta(text.replace(/\D/g, ''));
  };

  const handleFinalizar = async () => {
    if (isLoading) return;

    if (!banco || !agencia || !conta) {
      Alert.alert('Erro', 'Por favor, preencha todos os dados bancários.');
      return;
    }

    if (agencia.length !== 6) {
      Alert.alert('Erro', 'A agência deve estar no formato 0000-0.');
      return;
    }

    if (conta.length < 5 || conta.length > 8) {
      Alert.alert('Erro', 'A conta deve ter entre 5 e 8 dígitos.');
      return;
    }

    setIsLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Erro', 'Sessão expirada. Faça login novamente.');
        navigation.navigate('Login');
        return;
      }

      const userRef = doc(db, "entregadores", user.uid);

      await updateDoc(userRef, {
        dadosBancarios: {
          banco,
          agencia,
          conta,

        },
        cadastroCompleto: true, 
        status: 'disponivel'    
      });

      console.log('Cadastro finalizado com sucesso!');
      
      Alert.alert(
        'Parabéns!', 
        'Seu cadastro foi concluído. Você já pode começar a fazer entregas.',
        [
          { 
            text: "OK", 
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'MainApp' }],
              });
            }
          }
        ]
      );

    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar os dados bancários.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Dados Bancários</Text>
        <Text style={styles.subtitle}>Para você receber seus ganhos</Text>
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.content}>
          
          <Text style={styles.label}>Banco</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Nubank, Itaú..."
            value={banco}
            onChangeText={setBanco}
            editable={!isLoading}
          />

          <Text style={styles.label}>Agência</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 0000-0"
            keyboardType="numeric"
            value={agencia}
            onChangeText={handleAgenciaChange}
            maxLength={6} 
            editable={!isLoading}
          />

          <Text style={styles.label}>Conta</Text>
          <TextInput
            style={styles.input}
            placeholder="Número da conta (sem dígito)"
            keyboardType="numeric"
            value={conta}
            onChangeText={handleContaChange}
            maxLength={8} 
            editable={!isLoading}
          />

          <TouchableOpacity 
            style={[styles.button, isLoading && styles.buttonDisabled]} 
            onPress={handleFinalizar}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Finalizando...' : 'Concluir Cadastro'}
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    padding: 25,
    backgroundColor: '#F4F4F4',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  content: {
    padding: 25,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});