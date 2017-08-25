import React from 'react'

export default class Balance extends React.Component {
  render() {
    return (
      <div className="border balance">
        <h1>OVERALL</h1>
        <p>Income: </p>
        <p>Expense: </p>
        <p>Balance: </p>
      </div>
    )
  }
}
