// 1. Precisamos importar 'NavigatorScreenParams'
import { NavigatorScreenParams } from '@react-navigation/native';

// 2. Lista de telas da Barra de Abas
export type MainTabParamList = {
  Home: undefined;
  Extrato: undefined; // O nome da rota é 'Extrato'
  Ajuda: undefined;
  Perfil: undefined;
};

// 3. Lista de todas as telas na sua pilha principal (Stack)
export type RootStackParamList = {
  Welcome: undefined; 
  Login: undefined;
  Cadastro: undefined;
  CadastroVeiculo: undefined;
  
  // 4. ESTA É A CORREÇÃO:
  // Dizemos que 'MainApp' pode receber parâmetros 
  // do tipo 'MainTabParamList'.
  MainApp: NavigatorScreenParams<MainTabParamList>;
};

