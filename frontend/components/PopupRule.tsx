import { Text, View, TouchableOpacity, Modal, StyleSheet, ScrollView } from "react-native";

type PopupRuleProps = {
  visible: boolean;
  onClose: () => void;
};

export default function PopupRule({ visible, onClose }: PopupRuleProps) {
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
                        {`🕶️ MAFIA MOLE : RÈGLES DU JEU 
                        
🚩 PRÉPARATION (LE PARRAIN)
L'hôte crée le Réseau, délimite le Territoire et place les Points d'Intérêt (POI) sur la carte. Les rôles sont distribués secrètement par l'application.

💰 L'ORGANISATION (LES MAFIEUX)
- Objectif : Finaliser tous les trafics ou démasquer les infiltrés.
- Missions : Déplacez-vous physiquement vers les POI pour valider vos transactions sur l'appli.
- Alerte : Si vous croisez un membre "éliminé", signalez-le immédiatement sur votre écran.
- Conseil de Famille : Discutez et votez pour éliminer un suspect lors des réunions.

🚔 LES TAUPE (FLICS INFILTRÉS)
- Objectif : Démanteler l'organisation sans se faire repérer.
- Arrestation : Approchez-vous d'un joueur pour activer le bouton "Éliminer" (soumis à un temps de recharge).
- Sabotage & Bluff : Simulez la réalisation de missions et détournez les soupçons durant les conseils.

📢 RÉUNIONS ET JUGEMENT
- Dès qu'un corps est signalé ou qu'une réunion d'urgence est lancée :
- Débat : Échangez vos informations (positions, comportements suspects).
- Sentence : Désignez un coupable ou passez votre tour (Skip). Le joueur ayant la majorité est "exclu" de la famille.

🏆 FIN DE PARTIE
- Victoire Mafia : Toutes les missions sont finies OU toutes les taupes sont hors d'état de nuire.
- Victoire Infiltrés : Il reste autant de flics que de mafieux survivants.

⚠️ RÈGLE D'OR : Une fois éliminé, vous devenez un "Ombre". Vous ne devez plus parler ni interférer avec les membres encore en jeu.`}
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