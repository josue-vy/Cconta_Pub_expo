import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';

export default function RootLayout() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // si userIsAuthenticated es true va a mostrar el tab
      const userIsAuthenticated = false;
      setIsAuthenticated(userIsAuthenticated);
      
      
      if (!userIsAuthenticated) {
        router.replace("/(auth)/login");
      }
    };

    checkAuth();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // Muestra el diseño de tabs si está autenticado
        <Stack.Screen name="(tabs)" />
      ) : (
        // Muestra el layout de autenticación si no está autenticado
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
  );
}
