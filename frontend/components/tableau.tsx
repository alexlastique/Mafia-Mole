import { Text, View , StyleSheet, Image, Pressable } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import PopupGame from "@/components/PopupGame";
import PopupJoinRoom from "./PopupJoinRoom";
import PopupCreateRoom from "./PopupCreateRoom";
import PopupRule from "./PopupRule";

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
    const [popupGameVisible, setPopupGameVisible] = useState(false);
    const [popupReglesVisible, setPopupReglesVisible] = useState(false);
    const [popupJoinVisible, setPopupJoinVisible] = useState(false);
    const [popupCreateVisible, setPopupCreateVisible] = useState(false);
    
    // Fonction pour passer de PopupGame à PopupJoinRoom
    const handleOpenJoin = () => {
        setPopupGameVisible(false); // On ferme la première
        setTimeout(() => {
        setPopupJoinVisible(true); // On ouvre la seconde (le petit timeout aide à la fluidité sur Android)
        }, 100);
    };
    
    // Fonction pour passer de PopupGame à PopupCreateRoom
    const handleOpenCreate = () => {
        setPopupGameVisible(false);
        setTimeout(() => {
            setPopupCreateVisible(true);
        }, 100);
    };

    return (
        <View style={styles.tableau}>
            <Image 
                source={require('@/assets/images/Tableau.png')}
                style={{ width: '100%', height: '90%', zIndex: -1000 }}
            />
            <View style={styles.boutonSelector}>
                <Pressable
                    onPress={() => setPopupGameVisible(true)}
                    style={{ width: 95, height: 100, backgroundColor: 'transparent', position: 'absolute', top: '30%', left: '30%', transform: [{ rotate: '4deg' }] }}
                />
                <Link 
                    href="/parametres" 
                    style={{ width: 60, height: 60, backgroundColor: 'transparent', position: 'absolute', top: '60%', left: '10%', transform: [{ rotate: '-8deg' }] }}
                />
                <Link 
                    href="/cosmetiques" 
                    style={{ width: 60, height: 50, backgroundColor: 'transparent', position: 'absolute', top: '17%', right: '10%', transform: [{ rotate: '9deg' }] }}
                />
                <Pressable
                    onPress={() => setPopupReglesVisible(true)}
                    style={{ width: 55, height: 55, backgroundColor: 'transparent', position: 'absolute', top: '59%', right: '10%', transform: [{ rotate: '-10deg' }] }}
                />
                <Link 
                    href="/stats" 
                    style={{ width: 50, height: 70, backgroundColor: 'transparent', position: 'absolute', top: '11%', left: '10%', transform: [{ rotate: '5deg' }] }}
                />
            </View>            
            <PopupRule
                visible={popupReglesVisible}
                onClose={() => setPopupReglesVisible(false)}
            />
            <PopupGame
                visible={popupGameVisible}
                onClose={() => setPopupGameVisible(false)}
                onJoin={handleOpenJoin} // On passe la fonction de switch ici
                onCreate={handleOpenCreate}
            />
            
            <PopupCreateRoom
                visible={popupCreateVisible}
                onClose={() => setPopupCreateVisible(false)}
            />

            <PopupJoinRoom
                visible={popupJoinVisible}
                onClose={() => setPopupJoinVisible(false)}
            />
        </View>
    );
}