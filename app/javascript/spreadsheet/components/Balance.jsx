import React from 'react'

export default class Balance extends React.Component {
  render() {
    return (
      <div className="balance">
        <h1 id="balance-heading">OVERALL</h1>
        <p><span className="balance-sub-heading">Income:</span> {this.props.totalIncome}</p>
        <p><span className="balance-sub-heading">Expense:</span> {this.props.totalExpense}</p>
        <p><span className="balance-sub-heading">Balance:</span> {this.props.balance}</p>
      </div>
    )
  }
}
