// app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar, // Estilo personalizado de la barra de pestañas
        tabBarShowLabel: false,     // No mostrar los títulos de las pestañas
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name="home-outline"
                size={24}
                color={focused ? "white" : "gray"} // Cambia de color cuando la pestaña está activa
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="(settings)/index"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name="settings-outline"
                size={24}
                color={focused ? "white" : "gray"} // Cambia de color cuando la pestaña está activa
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name="person-outline"
                size={24}
                color={focused ? "white" : "gray"} // Cambia de color cuando la pestaña está activa
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name="chatbox-outline"
                size={24}
                color={focused ? "white" : "gray"} // Cambia de color cuando la pestaña está activa
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={focused ? "white" : "gray"} // Cambia de color cuando la pestaña está activa
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  iconContainer: {
    justifyContent: 'center',  // Alinea los iconos verticalmente
    alignItems: 'center',      // Alinea los iconos horizontalmente
    flex: 1,
  },
});
