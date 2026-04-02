import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

const ws = new WebSocket("ws://10.0.2.2:8000/ws");

export default function Game() {
  const router = useRouter();
  const [status, setStatus] = useState("En attente de jeu...");

  useEffect(() => {
    ws.onopen = () => {
      setStatus("Connecté au serveur de jeu");
    };

    ws.onmessage = (event) => {
      const data = event.data;
      try {
        const parsed = JSON.parse(data);
        if (parsed.start) {
          setStatus("Jeu démarré");
        } else if (parsed.playerInRoom) {
          setStatus(`Joueurs en salle: ${parsed.playerInRoom.length}`);
        } else if (parsed.end) {
          setStatus("Jeu terminé");
        }
      } catch {
        console.log("Message non JSON reçu :", data);
      }
    };

    ws.onerror = (error) => {
      console.warn("Erreur WebSocket :", error);
      setStatus("Erreur de connexion WebSocket");
    };

    ws.onclose = () => {
      setStatus("Déconnecté du serveur de jeu");
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  const endGame = () => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ end: true, message: "La partie est terminée" }));
      setStatus("Signal de fin de jeu envoyé");
      Alert.alert("Partie terminée", "Le signal de fin de jeu a été envoyé à tous les participants.");
    } else {
      Alert.alert("WebSocket indisponible", "Impossible d'envoyer le signal maintenant.");
      setStatus("WebSocket non connecté");
    }
  };

  const goHome = () => {
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page game</Text>
      <Text style={styles.status}>{status}</Text>
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