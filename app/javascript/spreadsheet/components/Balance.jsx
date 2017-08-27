import React from 'react'

export default class Balance extends React.Component {
  render() {
    return (
      <div>
        <h1>OVERALL</h1>
        <p>Income: {this.props.totalIncome}</p>
        <p>Expense: {this.props.totalExpense}</p>
        <p>Balance: {this.props.balance}</p>
      </div>
    )
  }
}
