import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name="compass-sharp" size={size} color={focused ? "#A3E635" : "gray"} /> //TODO: изменить икноки
          ),
        }}
      />

      <Tabs.Screen
        name="survey"
        options={{
          title: "",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name="home-sharp" size={size} color={focused ? "#A3E635" : "gray"} /> //TODO: изменить икноки
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name="person" size={size} color={focused ? "#A3E635" : "gray"} /> //TODO: изменить икноки
          ),
        }}
      />

    </Tabs>
  );
}