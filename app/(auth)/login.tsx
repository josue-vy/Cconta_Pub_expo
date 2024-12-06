import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  CustomButton,
  InputField,
  BackArrow,
  GoogleSignInButton,
} from "../../components/CustomComponents";
import { useRouter } from "expo-router";

const { height } = Dimensions.get("window");

const MainScreen = () => {
  const router = useRouter();
  const [currentView, setCurrentView] = useState("initial");
  const expandAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(1)).current;

  const animateExpand = (expand: boolean) => {
    Animated.parallel([
      Animated.timing(expandAnimation, {
        toValue: expand ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnimation, {
        toValue: expand ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleCreateAccount = () => {
    setCurrentView("register");
    animateExpand(true);
  };

  const handleSignIn = () => {
    setCurrentView("login");
    animateExpand(true);
  };

  const handleBack = () => {
    setCurrentView("initial");
    animateExpand(false);
  };

  const handleLogin = (username: string, password: string) => {
    // Temporary validation of credentials
    if (username === "test" && password === "password") {
      // Redirect to the tabs screen
      router.replace("/(tabs)");
    } else {
      Alert.alert("Error", "Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  const expandHeight = expandAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [250, height - 100],
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {currentView !== "initial" && (
      <View style={styles.headerContainer}>
      {/* Flecha de retroceso */}
      <View style={styles.backArrowContainer}>
        <BackArrow onPress={handleBack} />
      </View>

      {/* Texto del título */}
      <View style={styles.titleContainer}>
        {currentView === "register" ? (
          <>
            <Text style={styles.title}>Crear nueva cuenta</Text>
            <Text style={styles.subtext}>
              Ingresa tus datos para crear cuenta
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.title}>
              Bienvenido a <Text style={styles.titleHighlight}>CcontaPub.</Text>
            </Text>
            <Text style={styles.subtext}>Ingrese sus datos a continuación</Text>
          </>
        )}
      </View>
    </View>
      )}
      <Animated.View
        style={[styles.contentContainer, { opacity: fadeAnimation }]}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logo} />
        </View>
        <Text style={styles.introTitle}>
          Conecta con colegas, comparte experiencias
        </Text>
      </Animated.View>
      <Animated.View
        style={[styles.expandableContainer, { height: expandHeight }]}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {currentView === "initial" && (
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Crear cuenta"
                onPress={handleCreateAccount}
                primary
              />
              <CustomButton title="Inicia sesion" onPress={handleSignIn} />
            </View>
          )}
          {currentView === "login" && (
            <View style={styles.formContainer}>
              <InputField placeholder="Ingrese su correo" label="Correo" />
              <InputField
                placeholder="Ingrese su contraseña"
                label="Contraseña"
                secureTextEntry
                onSubmitEditing={(e) =>
                  handleLogin(e.nativeEvent.text, "password")
                }
              />
              <Text style={styles.forgotPassword}>
                ¿olvidaste tu contraseña?
              </Text>
              <CustomButton
                title="Iniciar sesion"
                onPress={() => handleLogin("test", "password")}
                primary
              />
              <Text style={styles.orText}>
                o inicia sesion con una cuenta de gmail
              </Text>
              <GoogleSignInButton />
            </View>
          )}
          {currentView === "register" && (
            <View style={styles.formContainer}>
              <InputField placeholder="Ingrese su correo" label="Correo" />
              <InputField placeholder="Ingrese su nombre" label="Nombres" />
              <InputField
                placeholder="Ingrese su contraseña"
                label="Contraseña"
                secureTextEntry
              />
              <CustomButton title="Registrar" onPress={() => {}} primary />
              <Text style={styles.orText}>
                o registrate con una cuenta de gmail
              </Text>
              <GoogleSignInButton />
            </View>
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
};
const COLORS = {
  backgroundDark: "#1E1E1E",
  backgroundDarker: "#2E2E2E",
  textLight: "#FFFFFF",
  textGrey: "#808080",
  primaryBlue: "#3498db",
  lightGrey: "#D3D3D3",
  shadowColor: "#000",
};

const FONT_SIZES = {
  title: 28,
  subtext: 14,
  input: 16,
  button: 18,
};

const styles = StyleSheet.create({
  // Estilo general de la pantalla
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
    alignItems: "center",
    justifyContent: "space-between",
  },

  // Encabezado
  headerContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    width: "100%",
    marginBottom: 20,
  },
  backArrowContainer: {
    marginBottom: 80,
    marginTop: -20,
    marginLeft: -20,
  },
  titleContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    color: COLORS.textLight,
    fontSize: FONT_SIZES.title,
    fontWeight: "bold",
    textAlign: "left",
  },
  titleHighlight: {
    color: COLORS.primaryBlue,
    fontWeight: "bold",
    fontSize: FONT_SIZES.title,
  },
  subtext: {
    color: COLORS.textGrey,
    fontSize: FONT_SIZES.subtext,
    marginTop: 5,
    textAlign: "left",
  },

  // Contenido principal (Logo y título de introducción)
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: COLORS.lightGrey,
  },
  introTitle: {
    color: COLORS.textLight,
    fontSize: 24,
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  // Contenedor expandible
  expandableContainer: {
    backgroundColor: "#333",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
  },

  // Scroll
  scrollViewContent: {
    padding: 20,
    paddingTop: 30,
  },

  // Botones
  buttonContainer: {
    width: "100%",
  },
  customButtonPrimary: {
    backgroundColor: COLORS.primaryBlue,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  customButtonPrimaryText: {
    color: COLORS.textLight,
    fontSize: FONT_SIZES.button,
    fontWeight: "bold",
  },

  // Formulario
  formContainer: {
    width: "100%",
    backgroundColor: COLORS.backgroundDarker,
    padding: 30,
    borderRadius: 10,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  formTitle: {
    color: COLORS.textLight,
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },

  // Campos de entrada
  inputField: {
    backgroundColor: COLORS.lightGrey,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: FONT_SIZES.input,
    color: COLORS.textLight,
  },

  // Texto adicional
  forgotPassword: {
    color: COLORS.primaryBlue,
    marginTop: 10,
    marginBottom: 20,
    textAlign: "right",
    fontSize: FONT_SIZES.subtext,
  },
  orText: {
    color: COLORS.textLight,
    marginVertical: 10,
    textAlign: "center",
    fontSize: FONT_SIZES.subtext,
  },

  // Google Button
  googleButton: {
    backgroundColor: COLORS.textLight,
    borderColor: COLORS.textGrey,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleButtonText: {
    color: COLORS.textGrey,
    fontSize: FONT_SIZES.input,
    marginLeft: 10,
  },
});


export default MainScreen;
