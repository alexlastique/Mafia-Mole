import { Text, View , StyleSheet, Image, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import Pub from "../components/Pub";
import ParameterButton from "../components/ParameterButton";
import PopupGameStat from "../components/PopupGameStat";
import PlayerItem from "@/components/PlayerItem";

interface Player {
  id: number;
  name: string;
  status: string;
  skin: string;
  premium: boolean;
}

const apiIP = process.env.EXPO_PUBLIC_API_IP;

export default function Index() {
    const [popupGameVisisble, setPopupGameVisible] = useState(false);
    const [listePlayer, setListePlayer] = useState<Player[]>([]);
    const [ws, setWs] = useState<WebSocket | null>(null);
    const { roomId } = useLocalSearchParams();
    const roomString = Array.isArray(roomId) ? roomId[0] : roomId;
    const [maxPlayer, setMaxPlayer] = useState(11);

    useEffect(() => {
      if (!roomString) {
        console.log("Invalid roomId for websocket connection");
        return;
      }

      const socket = new WebSocket(`ws://${apiIP}:8000/ws?roomId=${encodeURIComponent(roomString)}`);
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.playerInRoom) {
            setListePlayer(data.playerInRoom);
          } else if (data.start) {
            socket.close();
            router.push({
              pathname: "/game",
              params: {
                roomId: roomString,
              },
            });
          }
        } catch (e) {
          console.log("WebSocket message parsing error:", e);
        }
      };

      socket.onopen = () => {
        console.log("WebSocket connecté pour la room", roomString);
      };

      socket.onerror = (event) => {
        console.log("WebSocket error:", event);
      };

      socket.onclose = () => {
        console.log("WebSocket fermé pour la room", roomString);
      };

      setWs(socket);

      return () => {
        socket.close();
        setWs(null);
      };
    }, [roomString]);

    useEffect(() => {
      if (!roomString) {
        console.log("Invalid roomId for join request");
        return;
      }

      (async () => {
        try {
          const res = await fetch(`http://${apiIP}:8000/room/join/${roomString}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_user: 2 }),
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          setMaxPlayer(data.maxPlayers || 10);
          setListePlayer(data.playerInRoom || []);
        } catch (e) {
          console.log("room fetch error", e);
        }
      })();
    }, [roomString]);

    async function disconnectRoom(roomId?: string | string[], currentUserId: number = 2) {
      const roomString = Array.isArray(roomId) ? roomId[0] : roomId;
      if (!roomString) {
        console.log("disconnectRoom missing or invalid roomId");
        return;
      }

      console.log("Attempting to quit room...");
      try {
        const res = await fetch(`http://${apiIP}:8000/room/quit/${roomString}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_user: currentUserId }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.close();
        }
        router.back();
      } catch (e) {
        console.log("room quit error", e);
      }
    }

    async function startGame(roomId?: string | string[]) {
      const roomString = Array.isArray(roomId) ? roomId[0] : roomId;
      if (!roomString) {
        console.log("startGame missing or invalid roomId");
        return;
      }

      console.log("Attempting to start game...");
      try {
        const res = await fetch(`http://${apiIP}:8000/room/start/${roomString}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      } catch (e) {
        console.log("room start error", e);
      }
    }

    
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: 50,
      }}
    >
      <Pressable
        onPress={() => disconnectRoom(roomId)}
        style={{ width: 43, height: 43, position: 'absolute', top: 10, left: 10 }}
      >
        <Image 
            source={require('@/assets/images/Back.png')}
            style={{ width: 43, height: 43, position: 'absolute', top: 10, left: 10 }}
        />
      </Pressable>
      <View style={{ marginTop: 30, marginBottom: 16, zIndex: 1000 }}>
        <Image 
          source={require('@/assets/images/Lobby.png')}
          style={{ width: 188, height: 36, zIndex: 1000 }}
        />
      </View>
      <ParameterButton />
      {/* <Pressable
        onPress={() => setPopupGameVisible(true)}>
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 20, backgroundColor: '#A4A2B4', paddingHorizontal: 12, paddingVertical: 9, borderRadius: 100 }}>Configuration</Text>
      </Pressable> */}
      <View style={{ borderBottomWidth: 5, borderColor: '#A4A2B4', width: 393, marginTop: 24 }} />

      <View>
        <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: 20, marginBottom: 12 }}>Joueurs {listePlayer.length}/{maxPlayer}</Text>
        {listePlayer.map((player) => (
          <PlayerItem key={player.id} Player={player} />
        ))}
      </View>
      
      <View style={{ borderBottomWidth: 5, borderColor: '#A4A2B4', width: 393, marginTop: 24 }} />

      <Pressable
        onPress={() => startGame(roomId)}
        style={{ marginTop: 23 }}>
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 28, backgroundColor: '#21B83D', paddingHorizontal: 77, paddingVertical: 15, borderRadius: 100 }}>Lancer la partie</Text>
      </Pressable>

      {/* Emplacement de pub */}
      <Pub />
      <PopupGameStat
        visible={popupGameVisisble}
        onClose={() => setPopupGameVisible(false)}
      />
    </View>
  );
}
