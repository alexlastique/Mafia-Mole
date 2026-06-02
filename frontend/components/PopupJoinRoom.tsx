import { Text, View, Pressable, Modal, StyleSheet, TextInput, Platform } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

type PopupJoinProps = {
  visible: boolean;
  onClose: () => void;
};

export default function PopupJoinRoom({ visible, onClose }: PopupJoinProps) {
  const [code, setCode] = useState("");
  const router = useRouter(); // Initialisation du router

  const handlePressCommencer = () => {
    onClose();
    
    // shearch in bdd with backend if the room exist with the code, if not show an alert

    router.push({
      pathname: "/rooms",
      params: {
        roomId: code,
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
          <Text style={styles.title}>REJOINDRE</Text>

          {/* Ligne CODE + Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>CODE :</Text>
            <TextInput
              style={styles.input}
              value={code}
              onChangeText={setCode}
              autoCapitalize="characters"
            />
          </View>

          <Pressable 
            style={styles.btnCommencer} 
            onPress={handlePressCommencer}
          >
            <Text style={styles.btnCommencerText}>COMMENCER</Text>
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