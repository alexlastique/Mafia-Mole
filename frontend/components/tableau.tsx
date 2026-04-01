import { Text, View , StyleSheet, Image, Pressable } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import PopupGame from "@/components/PopupGame";
import PopupRule from "@/components/PopupRule";

const styles = StyleSheet.create({
    tableau: {
        width: 300,
        height: 300,
        position: 'relative',
    },
    boutonSelector: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    }
});

export default function Tableau(){
    const [popupGameVisisble, setPopupGameVisible] = useState(false);
    const [popupReglesVisible, setPopupReglesVisible] = useState(false);

    return (
        <View style={styles.tableau}>
            <Image 
                source={require('@/assets/images/Tableau.png')}
                style={{ width: '100%', height: '90%', zIndex: -1000 }}
            />
            <View style={styles.boutonSelector}>
                <Pressable
                    onPress={() => setPopupGameVisible(true)}
                    style={{ width: 95, height: 100, backgroundColor: 'red', position: 'absolute', top: '30%', left: '30%', transform: [{ rotate: '4deg' }] }}
                />
                <Link 
                    href="/parametres" 
                    style={{ width: 60, height: 60, backgroundColor: 'blue', position: 'absolute', top: '60%', left: '10%', transform: [{ rotate: '-8deg' }] }}
                />
                <Link 
                    href="/cosmetiques" 
                    style={{ width: 60, height: 50, backgroundColor: 'black', position: 'absolute', top: '17%', right: '10%', transform: [{ rotate: '9deg' }] }}
                />
                <Pressable
                    onPress={() => setPopupReglesVisible(true)}
                    style={{ width: 55, height: 55, backgroundColor: 'yellow', position: 'absolute', top: '59%', right: '10%', transform: [{ rotate: '-10deg' }] }}
                />
                <Link 
                    href="/rooms" 
                    style={{ width: 50, height: 70, backgroundColor: 'white', position: 'absolute', top: '11%', left: '10%', transform: [{ rotate: '5deg' }] }}
                />
            </View>
            <PopupGame
                visible={popupGameVisisble}
                onClose={() => setPopupGameVisible(false)}
            />
            <PopupRule
                visible={popupReglesVisible}
                onClose={() => setPopupReglesVisible(false)}
            />
        </View>
    );
}