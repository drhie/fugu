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
    var widthAmount = this.props.totalExpense > this.props.totalIncome ? "100%" : (this.props.totalExpense/(total(this.props.income))*100) + "%";
    if (this.props.totalExpense > 0) {
      return <div className="expense-bar-part" style={{width: widthAmount}}></div>
    }
  }

  width(subject, object) {
    return subject > object ? "100%" : subject/object*100 + "%"
  }

  render() {
    return <div className="income-bar">
      <div className="income-elements" style={{width: this.width(this.props.totalIncome, this.props.totalExpense)}}>
        {this.incomeElements()}
      </div>
      <div className="expense-elements" style={{width: this.width(this.props.totalExpense, this.props.totalIncome)}}>
        {this.expenseElements()}
      </div>
    </div>
  }
}
