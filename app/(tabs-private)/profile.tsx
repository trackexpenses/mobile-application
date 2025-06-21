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
      <View style={styles.profileCard}>
        <Image
          source={require('@/assets/images/user-icon.avif')}
          style={styles.avatar}
        />

        <View style={styles.infoSection}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user?.name}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email}</Text>
        </View>

        <View style={styles.logoutButton}>
          <Button title="Logout" onPress={handleLogout} color="#dc2626" />
        </View>
      </View>
    </ScrollView>

  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 40,
  },
  profileCard: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 24,
  },
  infoSection: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
    color: '#222',
  },
  logoutButton: {
    marginTop: 24,
    width: '100%',
  },
});