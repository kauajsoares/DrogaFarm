import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert,
  Image // 1. Importamos o componente Image
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

import { auth, db } from '../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

type DadosCadastroNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DadosCadastro'>;

type Props = {
  navigation: DadosCadastroNavigationProp;
};

interface UserData {
  nome: string;
  sobrenome: string;
  email: string;
  cpf: string;
  telefone: string;
  fotoPerfil?: string; // 2. Adicionamos o campo opcional para a foto
  veiculo?: {
    tipo: string;
    modelo: string;
    placa?: string;
    cor?: string;
    detalhes?: string;
  };
  dadosBancarios?: {
    banco: string;
    agencia: string;
    conta: string;
  };
}

const InfoItem: React.FC<{label: string, value: string, isLast?: boolean}> = ({ label, value, isLast = false }) => (
  <View style={[styles.infoItem, isLast && styles.lastInfoItem]}> 
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

export default function DadosCadastroScreen({ navigation }: Props) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        
        if (!user) {
          Alert.alert('Erro', 'Usuário não encontrado.');
          navigation.goBack();
          return;
        }

        const docRef = doc(db, "entregadores", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData);
        } else {
          console.log("Documento não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        Alert.alert('Erro', 'Falha ao carregar perfil.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const getVeiculoString = () => {
    if (!userData?.veiculo) return "Não informado";
    
    const { tipo, modelo, placa, cor, detalhes } = userData.veiculo;
    const tipoFormatado = tipo.charAt(0).toUpperCase() + tipo.slice(1);
    
    if (tipo === 'moto') {
      return `${tipoFormatado} - ${modelo} (${placa || detalhes})`;
    } else {
      return `${tipoFormatado} - ${modelo} ${cor ? `- ${cor}` : ''}`;
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerLoading]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  const nomeCompleto = userData ? `${userData.nome} ${userData.sobrenome}` : '-';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="chevron-left" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dados de Cadastro</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <Text style={styles.profileName}>
            Olá, {userData?.nome || 'Entregador'}
          </Text>
          
          {/* 3. Exibição Condicional da Foto */}
          {userData?.fotoPerfil ? (
            <Image source={{ uri: userData.fotoPerfil }} style={styles.profilePic} />
          ) : (
            <View style={[styles.profilePic, styles.placeholderPic]}>
               {/* Se não tiver foto, mostra um placeholder cinza ou ícone */}
            </View>
          )}
        </View>

        <View style={styles.infoCard}>
          <InfoItem label="Nome Completo" value={nomeCompleto} />
          <InfoItem label="Telefone" value={userData?.telefone || '-'} />
          <InfoItem label="CPF" value={userData?.cpf || '-'} />
          <InfoItem label="e-mail" value={userData?.email || '-'} />
          <InfoItem label="Veículo" value={getVeiculoString()} isLast={true}/>
        </View>

        {userData?.dadosBancarios && (
          <View style={[styles.infoCard, { marginTop: 20 }]}>
             <Text style={styles.sectionTitle}>Dados Bancários</Text>
             <InfoItem label="Banco" value={userData.dadosBancarios.banco} />
             <InfoItem label="Agência" value={userData.dadosBancarios.agencia} />
             <InfoItem label="Conta" value={userData.dadosBancarios.conta} isLast={true} />
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  centerLoading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#E0E0E0',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0E0E0',
  },
  // Estilo para centralizar se for placeholder
  placeholderPic: {
    backgroundColor: '#E0E0E0', 
  },
  infoCard: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  infoItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
  },
  lastInfoItem: {
    borderBottomWidth: 0,
  },
  infoLabel: {
    fontSize: 14,
    color: '#555',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    marginTop: 5,
    textTransform: 'uppercase',
  },
});