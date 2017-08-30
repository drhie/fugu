import React from 'react';

function hoverElement() {
  document.getElementsByClassName('item-box').addEventListener('click', ()=> {
    debugger;
    this.style.border = "1px solid red"
  });
}

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
