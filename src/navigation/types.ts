import { NavigatorScreenParams } from '@react-navigation/native';

// Lista de telas da Barra de Abas
export type MainTabParamList = {
  Home: undefined;
  Extrato: undefined; // O nome da rota é 'Extrato'
  Ajuda: undefined;
  Perfil: undefined;
};

// Lista de todas as telas na sua pilha principal (Stack)
export type RootStackParamList = {
  Welcome: undefined; 
  Login: undefined;
  Cadastro: undefined;
  CadastroVeiculo: undefined;
  
  MainApp: NavigatorScreenParams<MainTabParamList>;

  // Telas Modais (por cima de tudo)
  NovaEntrega: undefined;
  Notificacoes: undefined;
  
  // Telas do Fluxo de Rota
  RotaColeta: undefined; 
  ConfirmarColeta: undefined; 
  RotaEntrega: undefined;
  ConfirmarEntrega: undefined; 
  RotaConcluida: undefined;

  // MUDANÇA AQUI: Novas telas do Perfil
  DadosCadastro: undefined;
  ContatoEmergencia: undefined;
};