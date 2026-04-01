import { Background } from "@react-navigation/elements";
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#dbd8f0' } }} />;
}
