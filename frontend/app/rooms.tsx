import { Text, View , StyleSheet, Image, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
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

const ws = new WebSocket("ws://26.169.50.207:8000/ws");

async function disconnectRoom(roomId: number = 1, currentUserId: number =2) {
  console.log("Attempting to quit room...");
  try {
    const res = await fetch(`http://26.169.50.207:8000/room/quit/${roomId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_user: currentUserId }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    ws.close();
    router.back();
  } catch (e) {
    console.log("room quit error", e);
  }
}

async function startGame(roomId: number = 1) {
  console.log("Attempting to start game...");
  try {
    const res = await fetch(`http://26.169.50.207:8000/room/start/${roomId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (e) {
    console.log("room start error", e);
  }
}


export default function Index() {
    const [popupGameVisisble, setPopupGameVisible] = useState(false);
    const [listePlayer, setListePlayer] = useState<Player[]>([]);

    ws.onmessage = (event) => {
      try {
        let data = JSON.parse(event.data);
        if (data.playerInRoom) {
          setListePlayer(data.playerInRoom);
        } else if (data.start) {
          ws.close();
          router.push('/game');
        }
      }catch (e) {
        console.log("WebSocket message parsing error:", e);
      }
    };

    useEffect(() => {
      (async () => {
        try {
          const res = await fetch("http://26.169.50.207:8000/room/join/1", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_user: 2 }),
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          setListePlayer(data.playerInRoom || []);
        } catch (e) {
          console.log("room fetch error", e);
        }
      })();
    }, []);

    let maxPlayer = 10;
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: 50,
      }}
    >
      <Pressable
        onPress={() => disconnectRoom()}
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
        onPress={() => startGame()}
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
