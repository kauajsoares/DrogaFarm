import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';

// 1. Importar os tipos que definimos
import { RootStackParamList } from './src/navigation/types';

// 2. Importe as telas .tsx
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import CadastroVeiculosScreen from './src/screens/CadastroVeiculosScreen'; // Com 's'
import NovaEntregaScreen from './src/screens/NovaEntregaScreen';
import NotificacoesScreen from './src/screens/NotificacoesScreen';
import RotaColetaScreen from './src/screens/RotaColetaScreen'; 
import ConfirmarColetaScreen from './src/screens/ConfirmarColetaScreen';
import RotaEntregaScreen from './src/screens/RotaEntregaScreen';
import ConfirmarEntregaScreen from './src/screens/ConfirmarEntregaScreen';
import RotaConcluidaScreen from './src/screens/RotaConcluidaScreen';
import DadosCadastroScreen from './src/screens/DadosCadastroScreen';

// 3. MUDANÇA AQUI: Importamos a tela real
import ContatoEmergenciaScreen from './src/screens/ContatoEmergenciaScreen';

// 4. Importe o seu Navegador de Abas
import MainTabNavigator from './src/navigation/MainTabNavigator';

// 5. Crie o Stack Navigator com os tipos
const Stack = createNativeStackNavigator<RootStackParamList>();

// 6. MUDANÇA AQUI: Removemos o placeholder de 'ContatoEmergencia'

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        
        {/* Agrupamos as telas normais */}
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
            component={CadastroVeiculosScreen} // Com 's'
            options={{ title: 'Complete seu Cadastro' }}
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
            options={{ headerShown: false }} // O cabeçalho é personalizado
          />
          
          {/* 7. MUDANÇA AQUI: Usamos o componente real */}
          <Stack.Screen
            name="ContatoEmergencia"
            component={ContatoEmergenciaScreen}
            options={{ headerShown: false }} // O cabeçalho é personalizado
          />

        </Stack.Group>

        {/* Agrupamos as telas Modais */}
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