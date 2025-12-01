import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types'; // (Vamos criar este arquivo)

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};


export default function WelcomeScreen({ navigation }: Props) {
  
  // Função para navegar para a tela de Login
  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleCadastroPress = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topSection}>
        <MaterialCommunityIcons name="racing-helmet" size={120} color="black" />
        <Text style={styles.title}>DrogaFarm {"\n"}para Entregadores</Text>
      </View>

      {/* Parte de BAIXO (Branca) */}
      <View style={styles.bottomSection}>
        {/* Botão "Entrar" */}
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Botão "Cadastrar" */}
        <TouchableOpacity style={styles.button} onPress={handleCadastroPress}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00ffffff', // Cor de fundo Ciano/Azul
  },
  topSection: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  bottomSection: {
    flex: 0.4,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  button: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
});
