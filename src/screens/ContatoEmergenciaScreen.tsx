import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  ActivityIndicator,
  Alert,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

import { auth, db } from '../services/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

type ContatoEmergenciaNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ContatoEmergencia'>;

type Props = {
  navigation: ContatoEmergenciaNavigationProp;
};

interface Contato {
  nome: string;
  telefone: string;
  parentesco: string;
}

const RELATIONSHIP_OPTIONS = ['Mãe', 'Pai', 'Irmão', 'Amigo', 'Outro'];

const formatTelefone = (text: string) => {
  const digits = text.replace(/\D/g, '').slice(0, 11); 
  if (digits.length <= 2) return digits;
  if (digits.length <= 3) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
  if (digits.length <= 7) return `${digits.slice(0, 2)} ${digits.slice(2, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 2)} ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`; 
};

const InfoItem: React.FC<{label: string, value: string}> = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const ContatoCard: React.FC<{
  contato: Contato, 
  onEdit: () => void, 
  onDelete: () => void
}> = ({ contato, onEdit, onDelete }) => (
  <View style={styles.infoCard}>
    <InfoItem label="Nome" value={contato.nome} />
    <InfoItem label="Telefone" value={contato.telefone} />
    <InfoItem label="Parentesco" value={contato.parentesco} />
    
    <View style={styles.cardActions}>
      <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
        <Feather name="edit-2" size={14} color="#007AFF" />
        <Text style={[styles.actionText, { color: '#007AFF' }]}>Editar</Text>
      </TouchableOpacity>
      <View style={styles.actionDivider} />
      <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
        <Feather name="trash-2" size={14} color="#FF3B30" />
        <Text style={[styles.actionText, { color: '#FF3B30' }]}>Excluir</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function ContatoEmergenciaScreen({ navigation }: Props) {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userName, setUserName] = useState('Entregador');

  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [selectedRelation, setSelectedRelation] = useState('');
  const [customRelation, setCustomRelation] = useState('');

  useEffect(() => {
    const fetchContatos = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const docRef = doc(db, "entregadores", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserName(data.nome || 'Entregador');
          if (data.contatosEmergencia) {
            setContatos(data.contatosEmergencia);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar contatos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContatos();
  }, []);

  const saveToFirebase = async (novaLista: Contato[]) => {
    const user = auth.currentUser;
    if (!user) return;
    const userRef = doc(db, "entregadores", user.uid);
    await updateDoc(userRef, {
      contatosEmergencia: novaLista
    });
  };

  const handleSaveContact = async () => {
    const finalRelation = selectedRelation === 'Outro' ? customRelation : selectedRelation;

    if (!newName.trim() || !newPhone.trim() || !finalRelation.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    setSaving(true);

    try {
      const novoContato: Contato = {
        nome: newName,
        telefone: newPhone,
        parentesco: finalRelation
      };

      let novaLista = [...contatos];

      if (editingIndex !== null) {
        novaLista[editingIndex] = novoContato;
      } else {
        novaLista.push(novoContato);
      }

      await saveToFirebase(novaLista);
      setContatos(novaLista);
      resetForm();

    } catch (error) {
      console.error("Erro ao salvar:", error);
      Alert.alert('Erro', 'Não foi possível salvar o contato.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (index: number) => {
    const c = contatos[index];
    setNewName(c.nome);
    setNewPhone(c.telefone);
    
    if (RELATIONSHIP_OPTIONS.includes(c.parentesco)) {
      setSelectedRelation(c.parentesco);
      setCustomRelation('');
    } else {
      setSelectedRelation('Outro');
      setCustomRelation(c.parentesco);
    }

    setEditingIndex(index);
    setIsAdding(true);
  };

  const handleDelete = (index: number) => {
    Alert.alert(
      "Excluir Contato",
      "Tem certeza que deseja remover este contato?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive",
          onPress: async () => {
            const novaLista = contatos.filter((_, i) => i !== index);
            setContatos(novaLista);
            await saveToFirebase(novaLista);
          }
        }
      ]
    );
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingIndex(null);
    setNewName('');
    setNewPhone('');
    setSelectedRelation('');
    setCustomRelation('');
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="chevron-left" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contatos de Emergência</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.profileHeader}>
            <Text style={styles.profileName}>Olá, {userName.split(' ')[0]}</Text>
            <View style={styles.profilePic} />
          </View>

          {isAdding ? (
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>
                {editingIndex !== null ? 'Editar Contato' : 'Novo Contato'}
              </Text>
              
              <Text style={styles.label}>Nome</Text>
              <TextInput 
                style={styles.input} 
                value={newName}
                onChangeText={setNewName}
                placeholder="Nome do contato"
              />

              <Text style={styles.label}>Telefone</Text>
              <TextInput 
                style={styles.input} 
                value={newPhone}
                onChangeText={(t) => setNewPhone(formatTelefone(t))}
                placeholder="(XX) X XXXX-XXXX"
                keyboardType="numeric"
                maxLength={16}
              />

              <Text style={styles.label}>Parentesco</Text>
              <View style={styles.chipsContainer}>
                {RELATIONSHIP_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.chip,
                      selectedRelation === option && styles.chipSelected
                    ]}
                    onPress={() => setSelectedRelation(option)}
                  >
                    <Text style={[
                      styles.chipText,
                      selectedRelation === option && styles.chipTextSelected
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {selectedRelation === 'Outro' && (
                <TextInput 
                  style={[styles.input, { marginTop: 10 }]} 
                  value={customRelation}
                  onChangeText={setCustomRelation}
                  placeholder="Qual o parentesco?"
                />
              )}

              <View style={styles.formButtons}>
                <TouchableOpacity style={styles.cancelButton} onPress={resetForm}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.saveButton} 
                  onPress={handleSaveContact}
                  disabled={saving}
                >
                  {saving ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <Text style={styles.saveButtonText}>Salvar</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              {contatos.length === 0 ? (
                <Text style={styles.emptyText}>Nenhum contato de emergência cadastrado.</Text>
              ) : (
                contatos.map((contato, index) => (
                  <ContatoCard 
                    key={index} 
                    contato={contato} 
                    onEdit={() => handleEdit(index)}
                    onDelete={() => handleDelete(index)}
                  />
                ))
              )}

              <TouchableOpacity style={styles.addButton} onPress={() => setIsAdding(true)}>
                <Feather name="plus" size={24} color="white" />
                <Text style={styles.addButtonText}>Adicionar Contato</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#E0E0E0',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0E0E0',
  },
  infoCard: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    padding: 20,
    paddingBottom: 10, 
    marginBottom: 15,
  },
  infoItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
    marginBottom: 5,
  },
  lastInfoItem: {
    borderBottomWidth: 0,
  },
  infoLabel: {
    fontSize: 14,
    color: '#555',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 2,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginLeft: 10,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  actionDivider: {
    width: 1,
    height: 15,
    backgroundColor: '#BBB',
    marginLeft: 10,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F4F4F4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  chipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  chipText: {
    fontSize: 14,
    color: '#555',
  },
  chipTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#34C759',
    borderRadius: 8,
    marginLeft: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});