import React from 'react'
import {formatInteger} from './helperFunctions';

export default class Balance extends React.Component {
  render() {
    return (
      <div className="balance">
        <h1 id="balance-heading">OVERALL</h1>
        <p><span className="balance-sub-heading">Income:</span> {formatInteger(this.props.currency, this.props.totalIncome)}</p>
        <p><span className="balance-sub-heading">Expense:</span> {formatInteger(this.props.currency, this.props.totalExpense)}</p>
        <p><span className="balance-sub-heading">Balance:</span> {formatInteger(this.props.currency, this.props.balance)}</p>
      </div>
    )
  }
}
