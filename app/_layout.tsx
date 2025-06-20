import { Slot, Stack, Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={styles.container}>
        <Stack
          screenOptions={{
            headerTitleAlign: 'center',
            headerTitle: 'Expense Tracker',
            headerBackTitle: 'Back',
          }}
        />
      </GestureHandlerRootView>
    </AuthProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

