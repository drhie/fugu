import React from 'react'
import {formatInteger} from './helperFunctions';

export default class Expense extends React.Component {
  render() {
    return (
      <div className="expense-bar-piece" style={{background: this.props.bgColor, width: this.props.width}}>
        <div className="expense-bar-hover"><p>{this.props.name}</p><p>{this.props.total}</p></div>
      </div>
    )
  }
}
