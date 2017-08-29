import React from 'react'
import Item from './Item'

export default class Column extends React.Component {
  renderRow() {
    for (var key in this.props.items) {
      if (key === this.props.heading) {
        return this.props.items[key].map(function(item, num) {
          var evenOdd = num % 2 === 0 ? "even-row" : "odd-row";
          return <Item itemName={item["name"]} className={evenOdd} itemAmount={item["amount"]} />
        });
      }
    }
  }
  render() {
    return(
      <div>
        <div className="column-heading">{this.props.heading}</div>
        {this.renderRow()}
      </div>
    )
  }
}
