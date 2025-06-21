import { Colors } from '@/constants/Colors';
import AnalyticsDonutChart from '@/sections/analytics.tsx/AnalyticsDonutChart';
import ExpenseSummary from '@/sections/analytics.tsx/ExpenseSummary';
import { IAnalytics } from '@/sections/analytics.tsx/types';
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';

const analytics: IAnalytics = {
  summary: [{
    category: "Shopping",
    value: 200
  },
  {
    category: "Home",
    value: 1000
  },
  {
    category: "Shopping",
    value: 200
  },
  {
    category: "Home",
    value: 1000
  }
  ],
  chartData: [
    {
      label: 'housing', value: 77000, color: '#FBAF17'
      , summary: [
        {
          category: "Shopping",
          value: 200
        },
        {
          category: "Home",
          value: 1000
        },
        {
          category: "Shopping",
          value: 200
        },
        {
          category: "Home",
          value: 1000
        }
      ]
    },
    { label: 'travel', value: 70000, color: '#E6C662' },
    { label: 'commute', value: 66000, color: '#A4D97A' },
    { label: 'kids', value: 20000, color: '#84D08B' },
    { label: 'activities', value: 20000, color: '#76DE9F' },
    { label: 'outings', value: 12000, color: '#9AE3EB' },
    { label: 'rent', value: 10000, color: '#73C9F4' },
    { label: 'home', value: 4000, color: '#9A88F2' },
    { label: 'other', value: 1000, color: '#B55AE0' },
  ]
}


const total = analytics.chartData.reduce((sum, s) => sum + s.value, 0);

const DonutChart = () => {


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AnalyticsDonutChart data={analytics.chartData} total={total} />
    </ScrollView>
  );
};

export default DonutChart;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingVertical: 20,
  },
})