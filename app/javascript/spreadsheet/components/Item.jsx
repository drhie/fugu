import React from 'react';
import {formatInteger} from './helperFunctions';

export default class Item extends React.Component {
  render() {
    return (
      <div className={"item-box " + this.props.className} onClick={()=>this.props.onEdit(this.props.item)}>
        <div className="delete" onClick={(e)=>{e.stopPropagation(); this.props.onDelete("item", this.props.item)}}>
          <i className="fa fa-close" />
        </div>
        <p className="item-name">{this.props.item["name"]}</p>
        <div className="item-bottom-half">
          <p className="item-transaction-date">{this.props.item["transactionDate"]}</p>
          <p className="item-amount">{formatInteger(this.props.currency, this.props.item["amount"])}</p>
        </div>
      </div>
    )
  }
}
