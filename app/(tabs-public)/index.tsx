import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Href, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { APP_PATH } from '@/paths';

export default function HomeScreen() {
  const router = useRouter();

  const handleLogin = () => router.push(APP_PATH.auth.login as Href);
  const handleSignUp = () => router.push(APP_PATH.auth.signup as Href);

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/app-logo.png')} style={styles.image} />
      <Text style={styles.title}>Welcome to ExpenseTracker!</Text>
      <Text style={styles.subtitle}>Track your spending and save smarter.</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.background,
  },
  image: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.primary.main,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    paddingVertical: 12,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
