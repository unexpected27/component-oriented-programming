import Input from './Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
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
    placeholder: 'Search place or region...',
    size: 'md'
  }
};

export const WithValue = {
  args: {
    value: 'California',
    size: 'md'
  }
};

export const WithClearButton = {
  args: {
    value: 'Japan',
    size: 'md',
    onClear: () => {}
  }
};

export const Invalid = {
  args: {
    value: 'Invalid query',
    isInvalid: true,
    size: 'md'
  }
};

export const Disabled = {
  args: {
    value: 'Disabled text',
    disabled: true,
    size: 'md'
  }
};
