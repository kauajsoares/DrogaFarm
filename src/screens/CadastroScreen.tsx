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
  Platform 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// 1. Importar os tipos de navegação
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types'; // O arquivo que criamos

// 2. Definir os tipos das props
type CadastroScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cadastro'>;

type Props = {
  navigation: CadastroScreenNavigationProp;
};

// 3. Aplicar os tipos ao componente
export default function CadastroScreen({ navigation }: Props) {
  // 4. Tipar as variáveis de estado
  const [nome, setNome] = useState<string>('');
  const [sobrenome, setSobrenome] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [confirmarSenha, setConfirmarSenha] = useState<string>('');

  const handleCadastro = () => {
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    // Aqui você adicionaria a lógica de cadastro (ex: salvar no banco)
    console.log('Dados de Cadastro:', { nome, sobrenome, cpf, email, telefone, senha });

    // Correto: Navega para a próxima tela do fluxo
    navigation.navigate('CadastroVeiculo'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Parte de Cima (Azul/Gradiente) */}
      <View style={styles.topSection}>
        <Text style={styles.title}>Cadastro</Text>
      </View>

    
      <KeyboardAvoidingView 
        style={styles.bottomSectionWrapper} // Wrapper para o KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.bottomSection}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Sobrenome"
            value={sobrenome}
            onChangeText={setSobrenome}
          />
          <TextInput
            style={styles.input}
            placeholder="CPF"
            keyboardType="numeric"
            value={cpf}
            onChangeText={setCpf}
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />

          <TouchableOpacity style={styles.confirmButton} onPress={handleCadastro}>
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00FFFF', // Cor de fundo Ciano
  },
  topSection: {
    flex: 0.25, // Um pouco menor para o cadastro ter mais espaço
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00FFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginTop: Platform.OS === 'android' ? 20 : 0,
  },
  bottomSectionWrapper: {
    flex: 0.75, // Ocupa o restante
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden', // Garante que o ScrollView respeite as bordas arredondadas
  },
  bottomSection: {
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 20, // Espaço extra para a rolagem
    alignItems: 'center',
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
    marginTop: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
