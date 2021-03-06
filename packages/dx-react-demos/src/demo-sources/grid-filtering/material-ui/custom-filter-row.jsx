import React from 'react';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input';
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import {
  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
} from '@devexpress/dx-react-grid-material-ui';

import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

const styles = theme => ({
  cell: {
    verticalAlign: 'top',
    width: '100%',
    paddingTop: theme.spacing.unit + 4,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  input: {
    width: '100%',
  },
});

const UnitsFilterCellBase = ({ filter, onFilter, classes }) => (
  <TableCell className={classes.cell}>
    <Input
      className={classes.input}
      type="number"
      value={filter ? filter.value : ''}
      onChange={e => onFilter(e.target.value ? { value: e.target.value } : null)}
      placeholder="Filter..."
      inputProps={{
        style: { textAlign: 'right' },
        min: 1,
        max: 4,
      }}
    />
  </TableCell>
);
const UnitsFilterCell = withStyles(styles, { name: 'SexFilterCell' })(UnitsFilterCellBase);

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
      <Paper>
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
      </Paper>
    );
  }
}
