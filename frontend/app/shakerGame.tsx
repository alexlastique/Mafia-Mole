import { View, Text, Image, Pressable } from "react-native";
import { useAccelerometer } from "@/function/getPosition";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

function goBack() {
  router.back();
}

function addPourcentage(pourcentage: number): number {
    return Math.min(pourcentage + 10, 100);
}

export default function ShakerGame() {
    const { data, isShaking } = useAccelerometer();
    const [shakePourcentage, setShakePourcentage] = useState(0);
    const { roomId } = useLocalSearchParams();

    useEffect(() => {
        if (!isShaking) {
            return;
        }

        setShakePourcentage(prev => addPourcentage(prev));
    }, [isShaking]);

    useEffect(() => {
        if (shakePourcentage >= 100) {
            goBack();
        }
    }, [shakePourcentage]);
  
    return (
        <View>
            <Pressable 
                onPress={goBack}
                style={{ width: 63, height: 63, position: 'absolute', top: 20, left: 10 }}
            >
                <Image 
                    source={require('@/assets/images/backMap.png')}
                    style={{ width: 63, height: 63, position: 'absolute', top: 20, left: 10 }}
                />
            </Pressable>
            <Pressable
                onPress={() => router.push('/parametres')}
                style={{ width: 42, height: 42, position: 'absolute', top: 25, right: 10 }}
            >
                <Image
                    source={require('@/assets/images/Parameter-Button.png')}
                    style={{ width: 42, height: 42, position: 'absolute', top: 25, right: 10 }}
                />
            </Pressable>
            <View
                style={{ flex: 1, alignItems: "center", marginTop: 150}}
            >
                <Image 
                    source={require('@/assets/images/Barman_title.png')}
                    style={{ width: '80%'}}
                    resizeMode="contain"
                />
            </View>
            <Text
                style={{ marginTop: 100, fontSize: 48, textAlign: 'center' }}
            >Secoue ton téléphone.</Text>
            <View style={{ flex: 1, alignItems: "center", marginTop: 50}}>
                <Image 
                    source={require('@/assets/images/Barman_Logo.png')}
                    style={{ width: '100%', height: 200}}
                    resizeMode="contain"
                />
            </View>
            {/* Avancement de la quetes */}
            <View 
                style={{backgroundColor: '#8c9edf', width: '80%', height: 100, borderRadius: 100, alignSelf: 'center', marginTop: 300, overflow: 'hidden'}}
            >
                <View
                style={{backgroundColor: "#657ed4", width: `${shakePourcentage}%`, height: '100%'}}
                >

                </View>
            </View>
        </View>
    );
}