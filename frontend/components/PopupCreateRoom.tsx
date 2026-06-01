import { useRouter } from "expo-router";
import { Text, View, TouchableOpacity, Modal, StyleSheet, ScrollView, Pressable, TextInput, Platform } from "react-native";
import { useState } from "react";
import { useGPSPosition } from "@/function/getGPSPosition";

const apiIP = process.env.EXPO_PUBLIC_API_IP;

type PopupCreateRoomProps = {
    visible: boolean;
    onClose: () => void;
};

export default function PopupCreateRoom({ visible, onClose }: PopupCreateRoomProps) {
    const [nbJoueurs, setNbJoueurs] = useState("10"); // Valeur par défaut à 10 joueurs
    const router = useRouter(); // Initialisation du router
    const { location, error, loading } = useGPSPosition(); // Utilisation du hook pour obtenir la position GPS
    const handlePressCréer = async () => {
        onClose();
        
        const roomId = Math.random().toString(36).substring(2, 8).toUpperCase(); // Génère un ID de room aléatoire de 6 caractères
        const latitude = location?.coords.latitude ?? 0;
        const longitude = location?.coords.longitude ?? 0;

        const response = await fetch(`http://${apiIP}:8000/room/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roomId, nbJoueurs, latitude, longitude })
        });
        if (!response.ok) {
            console.error("Erreur lors de la création de la room");
            return;
        }
        router.push({
            pathname: "/rooms",
            params: {
                roomId,
            },
        });
    };

    return (
      <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
        <Pressable style={styles.backdrop} onPress={onClose}>
          <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
            
            {/* Bouton X */}
            <Pressable style={styles.closeCircle} onPress={onClose}>
              <Text style={styles.closeText}>X</Text>
            </Pressable>
  
            {/* Titre */}
            <Text style={styles.title}>CRÉER UNE PARTIE</Text>
  
            {/* Ligne CODE + Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombre de joueurs :</Text>
              <TextInput
                style={styles.input}
                keyboardType = 'numeric'
                onChangeText={(text) => {
                    // Permet de n'avoir que des chiffres dans le TextInput
                    const numericValue = text.replace(/[^0-9]/g, '');
                    setNbJoueurs(numericValue);
                }}
                value={nbJoueurs}
              />
            </View>
  
            <Pressable 
              style={styles.btnCommencer} 
              onPress={handlePressCréer}
            >
              <Text style={styles.btnCommencerText}>CRÉER</Text>
            </Pressable>
  
          </Pressable>
        </Pressable>
      </Modal>
    );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(80, 80, 90, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 340,
    backgroundColor: "#D6D6E8",
    borderRadius: 25,
    padding: 25,
    alignItems: "center",
  },
  closeCircle: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 28,
    height: 28,
    backgroundColor: "#FFF",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: { fontWeight: "bold" },
  title: {
    fontSize: 40,
    fontWeight: "900",
    color: "#000",
    marginVertical: 20,
    fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier New',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 24,
    fontWeight: "800",
    marginRight: 10,
    fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier New',
  },
  input: {
    width: 120,
    height: 45,
    backgroundColor: "#FFF",
    borderWidth: 4,
    borderColor: "#000",
    borderRadius: 25,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  btnCommencer: {
    backgroundColor: "#22C55E",
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 25,
  },
  btnCommencerText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "700",
  },
});