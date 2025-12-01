import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';

import { RootStackParamList } from './src/navigation/types';

import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import CadastroVeiculoScreen from './src/screens/CadastroVeiculosScreen'; 
import CadastroBancarioScreen from './src/screens/CadastroBancarioScreen';
import NovaEntregaScreen from './src/screens/NovaEntregaScreen';
import NotificacoesScreen from './src/screens/NotificacoesScreen';
import RotaColetaScreen from './src/screens/RotaColetaScreen'; 
import ConfirmarColetaScreen from './src/screens/ConfirmarColetaScreen';
import RotaEntregaScreen from './src/screens/RotaEntregaScreen';
import ConfirmarEntregaScreen from './src/screens/ConfirmarEntregaScreen';
import RotaConcluidaScreen from './src/screens/RotaConcluidaScreen';
import DadosCadastroScreen from './src/screens/DadosCadastroScreen';
import ContatoEmergenciaScreen from './src/screens/ContatoEmergenciaScreen';

import MainTabNavigator from './src/navigation/MainTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        
        <Stack.Group>
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
          
          {/* 2. MUDANÇA AQUI: Adicione a tela na pilha */}
          <Stack.Screen 
            name="CadastroBancario" 
            component={CadastroBancarioScreen} 
            options={{ title: 'Dados Bancários' }}
          />

          <Stack.Screen 
            name="MainApp"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Notificacoes" 
            component={NotificacoesScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="RotaColeta"
            component={RotaColetaScreen}
            options={{ title: "Indo para a Coleta" }}
          />
          
          <Stack.Screen
            name="ConfirmarColeta"
            component={ConfirmarColetaScreen}
            options={{ title: "Confirmar Coleta" }}
          />

          <Stack.Screen
            name="RotaEntrega"
            component={RotaEntregaScreen}
            options={{ title: "Indo para a Entrega" }}
          />
          
          <Stack.Screen
            name="ConfirmarEntrega"
            component={ConfirmarEntregaScreen}
            options={{ title: "Confirmar Entrega" }}
          />

          <Stack.Screen
            name="RotaConcluida"
            component={RotaConcluidaScreen}
            options={{ headerShown: false }} 
          />
          
          <Stack.Screen
            name="DadosCadastro"
            component={DadosCadastroScreen}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen
            name="ContatoEmergencia"
            component={ContatoEmergenciaScreen}
            options={{ headerShown: false }}
          />

        </Stack.Group>

        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen 
            name="NovaEntrega" 
            component={NovaEntregaScreen} 
            options={{ headerShown: false }}
          />
        </Stack.Group>

      </Stack.Navigator>
    </NavigationContainer>
  );
}