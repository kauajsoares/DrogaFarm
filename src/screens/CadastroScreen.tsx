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

// 1. MUDANÇA AQUI: Importações do Firebase
import { auth, db } from '../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// Funções de formatação (mantidas iguais)
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  return re.test(String(email).toLowerCase());
};

const formatCPF = (text: string) => {
  const digits = text.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return digits.replace(/(\d{3})(\d)/, '$1.$2');
  if (digits.length <= 9) return digits.replace(/(\d{3})(\d{3})(\d)/, '$1.$2.$3');
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

const formatTelefone = (text: string) => {
  const digits = text.replace(/\D/g, '').slice(0, 11); 
  if (digits.length <= 2) return digits;
  if (digits.length <= 3) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
  if (digits.length <= 7) return `${digits.slice(0, 2)} ${digits.slice(2, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 2)} ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`; 
};

type CadastroScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cadastro'>;

type Props = {
  navigation: CadastroScreenNavigationProp;
};

export default function CadastroScreen({ navigation }: Props) {
  const [nome, setNome] = useState<string>('');
  const [sobrenome, setSobrenome] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [confirmarSenha, setConfirmarSenha] = useState<string>('');
  
  // Estado de carregamento para travar o botão
  const [isLoading, setIsLoading] = useState(false);

  // "Easter Egg" para pular validação (mantido)
  const [devClicks, setDevClicks] = useState(0);

  const handleCpfChange = (text: string) => setCpf(formatCPF(text));
  const handleTelefoneChange = (text: string) => setTelefone(formatTelefone(text));

  // Lógica do Easter Egg (mantida)
  const handleDevSkip = () => {
    if (__DEV__) { 
      const newClickCount = devClicks + 1;
      setDevClicks(newClickCount);
      if (newClickCount === 5) {
        Alert.alert('Modo Dev', 'Pular cadastro?', [
          { text: 'Não', onPress: () => setDevClicks(0) },
          { text: 'Sim', onPress: () => { navigation.navigate('CadastroVeiculo'); setDevClicks(0); } },
        ]);
      }
    }
  };

  const handleCadastro = async () => {
    setDevClicks(0); 

    // --- VALIDAÇÕES (As mesmas que já fizemos) ---
    if (!nome || !sobrenome || !cpf || !email || !telefone || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (nome.trim().length < 3) {
      Alert.alert('Erro', 'Insira um nome válido.');
      return;
    }
    if (cpf.length !== 14) {
      Alert.alert('Erro', 'O CPF está incompleto.');
      return;
    }
    if (telefone.length !== 14) {
      Alert.alert('Erro', 'O Telefone está incompleto.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }
    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    // --- FIREBASE: AQUI COMEÇA A MÁGICA ---
    setIsLoading(true); // Ativa o carregamento

    try {
      // 1. Cria o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      console.log("Usuário Auth criado:", user.uid);

      // 2. Salva os dados pessoais no Firestore
      // Cria um documento na coleção 'entregadores' com o mesmo ID do usuário
      await setDoc(doc(db, "entregadores", user.uid), {
        nome: nome,
        sobrenome: sobrenome,
        cpf: cpf,
        telefone: telefone,
        email: email,
        createdAt: new Date().toISOString(),
        // Status inicial
        status: 'indisponivel' 
      });

      console.log("Dados salvos no Firestore!");
      
      // 3. Sucesso! Vai para a próxima tela
      Alert.alert("Sucesso", "Conta criada! Agora cadastre seu veículo.");
      navigation.navigate('CadastroVeiculo');

    } catch (error: any) {
      console.error(error);
      // Tratamento de erros comuns do Firebase
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Erro', 'Este e-mail já está cadastrado.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Erro', 'E-mail inválido.');
      } else {
        Alert.alert('Erro', 'Não foi possível criar a conta: ' + error.message);
      }
    } finally {
      setIsLoading(false); // Desativa o carregamento (seja sucesso ou erro)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.topSection}>
        <TouchableOpacity onPress={handleDevSkip}>
          <Text style={styles.title}>Cadastro</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={styles.bottomSectionWrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.bottomSection}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
            editable={!isLoading} // Bloqueia edição enquanto carrega
          />
          <TextInput
            style={styles.input}
            placeholder="Sobrenome"
            value={sobrenome}
            onChangeText={setSobrenome}
            editable={!isLoading}
          />
          <TextInput
            style={styles.input}
            placeholder="CPF (ex: xxx.xxx.xxx-xx)"
            keyboardType="numeric"
            value={cpf}
            onChangeText={handleCpfChange} 
            maxLength={14} 
            editable={!isLoading}
          />
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
            placeholder="Telefone (ex: XX X XXXX-XXXX)"
            keyboardType="numeric"
            value={telefone}
            onChangeText={handleTelefoneChange} 
            maxLength={14} 
            editable={!isLoading}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            editable={!isLoading}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            editable={!isLoading}
          />

          <TouchableOpacity 
            style={[styles.confirmButton, isLoading && styles.disabledButton]} 
            onPress={handleCadastro}
            disabled={isLoading}
          >
            <Text style={styles.confirmButtonText}>
              {isLoading ? "Carregando..." : "Confirmar"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00FFFF', 
  },
  topSection: {
    flex: 0.25, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00FFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginTop: Platform.OS === 'android' ? 20 : 0,
    padding: 10,
  },
  bottomSectionWrapper: {
    flex: 0.75, 
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden', 
  },
  bottomSection: {
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 20, 
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
  disabledButton: {
    backgroundColor: '#A0A0A0', // Cinza quando desativado
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});