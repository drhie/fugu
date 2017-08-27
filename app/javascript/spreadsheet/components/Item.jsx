import React from 'react';

export default class Item extends React.Component {
  render() {
    return (
      <div className="border box">
        <p>{this.props.itemName}</p>
        <p>{this.props.itemAmount}</p>
      </div>
    )
  }
}
