import ErrorState from './ErrorState';

const meta = {
  title: 'Molecules/ErrorState',
  component: ErrorState,
  parameters: {
    layout: 'centered'
  }
};

export default meta;

export const Default = {
  args: {
    error: 'HTTP 503: USGS upstream service temporarily unavailable.',
    onRetry: () => {}
  }
};

export const WithoutRetry = {
  args: {
    error: 'Network disconnected. Check your local connection.'
  }
};
