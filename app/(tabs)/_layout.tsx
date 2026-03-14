import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}  initialRouteName="survey">
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ focused, size }) => (
            <Feather name="compass" size={size} color={focused ? "#C8F751" : "black"} />
          ),
        }}
      />

      <Tabs.Screen
        name="survey"
        options={{
          title: "",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name="home-sharp" size={size} color={focused ? "#C8F751" : "black"} /> //TODO: изменить икноки
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name="person-outline" size={size} color={focused ? "#C8F751" : "black"} /> //TODO: изменить икноки
          ),
        }}
      />

    </Tabs>
  );
}