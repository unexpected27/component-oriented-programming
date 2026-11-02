import Button from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost', 'outline']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    disabled: {
      control: 'boolean'
    },
    isActive: {
      control: 'boolean'
    },
    fullWidth: {
      control: 'boolean'
    }
  }
};

export default meta;

export const Primary = {
  args: {
    children: 'Primary Action',
    variant: 'primary',
    size: 'md'
  }
};

export const Secondary = {
  args: {
    children: 'Secondary Action',
    variant: 'secondary',
    size: 'md'
  }
};

export const Danger = {
  args: {
    children: 'Danger Action',
    variant: 'danger',
    size: 'md'
  }
};

export const Ghost = {
  args: {
    children: 'Ghost Action',
    variant: 'ghost',
    size: 'md'
  }
};

export const Small = {
  args: {
    children: 'Small Button',
    size: 'sm'
  }
};

export const Large = {
  args: {
    children: 'Large Button',
    size: 'lg'
  }
};

export const Disabled = {
  args: {
    children: 'Disabled Button',
    disabled: true
  }
};

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </div>
  )
};
