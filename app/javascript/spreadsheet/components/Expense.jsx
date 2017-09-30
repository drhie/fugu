import React from 'react'

function formatInteger(currency, integer) {
  var currencies = {
    "JPY": "¥",
    "CAD": "$",
    "USD": "$"
  };
  var amount = currencies[currency] + Math.abs(integer).toLocaleString(undefined, {minimumFractionDigits: 0});
  return integer >= 0 ? amount : "-" + amount;
}

export default class Expense extends React.Component {
  render() {
    return (
      <div className="expense-bar-piece" style={{background: this.props.bgColor, width: this.props.width}} />
    )
  }
}
