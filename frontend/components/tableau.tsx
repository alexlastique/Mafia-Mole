import { Text, View , StyleSheet } from "react-native";
import { ReactNode } from "react";

interface TableauProps {
  children?: ReactNode;
}

const styles = StyleSheet.create({
    tableau: {
        width: 300,
        height: 300,
        backgroundColor: 'lightgray',
    }
});

export default function Tableau({children }: TableauProps){
  return (
    <View style={styles.tableau}>
        {children }
    </View>
  );
}