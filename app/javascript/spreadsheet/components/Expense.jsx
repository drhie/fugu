import React from 'react'
import {formatInteger} from './helperFunctions';

export default class Expense extends React.Component {
  render() {
    return (
      <div className={"expense-bar-piece " + this.props.bgColor} style={{width: this.props.width}}>
        <div className="expense-bar-hover">
          <p className="expense-name">{this.props.name}</p>
          <p className="expense-total">{formatInteger(this.props.currency, this.props.total)}</p>
          <p className="expense-percentage">({ this.props.width })</p>
        </div>
      </div>
    )
  }
}
