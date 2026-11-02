import Spinner from './Spinner';

const meta = {
  title: 'Atoms/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  }
};

export default meta;

export const Default = {
  args: {
    size: 'md',
    label: 'Loading data...'
  }
};

export const Small = {
  args: {
    size: 'sm',
    label: 'Loading small...'
  }
};

export const Large = {
  args: {
    size: 'lg',
    label: 'Loading large...'
  }
};

export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  )
};
