import React from 'react';

export default class Item extends React.Component {
  render() {
    return (
      <div className={"border item-box " + this.props.className} onClick={()=>this.props.onEdit(this.props.item)}>
        <div className="delete" onClick={(e)=>{e.stopPropagation(); this.props.onDelete(this.props.item)}}>X</div>
        <p className="item-name">{this.props.item["name"]}</p>
        <p className="item-amount">{this.props.item["amount"]}</p>
      </div>
    )
  }
}
