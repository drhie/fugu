import React from 'react'
import {formatInteger} from './helperFunctions';

export default class Income extends React.Component {

  onEdit() {
    return this.props.onEdit(this.props.item)
  }

  render() {
    return (
      <div className="income-bar-part" style={{background: this.props.bgColor, width: this.props.width}} onClick={()=>this.onEdit()}>
        <div className="delete" onClick={(e)=>{e.stopPropagation(); this.props.onDelete(this.props.item)}}>x</div>
        {this.props.item["name"]}<br/>{formatInteger(this.props.currency, this.props.item["amount"])}
      </div>
    )
  }
}
