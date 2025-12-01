import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  Alert 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types'; 

// MUDANÇA AQUI: Importar o Firebase
import { auth } from '../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  return re.test(String(email).toLowerCase());
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (isLoading) return;

    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha o e-mail e a senha.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      // Se o login der certo, reseta a navegação para a Home
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      });

    } catch (error: any) {
      console.error("Erro no login:", error.code);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        Alert.alert('Erro', 'E-mail ou senha incorretos.');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao fazer login.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.topSection}>
        <Text style={styles.title}>Login</Text>
      </View>

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
          editable={!isLoading}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!isLoading}
        />

        <TouchableOpacity 
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.loginButtonText}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} disabled={isLoading}>
          <Text style={styles.registerText}>
            Não está cadastrado? <Text style={styles.registerLink}>Cadastre-se agora!</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00FFFF', 
  },
  topSection: {
    flex: 0.4, 
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
  bottomSection: {
    flex: 0.6, 
    backgroundColor: '#FFFFFF', 
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
    backgroundColor: '#007AFF', 
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  loginButtonDisabled: {
    backgroundColor: '#A9A9A9',
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
    color: '#007AFF', 
    fontWeight: 'bold',
  },
});