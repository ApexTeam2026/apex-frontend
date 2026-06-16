import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={({ route }) => ({
        headerShown: false,
        unmountOnBlur: false
      })}  
      initialRouteName="home">
      <Tabs.Screen
        name="all-places"
        options={{
          title: "",
          tabBarIcon: ({ focused, size }) => (
            <Feather name="compass" size={size} color={focused ? "#C8F751" : "black"} />
          ),
        }}
      />

      <Tabs.Screen
        name="home"
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
      <Tabs.Screen
        name="filters"
        options={{
          href: null, // Это скроет страницу из нижнего бара, но позволит на неё переходить
        }}
      />

      <Tabs.Screen
        name="questions"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="visited"
        options={{
        href: null, // вон с пляжу
        }}
      />

      <Tabs.Screen
        name="detailed_place"
        options={{
        href: null, // вон с пляжу
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
        href: null, // вон с пляжу
        }}
      />
      <Tabs.Screen
        name="final_page"
        options={{
        href: null, // вон с пляжу
        }}
      />
    </Tabs>

    
  );
}