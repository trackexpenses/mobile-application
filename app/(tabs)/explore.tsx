import { Colors } from '@/constants/Colors';
import { Image } from 'expo-image';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ExploreScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/app-logo.png')}
          style={styles.logo}
          contentFit="contain"
        />
        <Text style={styles.title}>Explore</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.paragraph}>
          Welcome to the Expense Tracker App – your personal finance assistant.
        </Text>

        <Text style={styles.paragraph}>
          ➤ Log your daily expenses easily, whether it’s food, transport, or utilities.
        </Text>

        <Text style={styles.paragraph}>
          ➤ Tag your expenses with custom categories like "Work", "Travel", or "Groceries".
        </Text>

        <Text style={styles.paragraph}>
          ➤ Get instant visual insights to understand your spending patterns.
        </Text>

        <Text style={styles.paragraph}>
          All your data stays organized, simple, and accessible in one place.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 100,
    backgroundColor: Colors.background,
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  paragraph: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 12,
  },
});
