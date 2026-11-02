import './Table.css';

function Table({
  columns = [],
  sortConfig,
  onSort,
  children,
  className = '',
  ariaLabel = 'Data table'
}) {
  const getSortIcon = (field) => {
    if (!sortConfig || sortConfig.field !== field) {
      return '↕';
    }
    return sortConfig.direction === 'asc' ? '▲' : '▼';
  };

  const getAriaSort = (field) => {
    if (!sortConfig || sortConfig.field !== field) {
      return 'none';
    }
    return sortConfig.direction === 'asc' ? 'ascending' : 'descending';
  };

  return (
    <div className={`ds-table-container ${className}`.trim()}>
      <table className="ds-table" aria-label={ariaLabel}>
        {columns.length > 0 && (
          <thead className="ds-table-head">
            <tr>
              {columns.map((col) => {
                const isSortable = Boolean(col.sortable && onSort);
                return (
                  <th
                    key={col.key || col.label}
                    className={`ds-table-th ${isSortable ? 'ds-table-th-sortable' : ''}`}
                    aria-sort={isSortable ? getAriaSort(col.key) : undefined}
                    style={col.width ? { width: col.width } : undefined}
                  >
                    {isSortable ? (
                      <button
                        type="button"
                        className="ds-table-sort-btn"
                        onClick={() => onSort(col.key)}
                        title={`Sort by ${col.label}`}
                      >
                        <span>{col.label}</span>
                        <span className="ds-table-sort-indicator" aria-hidden="true">
                          {getSortIcon(col.key)}
                        </span>
                      </button>
                    ) : (
                      <span>{col.label}</span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
        )}
        <tbody className="ds-table-tbody">{children}</tbody>
      </table>
    </div>
  );
}

export default Table;
