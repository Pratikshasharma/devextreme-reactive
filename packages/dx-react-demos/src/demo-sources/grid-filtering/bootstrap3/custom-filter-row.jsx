import React from 'react';
import {
  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

const UnitsFilterCell = ({ filter, onFilter }) => (
  <th style={{ fontWeight: 'normal' }}>
    <input
      type="number"
      className="form-control text-right"
      value={filter ? filter.value : ''}
      min={1}
      max={4}
      onChange={e => onFilter(e.target.value ? { value: e.target.value } : null)}
    />
  </th>
);

const FilterCell = (props) => {
  if (props.column.name === 'units') {
    return <UnitsFilterCell {...props} />;
  }
  return <TableFilterRow.Cell {...props} />;
};

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'product', title: 'Product' },
        { name: 'region', title: 'Region' },
        { name: 'sector', title: 'Sector' },
        { name: 'units', title: 'Quantity' },
      ],
      tableColumnExtensions: [
        { columnName: 'units', align: 'right' },
      ],
      rows: generateRows({ columnValues: globalSalesValues, length: 8 }),
    };
  }
  render() {
    const { rows, columns, tableColumnExtensions } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <FilteringState defaultFilters={[{ columnName: 'units', value: 2 }]} />
        <IntegratedFiltering />
        <Table
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow />
        <TableFilterRow
          cellComponent={FilterCell}
        />
      </Grid>
    );
  }
}
