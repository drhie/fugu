import React from 'react';

function formatInteger(currency, integer) {
  var currencies = {
    "JPY": "¥",
    "CAD": "$",
    "USD": "$"
  };
  var amount = currencies[currency] + Math.abs(integer).toLocaleString(undefined, {minimumFractionDigits: 0});
  return integer >= 0 ? amount : "-" + amount;
}

export default class Item extends React.Component {
  render() {
    return (
      <div className={"border item-box " + this.props.className} onClick={()=>this.props.onEdit(this.props.item)}>
        <div className="delete" onClick={(e)=>{e.stopPropagation(); this.props.onDelete(this.props.item)}}>x</div>
        <p className="item-name">{this.props.item["name"]}</p>
        <p className="item-amount">{formatInteger(this.props.currency, this.props.item["amount"])}</p>
      </div>
    )
  }
}
