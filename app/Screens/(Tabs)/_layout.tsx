import {Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
export default  function TabLayout(){
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#28A745"
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Appoinment"
          options={{
            title: "Appoinment",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-clear-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Booking"
          options={{
            title: "Booking",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="location-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="History"
          options={{
            title: "History",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="repeat-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    );
}