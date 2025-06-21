import config from '@/config';
import { Colors } from '@/constants/Colors';
import { API_PATH } from '@/paths';
import ExpenseSummary from '@/sections/analytics.tsx/ExpenseSummary';
import { IChartSlice } from '@/sections/analytics.tsx/types';
import EmptyState from '@/sections/myExpenses/EmptyState';
import LoadingState from '@/sections/myExpenses/LoadingState';
import { AuthTokens, getTokenFromSecureStore } from '@/utils/SecureStoreHelper';
import axios from 'axios';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function SummaryScreen() {
    const [analytics, setAnalytics] = useState<IChartSlice[] | null>(null)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)

    useFocusEffect(
        useCallback(() => {
            const fetchAnalytics = async () => {
                setLoading(true);
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
                } catch (error: any) {
                    console.error('Failed to fetch expenses:', error?.response?.data || error.message);
                    setAnalytics(null)
                } finally {
                    setLoading(false)
                }
            };

            fetchAnalytics();
        }, [])
    );

    if (loading) { return <LoadingState /> }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {analytics && analytics.length > 0 ?
                <ExpenseSummary summary={analytics} /> :
                <EmptyState />
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: Colors.background,
        paddingVertical: 20,
    },
})