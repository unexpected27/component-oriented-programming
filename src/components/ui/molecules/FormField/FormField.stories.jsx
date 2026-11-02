import FormField from './FormField';
import Input from '../../atoms/Input/Input';
import Select from '../../atoms/Select/Select';

const meta = {
  title: 'Molecules/FormField',
  component: FormField,
  parameters: {
    layout: 'centered'
  }
};

export default meta;

export const WithInput = {
  render: () => (
    <div style={{ width: '320px' }}>
      <FormField label="Search location" htmlFor="loc-search" helperText="City, country or region code">
        <Input id="loc-search" placeholder="e.g. California" />
      </FormField>
    </div>
  )
};

export const WithSelect = {
  render: () => (
    <div style={{ width: '320px' }}>
      <FormField label="Category filter" htmlFor="cat-filter">
        <Select
          id="cat-filter"
          value="all"
          options={[
            { value: 'all', label: 'All magnitudes' },
            { value: 'weak', label: 'Weak (< 3.5)' }
          ]}
        />
      </FormField>
    </div>
  )
};

export const WithError = {
  render: () => (
    <div style={{ width: '320px' }}>
      <FormField
        label="Event ID"
        htmlFor="event-id"
        required
        error="This earthquake identifier does not exist"
      >
        <Input id="event-id" value="invalid_id_123" isInvalid />
      </FormField>
    </div>
  )
};
