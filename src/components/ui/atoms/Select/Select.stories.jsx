import Select from './Select';

const sampleOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'weak', label: 'Weak (< 3.5)' },
  { value: 'light', label: 'Light (3.5 – 4.9)' },
  { value: 'moderate', label: 'Moderate (5.0 – 6.4)' },
  { value: 'strong', label: 'Strong (6.5+)' }
];

const meta = {
  title: 'Atoms/Select',
  component: Select,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    disabled: {
      control: 'boolean'
    },
    isInvalid: {
      control: 'boolean'
    }
  }
};

export default meta;

export const Default = {
  args: {
    options: sampleOptions,
    value: 'all',
    size: 'md'
  }
};

export const Small = {
  args: {
    options: sampleOptions,
    value: 'weak',
    size: 'sm'
  }
};

export const Large = {
  args: {
    options: sampleOptions,
    value: 'moderate',
    size: 'lg'
  }
};

export const Disabled = {
  args: {
    options: sampleOptions,
    value: 'all',
    disabled: true
  }
};

export const Invalid = {
  args: {
    options: sampleOptions,
    value: 'all',
    isInvalid: true
  }
};
