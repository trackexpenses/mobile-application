import config from '@/config';
import { Colors } from '@/constants/Colors';
import { API_PATH } from '@/paths';
import AnalyticsDonutChart from '@/sections/analytics.tsx/AnalyticsDonutChart';
import ExpenseSummary from '@/sections/analytics.tsx/ExpenseSummary';
import LoadingState from '@/sections/myExpenses/LoadingState';
import { getTokenFromSecureStore, AuthTokens } from '@/utils/SecureStoreHelper';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';


export default function AnalyticsScreen() {
  const [analytics, setAnalytics] = useState(null)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = await getTokenFromSecureStore(AuthTokens.ACCESS_TOKEN);
        const response = await axios.get(
          config.backendBaseUrl + API_PATH.expenses.analytics,
          {
            headers: {
              Authorization: token,
            }
          }
        );

        const { analytics } = response.data;
        setAnalytics(analytics);
        const total = analytics.reduce((sum: any, s: any) => sum + s.total, 0);
        setTotal(total)

        setLoading(false)
      } catch (error: any) {
        console.error('Failed to fetch expenses:', error?.response?.data || error.message);
        setAnalytics(null)
        setLoading(false)
      }
    };

    fetchAnalytics();
  }, []);

  if (!analytics || loading) { return <LoadingState /> }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AnalyticsDonutChart data={analytics!} total={total} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingVertical: 20,
  },
})