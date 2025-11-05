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
  KeyboardAvoidingView 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Ícone para os botões de upload (requer @expo/vector-icons)
import { Feather } from '@expo/vector-icons'; 

// 1. Importar os tipos de navegação
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types'; // O arquivo que criamos

// 2. Definir os tipos das props
type CadastroVeiculoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CadastroVeiculo'>;

type Props = {
  navigation: CadastroVeiculoScreenNavigationProp;
};

// 3. Tipar o tipo de veículo (string literal)
type VehicleType = 'bicicleta' | 'moto';
// 4. Tipar o tipo de documento (string literal)
type DocType = 'CNH' | 'Rosto';

// 5. Aplicar os tipos ao componente
export default function CadastroVeiculoScreen({ navigation }: Props) {
  // 6. Tipar as variáveis de estado
  const [vehicleType, setVehicleType] = useState<VehicleType | null>(null); // 'bicicleta' ou 'moto'
  
  const [banco, setBanco] = useState<string>('');
  const [agencia, setAgencia] = useState<string>('');
  const [conta, setConta] = useState<string>('');
  const [digito, setDigito] = useState<string>('');

  // 7. Tipar os parâmetros das funções
  const handleSelectVehicle = (type: VehicleType) => {
    setVehicleType(type);
  };

  const handleUploadDoc = (docType: DocType) => {
    // Aqui você adicionaria a lógica para abrir a câmera ou galeria
    // (Usando, por exemplo, a biblioteca 'expo-image-picker')
    alert(`Lógica para upload de ${docType} não implementada.`);
  };

  const handleFinalConfirm = () => {
    // Aqui você salvaria todos os dados (pessoais, veículo, docs, banco)
    console.log('Dados Finais:', { vehicleType, banco, agencia, conta, digito });
    alert('Cadastro concluído com sucesso!');
    
    // MUDANÇA AQUI: Após confirmar tudo, o usuário é levado
    // para o "MainApp" (o Tab Navigator).
    // Usamos 'reset' para impedir que ele volte para as telas de cadastro.
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainApp' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Escolha seu veículo de entregas</Text>

          {/* Seleção de Veículo */}
          <View style={styles.vehicleSection}>
            <TouchableOpacity 
              style={[styles.vehicleOption, vehicleType === 'bicicleta' && styles.vehicleOptionSelected]}
              onPress={() => handleSelectVehicle('bicicleta')}
            >
              {/* <Feather name="bicycle" size={40} color={vehicleType === 'bicicleta' ? '#FFF' : '#000'} /> */}
              <Text style={[styles.vehicleText, vehicleType === 'bicicleta' && styles.vehicleTextSelected]}>Bicicleta</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.vehicleOption, vehicleType === 'moto' && styles.vehicleOptionSelected]}
              onPress={() => handleSelectVehicle('moto')}
            >
              {/* <Feather name="truck" size={40} color={vehicleType === 'moto' ? '#FFF' : '#000'} /> */}
              <Text style={[styles.vehicleText, vehicleType === 'moto' && styles.vehicleTextSelected]}>Moto</Text>
            </TouchableOpacity>
          </View>

          {/* Documentos */}
          <Text style={styles.sectionTitle}>Fotos e documentos</Text>
          <View style={styles.docsSection}>
            <TouchableOpacity style={styles.docOption} onPress={() => handleUploadDoc('CNH')}>
              <Feather name="camera" size={24} color="#555" />
              <Text style={styles.docText}>Foto CNH</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.docOption} onPress={() => handleUploadDoc('Rosto')}>
              <Feather name="camera" size={24} color="#555" />
              <Text style={styles.docText}>Foto do rosto</Text>
            </TouchableOpacity>
          </View>

          {/* Dados Bancários */}
          <Text style={styles.sectionTitle}>Dados bancários</Text>
          <TextInput
            style={styles.input}
            placeholder="Banco"
            value={banco}
            onChangeText={setBanco}
          />
          <TextInput
            style={styles.input}
            placeholder="Agência"
            keyboardType="numeric"
            value={agencia}
            onChangeText={setAgencia}
          />
          <View style={styles.contaRow}>
            <TextInput
              style={[styles.input, styles.contaInput]}
              placeholder="Conta"
              keyboardType="numeric"
              value={conta}
              onChangeText={setConta}
            />
            <TextInput
              style={[styles.input, styles.digitoInput]}
              placeholder="Dígito"
              keyboardType="numeric"
              maxLength={1}
              value={digito}
              onChangeText={setDigito}
            />
          </View>

          {/* Botão Finalizar */}
          <TouchableOpacity style={styles.confirmButton} onPress={handleFinalConfirm}>
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// 8. Os estilos permanecem os mesmos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Fundo branco
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
    backgroundColor: '#007AFF', // Azul
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
  },
  docText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
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
  contaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contaInput: {
    flex: 0.7, // 70% da largura
  },
  digitoInput: {
    flex: 0.25, // 25% da largura
  },
  confirmButton: {
    width: '100%',
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
