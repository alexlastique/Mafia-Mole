import { useAccelerometer } from "@/function/getPosition";
import { View, Text } from "react-native";

// export default function Stats() {
//   return (
//     <View>
//       <Text>Page Stats</Text>
//     </View>
//   );
// }

export default function Stats() {
  const { data, isShaking } = useAccelerometer();
  return (
    <View style={{ padding: 20 }}>
      <Text>X: {data.x.toFixed(2)}</Text>
      <Text>Y: {data.y.toFixed(2)}</Text>
      <Text>Z: {data.z.toFixed(2)}</Text>
      <Text>Shaking: {isShaking ? 'Yes' : 'No'}</Text>
    </View>
 );
}
