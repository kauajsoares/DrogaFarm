import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 1. Importe as telas do fluxo de Onboarding
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen'; 
import CadastroScreen from './src/screens/CadastroScreen'; 
import CadastroVeiculoScreen from './src/screens/CadastroVeiculosScreen';

// 2. Importe o seu NOVO Navegador de Abas
import MainTabNavigator from './src/navigation/MainTabNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        
        {/* Telas do fluxo de Onboarding/Login */}
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Entrar' }} 
        />
        <Stack.Screen 
          name="Cadastro" 
          component={CadastroScreen} 
          options={{ title: 'Criar Conta' }} 
        />
        <Stack.Screen 
          name="CadastroVeiculo" 
          component={CadastroVeiculoScreen} 
          options={{ title: 'Complete seu Cadastro' }}
        />

        {/* MUDANÇA AQUI: Adicionamos o Tab Navigator como uma "tela" */}
        {/* O usuário será enviado para cá após o login */}
        <Stack.Screen 
          name="MainApp" // Este é o nome que usamos para navegar (no Login/Cadastro)
          component={MainTabNavigator} // Ele carrega o Tab Navigator
          options={{ headerShown: false }} // Oculta o header da "pilha"
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

