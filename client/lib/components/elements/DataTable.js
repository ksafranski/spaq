import React from 'react'
import { BootstrapDataTable, BootstrapDataColumn } from 'react-bootstrap-tabular'

export default class DataTable extends React.Component {
  render () {
    const dataColumns = this.props.columns.map((column, idx) => {
      return (
        <BootstrapDataColumn
          align={column.align || 'left'}
          sortable={column.sortable}
          key={idx++}
          property={column.property}
          name={column.name}
        />
      )
    })
    return (
      <div>
        {!this.props.data && (
          <div className='DataTable-loading'>
            <i className='fa fa-cog fa-spin fa-3x fa-fw' />
          </div>
        )}
        {this.props.data.length === 0 && (
          <h4 className='DataTable-no-data'>No Data</h4>
        )}
        {!!this.props.data && this.props.data.length >= 1 && (
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
