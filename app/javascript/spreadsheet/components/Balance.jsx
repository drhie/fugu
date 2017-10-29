import React from 'react'
import {formatInteger} from './helperFunctions';

function calculateAkaji(number) {
  if (0 > number) {
    return "crimson"
  } else {
    return null
  }
}

export default class Balance extends React.Component {
  render() {
    return (
      <div className="balance">
        <h1 id="balance-heading">OVERALL</h1>
        <p><span className="balance-sub-heading">Income:</span>{formatInteger(this.props.currency, this.props.totalIncome)}</p>
        <p><span className="balance-sub-heading">Expense:</span>{formatInteger(this.props.currency, this.props.totalExpense)}</p>
        <p>
          <span className="balance-sub-heading" style={{color: calculateAkaji(this.props.balance)}}>Monthly Balance:</span>
          <span style={{color: calculateAkaji(this.props.balance)}}>{formatInteger(this.props.currency, this.props.balance)}</span>
        </p>
        <p>
          <span className="balance-sub-heading" style={{color: calculateAkaji(this.props.entireBalance + this.props.balance)}}>Entire Balance:</span>
          <span style={{color: calculateAkaji(this.props.entireBalance + this.props.balance)}}>{formatInteger(this.props.currency, this.props.entireBalance + this.props.balance)}</span>
        </p>
      </div>
    )
  }
}
