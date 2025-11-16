import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type DadosCadastroNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DadosCadastro'>;

type Props = {
  navigation: DadosCadastroNavigationProp;
};

const InfoItem: React.FC<{label: string, value: string, isLast?: boolean}> = ({ label, value, isLast = false }) => (
  <View style={[styles.infoItem, isLast && styles.lastInfoItem]}> 
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

export default function DadosCadastroScreen({ navigation }: Props) {
  
  const userData = {
    nome: "Entregador da Silva",
    telefone: "(xx) x xxxx-xxx",
    cpf: "xxx.xxx.xxx-xx",
    email: "entregador@email.com",
    veiculo: "Moto - ABC 1234",
  };

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
        {/* Header do Perfil */}
        <View style={styles.profileHeader}>
          <Text style={styles.profileName}>Olá, nome do entregador</Text>
          <View style={styles.profilePic} />
        </View>

        {/* Card de Informações */}
        <View style={styles.infoCard}>
          <InfoItem label="Nome Completo" value={userData.nome} />
          <InfoItem label="Telefone" value={userData.telefone} />
          <InfoItem label="CPF" value={userData.cpf} />
          <InfoItem label="e-mail" value={userData.email} />
          <InfoItem label="Tipo de Veículo" value={userData.veiculo} isLast={true} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
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
  infoCard: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 20,
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
});