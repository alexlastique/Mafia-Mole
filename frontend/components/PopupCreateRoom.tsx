import { Text, View, TouchableOpacity, Modal, StyleSheet, ScrollView } from "react-native";

type PopupCreateRoomProps = {
  visible: boolean;
  onClose: () => void;
};

export default function PopupCreateRoom({ visible, onClose }: PopupCreateRoomProps) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
      style={{ position: 'relative' }}
    >
        <View>
            <View style={styles.card}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
                <ScrollView>
                    <Text>
                        {`Popup création de room `}
                    </Text>
                </ScrollView>
            </View>
        </View>
        <TouchableOpacity onPress={onClose}>
            <View style={styles.background}></View>
        </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        top: -1000,
        left: 0,
        width: 1000,
        height: 10000,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: -1,
    },
    card: {
        position: 'relative',
        top: '60%',
        left: '50%',
        transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
        width: 374,
        height: "80%",
        backgroundColor: '#DBD8F0',
        padding: 30,
        zIndex: 1,
        borderRadius: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 5,
        right: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        backgroundColor: '#FFF',
        borderRadius: 100,
    },
    closeButtonText: {
        fontSize: 24,
    },
});