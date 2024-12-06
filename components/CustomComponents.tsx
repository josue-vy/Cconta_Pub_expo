import React from 'react';
import { TouchableOpacity, Text, TextInput, View, StyleSheet, NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';
import { Feather } from '@expo/vector-icons';

export const CustomButton: React.FC<{ title: string; onPress: () => void; primary?: boolean }> = ({ title, onPress, primary = false }) => (
  <TouchableOpacity 
    style={[styles.button, primary ? styles.primaryButton : styles.secondaryButton]} 
    onPress={onPress}
  >
    <Text style={[styles.buttonText, primary ? styles.primaryButtonText : styles.secondaryButtonText]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export const InputField: React.FC<{ placeholder: string; label: string; secureTextEntry?: boolean; onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void }>= ({ placeholder, label, secureTextEntry = false }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput 
      style={styles.input} 
      placeholder={placeholder}
      placeholderTextColor="#999"
      secureTextEntry={secureTextEntry}
    />
  </View>
);

export const BackArrow: React.FC<{onPress: () => void;}> = ({ onPress }) => (
  <TouchableOpacity style={styles.backArrow} onPress={onPress}>
    <Feather name="chevron-left" size={24} color="white" />
  </TouchableOpacity>
);

export const GoogleSignInButton = () => (
  <TouchableOpacity style={styles.googleButton}>
    <Text style={styles.googleButtonText}>Iniciar sesion con google</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#3498db',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3498db',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryButtonText: {
    color: 'white',
  },
  secondaryButtonText: {
    color: '#3498db',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    color: 'white',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  backArrow: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  googleButtonText: {
    color: 'black',
  },
});