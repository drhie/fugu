import React from 'react'
import {formatInteger} from './helperFunctions';
import happyFish from '../images/blowfish_happy_1';
import sadFish from '../images/blowfish_sad_1'

function calculateAkaji(number) {
  if (0 > number) {
    return "crimson"
  } else {
    return null
  }
}

export default class Balance extends React.Component {

  renderEntireBalance() {
    if (this.props.userID > 0) {
      return (
        <div>
          <span className="balance-sub-heading" style={{color: calculateAkaji(this.props.entireBalance + this.props.balance)}}>Entire Balance:</span>
          <span style={{color: calculateAkaji(this.props.entireBalance + this.props.balance)}}>{formatInteger(this.props.currency, this.props.entireBalance + this.props.balance)}</span>
        </div>
      )
    }
  }

  getImage(balance) {
    return balance > 0 ? happyFish : sadFish;
  }

  render() {
    return (
      <div className="balance">
        <img className="mascot fugu-chan" src={this.getImage(this.props.balance)} />
        <div className="balance-details">
          <div className="balance-sub-heading">
            <div className="balance-icon">
              <i className="fa fa-plus-circle"/>
            </div>
            {formatInteger(this.props.currency, this.props.totalIncome)}
          </div>
          <div className="balance-sub-heading">
            <div className="balance-icon">
              <i className="fa fa-minus-circle"/>
            </div>
            {formatInteger(this.props.currency, this.props.totalExpense)}
          </div>
          <div className="balance-sub-heading" style={{color: calculateAkaji(this.props.balance)}}>
            <div className="balance-icon">
              <i className="fa fa-balance-scale"/>
            </div>
            {formatInteger(this.props.currency, this.props.balance)}
          </div>
        </div>
      </div>
    )
  }
}
