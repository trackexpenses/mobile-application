import Layout from '@/sections/analytics.tsx/Layout';
import { VIEW_TYPE } from '@/sections/analytics.tsx/types';

export default function AnalyticsScreen() {
  return <Layout viewType={VIEW_TYPE.CHART} />
}