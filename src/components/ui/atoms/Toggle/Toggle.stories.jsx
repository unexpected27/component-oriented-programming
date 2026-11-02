import { useState } from 'react';
import Toggle from './Toggle';

const meta = {
  title: 'Atoms/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md']
    },
    disabled: {
      control: 'boolean'
    }
  }
};

export default meta;

const unitOptions = [
  { value: 'km', label: 'Kilometers' },
  { value: 'mi', label: 'Miles' }
];

const chartOptions = [
  { value: 'bar', label: 'Bar' },
  { value: 'area', label: 'Area' },
  { value: 'line', label: 'Line' }
];

export const Default = {
  args: {
    options: unitOptions,
    value: 'km',
    label: 'Depth Units'
  }
};

export const ChartType = {
  args: {
    options: chartOptions,
    value: 'bar',
    label: 'Chart View'
  }
};

export const Small = {
  args: {
    options: unitOptions,
    value: 'km',
    size: 'sm'
  }
};

export const Interactive = {
  render: () => {
    const InteractiveToggle = () => {
      const [val, setVal] = useState('km');
      return (
        <Toggle
          label="Measurement Units"
          value={val}
          onChange={setVal}
          options={unitOptions}
        />
      );
    };
    return <InteractiveToggle />;
  }
};
