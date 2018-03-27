import React from 'react'
import Item from './Item'

export default class Column extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onEditScreen: false
    }
  }

  renderRow() {
    for (var key in this.props.items) {
      if (key === this.props.heading) {
        var itemsByDate = this.props.items[key]
        itemsByDate.sort(function(a,b){
          return new Date(b.transactionDate) - new Date(a.transactionDate);
        });
        return itemsByDate.map((item, num)=> {
          var evenOdd = num % 2 === 0 ? "even-row" : "odd-row";
          return this.renderItem(item, evenOdd);
        });
      }
    }
  }

  renderItem(item, evenOdd) {
    return (
      <Item item={item}
        className={evenOdd}
        currency={this.props.currency}
        onEdit={this.props.onEdit}
        onDelete={this.props.onDelete} />
    )
  }

  render() {
    return(
      <div className="column-wrapper">
        <div className="column-heading">{this.props.heading} - <span>{this.props.columnTotal}</span></div>
        {this.renderRow()}
      </div>
    )
  }
}
