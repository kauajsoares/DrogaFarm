import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  Platform, 
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons'; 

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

import { auth, db } from '../services/firebaseConfig';
import { doc, updateDoc, setDoc } from 'firebase/firestore';

type CadastroVeiculoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CadastroVeiculo'>;

type Props = {
  navigation: CadastroVeiculoScreenNavigationProp;
};

type VehicleType = 'bicicleta' | 'moto';
type DocType = 'Documento' | 'CNH' | 'Rosto';

export default function CadastroVeiculoScreen({ navigation }: Props) {
  const [vehicleType, setVehicleType] = useState<VehicleType>('bicicleta'); 
  
  const [modelo, setModelo] = useState<string>('');
  const [placa, setPlaca] = useState<string>('');
  const [cor, setCor] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);

  const handleSelectVehicle = (type: VehicleType) => {
    setVehicleType(type);
    setModelo('');
    setPlaca('');
    setCor('');
  };

  const handleUploadDoc = (docType: DocType) => {
    Alert.alert('Upload', `Fazer upload de: ${docType}`);
  };

  const handleNextStep = async () => {
    if (isLoading) return;

    if (!vehicleType) {
      Alert.alert('Erro', 'Selecione um veículo.');
      return;
    }
    if (!modelo.trim()) {
      Alert.alert('Erro', 'Por favor, informe o modelo do veículo.');
      return;
    }

    if (vehicleType === 'moto') {
      if (!placa.trim()) {
        Alert.alert('Erro', 'Por favor, informe a placa da moto.');
        return;
      }
      if (placa.trim().length < 7) {
         Alert.alert('Erro', 'A placa deve ter 7 caracteres.');
         return;
      }
    } else {
      if (!cor.trim()) {
        Alert.alert('Erro', 'Por favor, informe a cor da bicicleta.');
        return;
      }
    }

    setIsLoading(true);

    try {
      const user = auth.currentUser;
      
      const uid = user ? user.uid : "usuario_teste_id";
      const userRef = doc(db, "entregadores", uid);
      
      const { setDoc } = require('firebase/firestore'); 
      
      await setDoc(userRef, {
        veiculo: {
          tipo: vehicleType,
          modelo: modelo,
          placa: vehicleType === 'moto' ? placa : null,
          cor: vehicleType === 'bicicleta' ? cor : null,
        },
      }, { merge: true });

      console.log('Veículo salvo! Indo para banco...');
      
      navigation.navigate('CadastroBancario');

    } catch (error: any) {
      console.error("Erro ao salvar:", error);
      Alert.alert('Erro', 'Falha ao salvar dados.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Escolha seu veículo</Text>

          <View style={styles.vehicleSection}>
            <TouchableOpacity 
              style={[styles.vehicleOption, vehicleType === 'bicicleta' && styles.vehicleOptionSelected]}
              onPress={() => handleSelectVehicle('bicicleta')}
              disabled={isLoading}
            >
              <Text style={[styles.vehicleText, vehicleType === 'bicicleta' && styles.vehicleTextSelected]}>Bicicleta</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.vehicleOption, vehicleType === 'moto' && styles.vehicleOptionSelected]}
              onPress={() => handleSelectVehicle('moto')}
              disabled={isLoading}
            >
              <Text style={[styles.vehicleText, vehicleType === 'moto' && styles.vehicleTextSelected]}>Moto</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Documentação</Text>
          <View style={styles.docsSection}>
            <TouchableOpacity 
              style={styles.docOption} 
              onPress={() => handleUploadDoc(vehicleType === 'moto' ? 'CNH' : 'Documento')}
              disabled={isLoading}
            >
              <Feather name="camera" size={24} color="#555" />
              <Text style={styles.docText}>
                {vehicleType === 'moto' ? 'Foto da CNH' : 'Foto do RG/CPF'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.docOption} 
              onPress={() => handleUploadDoc('Rosto')}
              disabled={isLoading}
            >
              <Feather name="camera" size={24} color="#555" />
              <Text style={styles.docText}>Foto do Rosto</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Dados do Veículo</Text>
          
          <TextInput
            style={styles.input}
            placeholder={vehicleType === 'moto' ? "Modelo da Moto (Ex: Honda CG)" : "Modelo da Bike (Ex: Caloi)"}
            value={modelo}
            onChangeText={setModelo}
            editable={!isLoading}
          />

          {vehicleType === 'bicicleta' && (
            <TextInput
              style={styles.input}
              placeholder="Cor da Bike"
              value={cor}
              onChangeText={setCor}
              editable={!isLoading}
            />
          )}

          {vehicleType === 'moto' && (
            <TextInput
              style={styles.input}
              placeholder="Placa do Veiculo"
              value={placa}
              onChangeText={setPlaca}
              editable={!isLoading}
              autoCapitalize="characters"
              maxLength={7}
            />
          )}

          <TouchableOpacity 
            style={[styles.confirmButton, isLoading && styles.disabledButton]} 
            onPress={handleNextStep}
            disabled={isLoading}
          >
            <Text style={styles.confirmButtonText}>
              {isLoading ? 'Salvando...' : 'Próximo'}
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
    backgroundColor: '#FFFFFF', 
  },
  scrollContent: {
    padding: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  vehicleSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  vehicleOption: {
    width: 120,
    height: 120,
    borderRadius: 15,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  vehicleOptionSelected: {
    backgroundColor: '#007AFF', 
    borderColor: '#007AFF',
  },
  vehicleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  vehicleTextSelected: {
    color: '#FFF',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 20,
    marginTop: 10,
  },
  docsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  docOption: {
    width: 120,
    height: 100,
    borderRadius: 15,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    padding: 5,
  },
  docText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  confirmButton: {
    width: '100%',
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});