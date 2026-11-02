import Badge from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'weak', 'light', 'moderate', 'strong', 'neutral']
    },
    size: {
      control: 'select',
      options: ['sm', 'md']
    },
    shape: {
      control: 'select',
      options: ['rounded', 'pill']
    }
  }
};

export default meta;

export const Default = {
  args: {
    children: 'Default Badge',
    variant: 'default',
    size: 'md',
    shape: 'rounded'
  }
};

export const Primary = {
  args: {
    children: 'Primary Badge',
    variant: 'primary',
    size: 'md'
  }
};

export const Success = {
  args: {
    children: 'Live USGS Feed',
    variant: 'success',
    shape: 'pill'
  }
};

export const Danger = {
  args: {
    children: 'Feed Offline',
    variant: 'danger',
    shape: 'pill'
  }
};

export const MagnitudeVariants = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge variant="weak">M 2.4 Weak</Badge>
      <Badge variant="light">M 4.2 Light</Badge>
      <Badge variant="moderate">M 5.8 Moderate</Badge>
      <Badge variant="strong">M 7.1 Strong</Badge>
    </div>
  )
};
