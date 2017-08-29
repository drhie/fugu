import React from 'react'

export default class Balance extends React.Component {
  render() {
    return (
      <div className="balance">
        <h1 id="balance-heading">OVERALL</h1>
        <p>Income: {this.props.totalIncome}</p>
        <p>Expense: {this.props.totalExpense}</p>
        <p>Balance: {this.props.balance}</p>
      </div>
    )
  }
}
