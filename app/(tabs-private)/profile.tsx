import { Colors } from '@/constants/Colors';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { deleteUser, getUserData } from '@/utils/AsyncStorageHelper';
import { APP_PATH } from '@/paths';
import { deleteUserTokens } from '@/utils/SecureStoreHelper';
import { router, Href } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function ProfileScreen() {
  const { user, logout } = useAuth()
  const handleLogout = async () => {
    try {
      await logout()
      router.replace(APP_PATH.public.home as Href);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={require('@/assets/images/user-icon.avif')}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <View style={styles.logoutButton}>
          <Button title="Logout" onPress={handleLogout} color="#dc2626" />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 100,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  email: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 32,
  },
  logoutButton: {
    marginTop: 12,
    width: '100%',
    maxWidth: 200,
  },
});
