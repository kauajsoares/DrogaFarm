import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons'; // Para o ícone de sucesso
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, MainTabParamList } from '../navigation/types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type RotaConcluidaNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'RotaConcluida'>,
  BottomTabNavigationProp<MainTabParamList>
>;

type Props = {
  navigation: RotaConcluidaNavigationProp;
};


export default function RotaConcluidaScreen({ navigation }: Props) {

  const handleContinuar = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainApp' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        
        <Feather name="check-circle" size={80} color="#4CAF50" />
        
        <Text style={styles.title}>Oba, mais uma rota concluída!</Text>
        
        <Text style={styles.subtitle}>Você ganhou:</Text>
        <Text style={styles.value}>R$ 00,00</Text>

      </View>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleContinuar}>
          <Text style={styles.actionButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginTop: 30,
  },
  value: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  bottomButtonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },
  actionButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});