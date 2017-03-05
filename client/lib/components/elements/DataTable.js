import React from 'react'
import { BootstrapDataTable, BootstrapDataColumn } from 'react-bootstrap-tabular'

export default class DataTable extends React.Component {
  render () {
    const dataColumns = this.props.columns.map((column, idx) => {
      return (
        <BootstrapDataColumn
          sortable={column.sortable}
          key={idx++}
          property={column.property}
          name={column.name}
        />
      )
    })
    return (
      <div>
        {!!this.props.data && (
        <BootstrapDataTable data={this.props.data} bordered striped responsive>
          {dataColumns}
        </BootstrapDataTable>
        )}
      </div>
    )
  }
}

DataTable.propTypes = {
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.any.isRequired
}
