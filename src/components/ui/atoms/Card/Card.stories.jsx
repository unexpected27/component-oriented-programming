import Card from './Card';
import Button from '../Button/Button';

const meta = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'padded'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined']
    },
    padding: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  }
};

export default meta;

export const Default = {
  args: {
    title: 'Earthquake Monitoring Widget',
    description: 'Real-time seismic data feed configured via USGS API.',
    children: <p style={{ margin: 0, color: 'var(--ds-color-text-secondary)' }}>Widget content container.</p>,
    variant: 'default',
    padding: 'md'
  }
};

export const WithHeaderActions = {
  args: {
    title: 'Filter & Query Panel',
    description: 'Customize filters and sorting parameters.',
    headerActions: (
      <Button variant="secondary" size="sm">
        Reset
      </Button>
    ),
    children: <p style={{ margin: 0, color: 'var(--ds-color-text-secondary)' }}>Filtered items: 25</p>
  }
};

export const Elevated = {
  args: {
    title: 'Elevated Card',
    description: 'Elevated surface with drop shadow.',
    variant: 'elevated',
    children: <p style={{ margin: 0, color: 'var(--ds-color-text-secondary)' }}>Elevated content body.</p>
  }
};
