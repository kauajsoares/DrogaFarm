import { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  Home: undefined;
  Extrato: undefined;
  Ajuda: undefined;
  Perfil: undefined;
};

export type RootStackParamList = {
  Welcome: undefined; 
  Login: undefined;
  Cadastro: undefined;
  CadastroVeiculo: undefined;

  CadastroBancario: undefined;
  
  MainApp: NavigatorScreenParams<MainTabParamList>;

  NovaEntrega: undefined;
  Notificacoes: undefined;
  RotaColeta: undefined; 
  ConfirmarColeta: undefined; 
  RotaEntrega: undefined;
  ConfirmarEntrega: undefined; 
  RotaConcluida: undefined;

  DadosCadastro: undefined;
  ContatoEmergencia: undefined;
};