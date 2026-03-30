import { View, Text, Image, Pressable, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import BackButton from "@/components/BackButton";

const styles = StyleSheet.create({
  titre : {
    width: "90%", 
    height: 50,
    marginTop: 114, 
    marginBottom: 50, 
    alignSelf: "center"
  },
  inputPseudo : {
    width: "80%",
    height: 50, 
    backgroundColor: "white",
    borderWidth: 5, 
    borderColor: "black", 
    borderRadius: 100, 
    paddingHorizontal: 10, 
    alignSelf: "center", 
    textAlign: "center",
  }
})

export default function Parametres() {
  const [volume, setVolume] = useState(0.5);

  return (
    <View>
      <BackButton />
      <Image 
        source={require('@/assets/images/Parametres_titre.png')}
        style={styles.titre}
        resizeMode="contain"
      />
      <TextInput 
        placeholder="Pseudo"
        style={styles.inputPseudo}
      />
      

    </View>
  );
}