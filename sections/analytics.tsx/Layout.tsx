import config from '@/config';
import { Colors } from '@/constants/Colors';
import { API_PATH } from '@/paths';
import AnalyticsDonutChart from '@/sections/analytics.tsx/AnalyticsDonutChart';
import DatePicker from '@/sections/analytics.tsx/DatePicker';
import { IChartSlice, VIEW_TYPE } from '@/sections/analytics.tsx/types';
import EmptyState from '@/sections/myExpenses/EmptyState';
import LoadingState from '@/sections/myExpenses/LoadingState';
import { AuthTokens, getTokenFromSecureStore } from '@/utils/SecureStoreHelper';
import axios from 'axios';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ExpenseSummary from './ExpenseSummary';

export const DAYS_AGO = 3

export default function Layout({ viewType }: { viewType: VIEW_TYPE }) {
    const [analytics, setAnalytics] = useState<IChartSlice[] | null>(null)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const [startDate, setStartDate] = useState<Date | null>(() => {
        const date = new Date();
        date.setDate(date.getDate() - DAYS_AGO);
        return date;
    });

    const [endDate, setEndDate] = useState<Date | null>(new Date());


    useFocusEffect(
        useCallback(() => {
            const fetchAnalytics = async () => {
                setLoading(true);
                try {
                    const token = await getTokenFromSecureStore(AuthTokens.ACCESS_TOKEN);
                    const response = await axios.get(
                        `${config.backendBaseUrl + API_PATH.expenses.analytics}?startDate=${startDate}&endDate=${endDate}`,
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
        }, [startDate, endDate])
    );

    if (loading) { return <LoadingState /> }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <DatePicker
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />
            {analytics && analytics.length > 0 ?
                viewType === VIEW_TYPE.CHART ?
                    <AnalyticsDonutChart data={analytics} total={total} />
                    : <ExpenseSummary summary={analytics} /> :
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