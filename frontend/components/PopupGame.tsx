import { Text, View, Pressable, Modal, StyleSheet, Platform } from "react-native";

type PopupGameProps = {
  visible: boolean;
  onClose: () => void;
  onJoin: () => void;
  onCreate: () => void;
};

export default function PopupGame({ visible, onClose, onJoin, onCreate }: PopupGameProps) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        
        <Pressable onPress={(e) => e.stopPropagation()} style={styles.cardContainer}>
          <View style={styles.card}>
            
            {/* Bouton de fermeture X */}
            <Pressable style={styles.closeCircle} onPress={onClose}>
              <Text style={styles.closeText}>X</Text>
            </Pressable>

            {/* Boutons d'action */}
            <Pressable style={[styles.actionButton, styles.btnJoin]} onPress={onJoin}>
              <Text style={styles.actionText}>REJOINDRE UNE PARTIE</Text>
            </Pressable>

            {/* <Pressable style={[styles.actionButton, styles.btnCreate]} onPress={onCreate}>
              <Text style={styles.actionText}>CRÉER UNE PARTIE</Text>
            </Pressable> */}
          </View>
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
  cardContainer: {
    width: "85%", // On définit la largeur ici pour que le clic soit bloqué sur toute la carte
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#D6D6E8",
    paddingVertical: 40,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: "center",
    position: "relative",
    // Bordure optionnelle pour coller à l'esthétique
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  closeCircle: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 30,
    height: 30,
    backgroundColor: "#FFF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  closeText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  actionButton: {
    width: "100%",
    paddingVertical: 18,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: "#000",
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  btnCreate: {
    backgroundColor: "#738ADB",
  },
  btnJoin: {
    backgroundColor: "#D16643",
  },
  actionText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
    fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier New',
  },
});