import React from 'react';

export default class Item extends React.Component {
  render() {
    return (
      <div className={"border item-box " + this.props.className}>
        <p className="item-name">{this.props.itemName}</p>
        <p className="item-amount">{this.props.itemAmount}</p>
      </div>
    )
  }
}
