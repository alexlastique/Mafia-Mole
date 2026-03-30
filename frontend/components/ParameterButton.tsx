import { Image } from "react-native";
import { Link } from "expo-router";

export default function ParameterButton() {
    return (
        <Link 
            href="/parametres" 
            style={{ width: 43, height: 43, position: 'absolute', top: 10, right: 10 }}
        >
            <Image 
                source={require('@/assets/images/Parameter-Button.png')}
                style={{ width: 43, height: 43, position: 'absolute', top: 10, right: 10 }}
            />
        </Link>
    );
}