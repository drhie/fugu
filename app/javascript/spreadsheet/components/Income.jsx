import React from 'react'
import {formatInteger} from './helperFunctions';

export default class Income extends React.Component {

  onEdit() {
    return this.props.onEdit(this.props.item)
  }

  render() {
    return (
      <div className={"income-bar-part " + this.props.colorClass} style={{width: this.props.width}} onClick={()=>this.onEdit()}>
        <div className="delete" onClick={(e)=>{e.stopPropagation(); if (confirm(`Are you sure you want to delete income from "${this.props.item["name"]}"?`)) this.props.onDelete("item", this.props.item)}}>
          <i className="fa fa-close" />
        </div>
        <div className="income-bar-text">
          {this.props.item["name"]}<br/>{formatInteger(this.props.currency, this.props.item["amount"])}
        </div>
      </div>
    )
  }
}
