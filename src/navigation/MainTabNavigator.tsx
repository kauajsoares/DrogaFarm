import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'; // Importa os ícones

// 1. Importar os tipos que definimos
import { MainTabParamList } from './types';

// 2. Importe as telas .tsx
import HomeScreen from '../screens/HomeScreen';
import ExtratoScreen from '../screens/ExtratoScreen';
import AjudaScreen from '../screens/AjudaScreen';
import PerfilScreen from '../screens/PerfilScreen';

// 3. Tipar o Tab Navigator
const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Define o ícone com base no nome da rota
        tabBarIcon: ({ focused, color, size }) => {
          
          // 4. Tipamos o 'iconName' de forma segura
          let iconName: React.ComponentProps<typeof Feather>['name'];

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Extrato') { // O nome da rota é 'Extrato'
            iconName = 'dollar-sign';
          } else if (route.name === 'Ajuda') {
            iconName = 'help-circle';
          } else if (route.name === 'Perfil') {
            iconName = 'user';
          } else {
            iconName = 'circle'; // Um ícone padrão
          }

          // Retorna o componente de ícone
          return <Feather name={iconName} size={size} color={color} />;
        },
        // Cor do ícone ativo e inativo
        tabBarActiveTintColor: '#007AFF', // Azul
        tabBarInactiveTintColor: 'gray',
        // Oculta o cabeçalho (header) em todas as telas da Tab
        headerShown: false, 
      })}
    >
      {/* 5. Verifique os nomes das rotas. Eles devem bater com o 'types.ts' */}
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Tab.Screen name="Extrato" component={ExtratoScreen} options={{ title: 'Ganhos' }} />
      <Tab.Screen name="Ajuda" component={AjudaScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}