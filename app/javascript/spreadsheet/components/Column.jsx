import React from 'react'
import Item from './Item'

export default class Column extends React.Component {
  renderRow() {
    for (var key in this.props.items) {
      if (key === this.props.heading) {
        return this.props.items[key].map(function(item) {
          return <Item itemName={item["name"]} itemAmount={item["amount"]} />
        });
      }
    }
  }
  render() {
    return(
      <div>
        <div>{this.props.heading}</div>
        {this.renderRow()}
      </div>
    )
  }
}
