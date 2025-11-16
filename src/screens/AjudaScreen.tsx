import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Linking 
} from 'react-native';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../navigation/types';

type Ticket = {
  id: string;
  motivo: string;
  descricao: string;
  status: 'Resolvido' | 'Pendente'; 
};

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

type AjudaScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Ajuda'>;

type Props = {
  navigation: AjudaScreenNavigationProp;
};

const TicketCard: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
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

export default function AjudaScreen({ navigation }: Props) {

  const handleEmailPress = () => {
    Linking.openURL('mailto:contato@drogafarm.com');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ajuda</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    width: '100%',
    backgroundColor: '#E0E0E0', 
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
    color: '#000000ff', 
    textAlign: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: '#00ffffff',
    borderRadius: 8,
    fontWeight: 'bold'
  },
  ticketCard: {
    backgroundColor: '#F0F0F0',
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
    color: '#FF8C00',
  },
});

