import { useState } from 'react';
import Table from './Table';
import Badge from '../../atoms/Badge/Badge';
import Button from '../../atoms/Button/Button';

const meta = {
  title: 'Molecules/Table',
  component: Table,
  parameters: {
    layout: 'padded'
  }
};

export default meta;

const sampleColumns = [
  { key: 'magnitude', label: 'Magnitude', sortable: true },
  { key: 'place', label: 'Location', sortable: true },
  { key: 'depth', label: 'Depth', sortable: true },
  { key: 'actions', label: 'Actions', sortable: false }
];

const sampleRows = [
  { id: '1', magnitude: 6.8, place: 'Honshu, Japan', depth: '32 km' },
  { id: '2', magnitude: 4.5, place: 'Southern California', depth: '12 km' },
  { id: '3', magnitude: 2.1, place: 'Fox Islands, Aleutian', depth: '45 km' }
];

export const Default = {
  render: () => {
    const InteractiveTable = () => {
      const [sort, setSort] = useState({ field: 'magnitude', direction: 'desc' });

      const handleSort = (field) => {
        setSort((prev) => ({
          field,
          direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
      };

      return (
        <Table columns={sampleColumns} sortConfig={sort} onSort={handleSort}>
          {sampleRows.map((row) => (
            <tr key={row.id}>
              <td className="ds-table-td">
                <Badge variant={row.magnitude >= 6 ? 'strong' : row.magnitude >= 4 ? 'light' : 'weak'}>
                  M {row.magnitude}
                </Badge>
              </td>
              <td className="ds-table-td">{row.place}</td>
              <td className="ds-table-td">{row.depth}</td>
              <td className="ds-table-td">
                <Button variant="secondary" size="sm">
                  View
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      );
    };
    return <InteractiveTable />;
  }
};
