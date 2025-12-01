import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  Image,
  ActivityIndicator 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '../navigation/types';

import { auth, db, storage } from '../services/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

type PerfilScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Perfil'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = {
  navigation: PerfilScreenNavigationProp;
};

const MenuItem: React.FC<{label: string, onPress: () => void}> = ({ label, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text style={styles.menuText}>{label}</Text>
    <Feather name="chevron-right" size={20} color="#888" />
  </TouchableOpacity>
);

export default function PerfilScreen({ navigation }: Props) {
  const [nomeEntregador, setNomeEntregador] = useState('Carregando...');
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
  const [loadingPhoto, setLoadingPhoto] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "entregadores", user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            const primeiroNome = data.nome || '';
            const sobrenome = data.sobrenome || '';
            const nomeCompleto = `${primeiroNome} ${sobrenome}`.trim();
            
            setNomeEntregador(nomeCompleto || 'Entregador');
            
            if (data.fotoPerfil) {
              setFotoPerfil(data.fotoPerfil);
            }
          }
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        setNomeEntregador('Entregador');
      }
    };

    fetchUserData();
  }, []);

  // Função auxiliar para converter URI em Blob de forma segura no RN
  const getBlobFromUri = async (uri: string): Promise<Blob> => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    return blob as Blob;
  };

  const uploadImage = async (uri: string) => {
    setLoadingPhoto(true);
    try {
      const user = auth.currentUser;
      if (!user) return;

      const blob = await getBlobFromUri(uri);
      const storageRef = ref(storage, `perfil/${user.uid}.jpg`);
      
      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);

      const userDocRef = doc(db, "entregadores", user.uid);
      await updateDoc(userDocRef, {
        fotoPerfil: downloadUrl
      });

      setFotoPerfil(downloadUrl);
      Alert.alert("Sucesso", "Foto de perfil atualizada!");

    } catch (error: any) {
      console.error("Erro no upload:", error);
      Alert.alert("Erro", "Falha ao enviar a imagem.");
    } finally {
      setLoadingPhoto(false);
    }
  };

  const handleChangePhoto = () => {
    Alert.alert(
      "Alterar Foto",
      "Escolha uma opção",
      [
        {
          text: "Câmera",
          onPress: async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert("Erro", "Precisamos de permissão para acessar a câmera.");
              return;
            }
            let result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.5,
              // CORREÇÃO AQUI: Usando MediaTypeOptions (com 's') se MediaType falhar
              mediaTypes: ImagePicker.MediaTypeOptions.Images, 
            });
            if (!result.canceled) {
              uploadImage(result.assets[0].uri);
            }
          }
        },
        {
          text: "Galeria",
          onPress: async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert("Erro", "Precisamos de permissão para acessar a galeria.");
              return;
            }
            let result = await ImagePicker.launchImageLibraryAsync({
              // CORREÇÃO AQUI: Usando MediaTypeOptions (com 's') se MediaType falhar
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.5,
            });
            if (!result.canceled) {
              uploadImage(result.assets[0].uri);
            }
          }
        },
        { text: "Cancelar", style: "cancel" }
      ]
    );
  };

  const handleLogout = () => {
    const stackNavigator = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();
    if (stackNavigator) {
      stackNavigator.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    }
  };

  const goToDados = () => {
    navigation.navigate('DadosCadastro'); 
  };
  
  const goToExtrato = () => {
    navigation.navigate('MainApp', { screen: 'Extrato' });
  };

  const goToEmergencia = () => {
    navigation.navigate('ContatoEmergencia');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profileHeader}>
          <Text style={styles.profileName}>{nomeEntregador}</Text>
          
          <TouchableOpacity onPress={handleChangePhoto} disabled={loadingPhoto}>
            {loadingPhoto ? (
              <View style={[styles.profilePic, styles.loadingContainer]}>
                <ActivityIndicator color="#007AFF" />
              </View>
            ) : (
              fotoPerfil ? (
                <Image source={{ uri: fotoPerfil }} style={styles.profilePic} />
              ) : (
                <View style={[styles.profilePic, styles.placeholderPic]}>
                  <Feather name="camera" size={30} color="#999" />
                </View>
              )
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          <MenuItem label="Dados de cadastro" onPress={goToDados} />
          <MenuItem label="Extrato" onPress={goToExtrato} />
          <MenuItem label="Contato de emergência" onPress={goToEmergencia} />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair (Logout)</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start', 
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  profileName: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 15,
    marginTop: 45, 
    textAlign: 'left', 
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
  },
  placeholderPic: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDD',
  },
  menuContainer: {
    marginTop: 20,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});