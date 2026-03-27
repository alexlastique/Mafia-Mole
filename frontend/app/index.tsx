import { Text, View } from "react-native";
import { Image } from "expo-image";
import Tableau from "../components/tableau";
import Pub from "../components/Pub";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: 50,
      }}
    >
      <Image 
        source={require('@/assets/images/drapeau-france.png')}
        style={{ width: 34, height: 24, position: 'absolute', top: 10, left: 10 }}
      />
      <View style={{ marginTop: 45 + 34, marginBottom: 45 }}>
        <Image 
          source={require('@/assets/images/Mafia-Mole.svg')}
          style={{ width: 338, height: 150 }}
        />
      </View>
      <Tableau children={<Text>Contenu du tableau</Text>} />
      <Image
        source={require('@/assets/images/mafieux.png')}
        style={{ width: 100, height: 100 }}
      />
      {/* Emplacement de pub */}
      <Pub />
    </View>
  );
}
