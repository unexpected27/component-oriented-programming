import LoadingState from './LoadingState';

const meta = {
  title: 'Molecules/LoadingState',
  component: LoadingState,
  parameters: {
    layout: 'centered'
  }
};

export default meta;

export const Default = {
  args: {
    title: 'Fetching real-time data',
    message: 'Loading seismic data from USGS feed...',
    size: 'md'
  }
};

export const EventDetail = {
  args: {
    title: 'Loading event record',
    message: 'Querying USGS detailed GeoJSON geometry...',
    size: 'lg'
  }
};
