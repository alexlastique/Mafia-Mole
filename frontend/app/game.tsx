import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

const apiIP = process.env.EXPO_PUBLIC_API_IP;
const ws = new WebSocket(`ws://${apiIP}:8000/ws`);

export default function Game() {
  const router = useRouter();
  const [status, setStatus] = useState("En attente de jeu...");
  const { roomId } = useLocalSearchParams();
  const roomIdNumber = Number(roomId);

  ws.onmessage = (event) => {
      try {
          const parsed = JSON.parse(event.data);
          console.log("Received WebSocket message:", parsed);
          if (parsed.start) {
              setStatus("Jeu démarré");
          } else if (parsed.playerInRoom) {
              setStatus(`Joueurs en salle: ${parsed.playerInRoom.length}`);
          } else if (parsed.end) {
              setStatus("Jeu terminé");
              Alert.alert("Partie terminée", "Le signal de fin de jeu a été envoyé à tous les participants.");
          }
      } catch {
          console.log("Message non JSON reçu :", event.data);
      }
  };

  const endGame = async () => {
    if (!roomIdNumber || Number.isNaN(roomIdNumber)) {
      Alert.alert("Erreur", "ID de salle invalide.");
      return;
    }

    try {
      const res = await fetch(`http://${apiIP}:8000/room/finish/${roomIdNumber}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      setStatus("Fin de jeu déclenchée via API");
      Alert.alert("Partie terminée", "Le serveur a été notifié via /room/finish/{room_id}.");

      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ end: true, message: "La partie est terminée" }));
      }

    } catch (e) {
      console.warn("Erreur appel room/finish :", e);
      Alert.alert("Erreur API", "Impossible de terminer la partie. Vérifiez la connexion.");
      setStatus("Erreur lors de la finalisation de la partie");
    }
  };

  const goHome = () => {
    router.push("/");
  };

  const startShakerGame = () => {
    router.push({
      pathname: "/shakerGame",
      params: {
        roomId,
      },
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page game</Text>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.button}>
        <Button title="Faire le mini-jeu" onPress={startShakerGame} color="#d32f2f" />
      </View>
      <View style={styles.button}>
        <Button title="Terminer la game" onPress={endGame} color="#d32f2f" />
      </View>
      <View style={styles.button}>
        <Button title="Retour à l'accueil" onPress={goHome} color="#1976d2" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#dbd8f0",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
  },
  status: {
    fontSize: 16,
    marginBottom: 24,
  },
  button: {
    width: "100%",
    marginVertical: 8,
  },
});