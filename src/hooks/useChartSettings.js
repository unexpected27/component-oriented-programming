import useAppStore from '../store/useAppStore';

export default function useChartSettings() {
  const chartType = useAppStore((state) => state.chartType);
  const setChartType = useAppStore((state) => state.setChartType);

  return {
    chartType,
    setChartType
  };
}
