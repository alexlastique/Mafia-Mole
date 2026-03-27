import { Text, View,StyleSheet } from "react-native";

const styles = StyleSheet.create({
    pub: {
        width: '100%',
        height: 70,
        backgroundColor: 'lightgray',
        position: 'absolute',
        bottom: 0,
        zIndex: 10000,
    }
});

export default function Pub() {
    return (
        <View style={styles.pub}>
            <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>Publicité</Text>
        </View>
    );
}