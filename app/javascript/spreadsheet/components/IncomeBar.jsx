import React from 'react';
import Income from "./Income"

function total(income) {
  var total = 0;
  income.forEach(function(i) {
    total += i["amount"];
  });
  return total;
}

export default class IncomeBar extends React.Component {
  constructor(props) {
    super(props);
    this.incomeElements = this.incomeElements.bind(this);
  }

  onEdit() {
    return this.props.onEdit(this.props.item)
  }

  incomeElements() {
    var colors = ["royalblue", "seagreen", "darkorange", "mediumpurple", "chocolate"]
    var income = this.props.income;
    var elements = income.map((i, n)=> {
      return <Income bgColor={colors[n]} width={i["amount"]/total(income)*100 + "%"} item={i} onEdit={this.props.onEdit} onDelete={this.props.onDelete} />
    })
    return elements
  }

  expenseElements() {
    if (this.props.totalExpense > 0) {
      return <div className="expense-bar-part" style={{width: (this.props.totalExpense/(total(this.props.income))*100) + "%"}}></div>
    }
  }

  render() {
    return <div className="income-bar">
      {this.incomeElements()}
      {this.expenseElements()}
    </div>
  }
}
