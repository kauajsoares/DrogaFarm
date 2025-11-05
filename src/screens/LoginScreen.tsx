import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// 1. Importar os tipos de navegação
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types'; // O arquivo que criamos

// 2. Definir os tipos das props
type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

// 3. Aplicar os tipos ao componente
export default function LoginScreen({ navigation }: Props) {
  // 4. Tipar as variáveis de estado
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    // Aqui você adicionaria a lógica de autenticação
    console.log('Tentando logar com:', email, password);

    // Lógica correta: Navega para o app principal e limpa a pilha
    // (Impede o usuário de voltar para o Login)
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainApp' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Parte de Cima (Azul/Gradiente) */}
      <View style={styles.topSection}>
        <Text style={styles.title}>Login</Text>
      </View>

      {/* Usamos KeyboardAvoidingView para evitar que o teclado cubra os inputs */}
      <KeyboardAvoidingView 
        style={styles.bottomSection}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.registerText}>
            Não está cadastrado? <Text style={styles.registerLink}>Cadastre-se agora!</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// 5. Os estilos permanecem os mesmos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00FFFF', // Cor de fundo Ciano
  },
  topSection: {
    flex: 0.4, // Ocupa 40% da tela para o cabeçalho
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00FFFF', // Começa com ciano
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginTop: Platform.OS === 'android' ? 20 : 0, // Ajuste para Android
  },
  bottomSection: {
    flex: 0.6, // Ocupa 60% da tela para o formulário
    backgroundColor: '#FFFFFF', // Fundo branco
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 25,
    paddingTop: 30,
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
  loginButton: {
    width: '100%',
    backgroundColor: '#007AFF', // Azul padrão do iOS
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    fontSize: 15,
    color: '#888',
  },
  registerLink: {
    color: '#007AFF', // Azul para o link
    fontWeight: 'bold',
  },
});
