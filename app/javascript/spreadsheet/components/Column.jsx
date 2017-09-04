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
        return this.props.items[key].map((item, num)=> {
          var evenOdd = num % 2 === 0 ? "even-row" : "odd-row";
          return this.renderItem(item, evenOdd);
        });
      }
    }
  }

  onEdit() {
    this.props.onEdit();
  }

  renderItem(item, evenOdd) {
    return (
      <Item itemName={item["name"]}
        className={evenOdd}
        itemAmount={item["amount"]}
        name={this.props.name}
        amount={this.props.amount}
        category={this.props.category}
        onEdit={()=>this.onEdit()} />
    )
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
