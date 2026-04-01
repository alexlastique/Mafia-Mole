import { Pressable, Image } from "react-native";
import { router } from "expo-router";

function goBack() {
  router.back();
}

export default function BackButton() {
    return (
        <Pressable 
            onPress={goBack}
            style={{ width: 43, height: 43, position: 'absolute', top: 10, left: 10 }}
        >
            <Image 
                source={require('@/assets/images/Back.png')}
                style={{ width: 43, height: 43, position: 'absolute', top: 10, left: 10 }}
            />
        </Pressable>
    );
}