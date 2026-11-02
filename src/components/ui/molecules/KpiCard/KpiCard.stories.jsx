import KpiCard from './KpiCard';

const meta = {
  title: 'Molecules/KpiCard',
  component: KpiCard,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    isPositive: {
      control: 'boolean'
    }
  }
};

export default meta;

export const Default = {
  args: {
    title: 'Total Earthquakes',
    value: '185',
    change: '+12%',
    isPositive: true,
    description: 'Recorded within past 24 hours'
  }
};

export const NegativeTrend = {
  args: {
    title: 'Average Depth',
    value: '14.2 km',
    change: '-5%',
    isPositive: false,
    description: 'Shallower events on average'
  }
};

export const GridPreview = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 240px)', gap: '16px' }}>
      <KpiCard title="Total Events" value="230" change="+8%" isPositive description="Global feed count" />
      <KpiCard title="Max Magnitude" value="M 6.8" change="Critical" isPositive={false} description="Offshore Japan" />
      <KpiCard title="Avg Depth" value="18.5 km" change="-2.1" isPositive description="Mean epicenter depth" />
      <KpiCard title="Strong Events" value="4" change="+1" isPositive={false} description="Magnitudes above 6.0" />
    </div>
  )
};
