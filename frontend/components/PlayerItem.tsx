import { Text, View, StyleSheet, Image } from "react-native";

export default function PlayerItem( { Player }: { Player: { id: number, name: string, status: string , skin: string, premium: boolean } }) {
  const isHost = Player.status === "host";

  const getAvatar = () => {
    // if (Player.skin !== "default") {
    //   return "https://backend/assets/images/" + Player.skin + ".png";
    // }
    return require("../assets/images/default.png");
  };

  const you = { name: "Glouby", status: "host", premium: false }; // Remplacez par les données de l'utilisateur actuel
  const isYou = Player.name === you.name;

  return (
    <View style={{ marginBottom: 12, width: 388, height: 96 }}>
      <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: isYou ? "#BCBCBC" : "#FFFFFF", borderWidth: 5, borderColor: isYou ? "#6E6C78" : "#A4A2B4", width: 388, height: 96 }}>
        <View style={{ width: 74, height: 74, borderWidth: 5, borderColor: isYou ? "#6E6C78" : "#A4A2B4", marginLeft: 11 }}>
          <Image source={getAvatar()} style={{ width: 64, height: 64, resizeMode: "cover" }} />
        </View>

        <View style={{ flex: 1, marginLeft: 13 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000000" }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
              <Text style={{ fontSize: 14, color: "#555", letterSpacing: 1 }}>{Player.name.toUpperCase()}</Text>
              {Player.premium && <Image source={require("../assets/images/Premium.png")}/>}
              {isHost && <Text style={{ fontSize: 12, color: "#555" }}>{" "}(Admin)</Text>}
            </View>
          </Text>
        </View>

        {/* {you.status === "host" && !isHost && (
          <View style={{ width: 35, height: 35, borderRadius: 20, backgroundColor: "#eee", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 18, color: "#333" }}>⋮</Text>
          </View>
        )} */}
      </View>
    </View>
  );
}