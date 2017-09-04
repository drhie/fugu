import React from 'react';

export default class Item extends React.Component {
  handleClick() {
    this.props.onEdit();
  }

  render() {
    return (
      <div className={"border item-box " + this.props.className} onClick={()=>this.handleClick()}>
        <p className="item-name">{this.props.itemName}</p>
        <p className="item-amount">{this.props.itemAmount}</p>
      </div>
    )
  }
}
