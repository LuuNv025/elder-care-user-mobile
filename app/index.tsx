import { View } from "react-native";  
import { createStackNavigator } from "@react-navigation/stack";
import { Link } from "expo-router";

const Stack = createStackNavigator();

export default function Index() {
  return (
    <View>
      <Link href="/screens/(Tabs)/Home">Click Here</Link>
    </View>
  );
}
