import EmptyState from './EmptyState';

const meta = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered'
  }
};

export default meta;

export const Default = {
  args: {
    title: 'No seismic records found',
    message: 'Try adjusting your search query, magnitude threshold, or category filter.',
    actionLabel: 'Reset filters',
    onAction: () => {}
  }
};

export const WithoutAction = {
  args: {
    title: 'No favorite earthquakes yet',
    message: 'Click the star icon on any earthquake row to add it to your pinned list.'
  }
};
