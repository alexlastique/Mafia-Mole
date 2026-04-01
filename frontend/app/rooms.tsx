import { Text, View , StyleSheet, Image, Pressable } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import Pub from "../components/Pub";
import BackButton from "../components/BackButton";
import ParameterButton from "../components/ParameterButton";
import PopupGameStat from "../components/PopupGameStat";
import PlayerItem from "@/components/PlayerItem";

export default function Index() {
    const [popupGameVisisble, setPopupGameVisible] = useState(false);
    let listePlayer = [
      { id: 1, name: 'Glouby', status: 'host' , skin: 'default', premium: false },
      { id: 2, name: 'Orphéon', status: 'invite' , skin: 'skin2', premium: false  },
      { id: 3, name: 'Sicarius', status: 'invite' , skin: 'default', premium: false  },
      { id: 4, name: 'Zokar', status: 'invite' , skin: 'default', premium: true  },
    ];
    let maxPlayer = 10;
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: 50,
      }}
    >
      <BackButton />
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
        onPress={() => router.push('/parametres')}
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
