import React from 'react';
// 1. Importar os componentes necessários, incluindo ScrollView, TouchableOpacity e Linking
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Linking // Para abrir o e-mail
} from 'react-native';

// 2. Importar os tipos de navegação (já estava correto)
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../navigation/types';

// 3. Definir o tipo para os dados do Ticket
type Ticket = {
  id: string;
  motivo: string;
  descricao: string;
  status: 'Resolvido' | 'Pendente'; // Usamos um tipo literal
};

// 4. Dados de exemplo (mock)
const mockTickets: Ticket[] = [
  {
    id: '001',
    motivo: 'xxxxxxxxxxxxxxxxx',
    descricao: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    status: 'Resolvido',
  },
  {
    id: '002',
    motivo: 'xxxxxxxxxxxxxxxxx',
    descricao: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    status: 'Pendente',
  },
];

// 5. Definir os tipos das props da tela (já estava correto)
type AjudaScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Ajuda'>;

type Props = {
  navigation: AjudaScreenNavigationProp;
};

// 6. Componente reutilizável para o Card do Ticket
const TicketCard: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
  // Define o estilo do status com base no valor
  const statusStyle =
    ticket.status === 'Resolvido'
      ? styles.statusResolvido
      : styles.statusPendente;

  return (
    <View style={styles.ticketCard}>
      <Text style={styles.ticketTitle}>Ticket #{ticket.id}</Text>
      <Text style={styles.ticketMotivo}>Motivo do contato: {ticket.motivo}</Text>
      <Text style={styles.ticketDesc}>{ticket.descricao}</Text>
      <Text style={styles.ticketStatus}>
        Status: <Text style={statusStyle}>{ticket.status}</Text>
      </Text>
    </View>
  );
};

// 7. Componente principal da tela
export default function AjudaScreen({ navigation }: Props) {

  // Função para abrir o cliente de e-mail
  const handleEmailPress = () => {
    Linking.openURL('mailto:contato@drogafarm.com');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho personalizado (como no protótipo, mas sem o "voltar") */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ajuda</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Link de E-mail */}
        <TouchableOpacity onPress={handleEmailPress}>
          <Text style={styles.emailLink}>
            Fale Conosco: contato@drogafarm.com
          </Text>
        </TouchableOpacity>

        {/* Lista de Tickets */}
        {mockTickets.map(ticket => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// 8. Estilos atualizados para o novo layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Fundo branco
  },
  header: {
    width: '100%',
    backgroundColor: '#E0E0E0', // Cinza do protótipo
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContainer: {
    padding: 20,
  },
  emailLink: {
    fontSize: 16,
    color: '#000000ff', // Azul para links
    textAlign: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: '#00ffffff',
    borderRadius: 8,
    fontWeight: 'bold'
  },
  ticketCard: {
    backgroundColor: '#F0F0F0', // Cinza claro
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  ticketMotivo: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  ticketDesc: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  ticketStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  statusResolvido: {
    color: 'green',
  },
  statusPendente: {
    color: '#FF8C00', // Laranja
  },
});

