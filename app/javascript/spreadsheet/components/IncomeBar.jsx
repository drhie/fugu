import React from 'react';
import Income from "./Income"
import Expense from "./Expense"

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
    var colors = ["income-1", "income-2", "income-3", "income-4", "income-5"]
    var income = this.props.income;
    var index = 0;
    var elements = income.map((i, n)=> {
      index = index > colors.length-1 ? 0 : index;
      index++;
      return (
        <Income colorClass={colors[index-1]}
          width={Math.round(i["amount"]/total(income)*10000)/100 + "%"}
          currency={this.props.currency}
          item={i}
          onEdit={this.props.onEdit}
          onDelete={this.props.onDelete} />
      )
    })
    return elements
  }

  expenseElements() {
    var widthAmount = this.props.totalExpense > this.props.totalIncome ? "100%" : (this.props.totalExpense/(total(this.props.income))*100) + "%";
    if (this.props.totalExpense > 0) {
      return <div className="expense-bar-part" style={{width: "100%"}}>{this.renderExpenseBars(this.expenseBars(this.props.expenses))}</div>
    }
  }

  expenseBars(expenses) {
    var elements = []
    for (var key in expenses) {
      var total = 0;
      expenses[key].forEach(function(e) {
        total += e.amount;
      });
      elements.push({
        width: Math.round(total/this.props.totalExpense*10000)/100 + "%",
        percentage: Math.round(total/this.props.totalIncome*1000)/10 + "%",
        name: key,
        total: total
      });
    }
    return elements
  }

  renderExpenseBars(hashData) {
    var widthArray = Object.keys(hashData).map(function(key) {return [parseInt(hashData[key]["total"]), hashData[key]]});
    widthArray.sort(function(first, second) {return second[0] - first[0]});
    var colorTracker = 0;
    var colors = ["expense-1", "expense-2"]
    var elements = widthArray.map((e)=> {
      var color = colorTracker % 2 === 0 ? colors[0] : colors[1];
      colorTracker ++
      return (
        <Expense bgColor={color}
          width={e[1].width}
          percentage = {e[1].percentage}
          name={e[1].name}
          total={e[1].total}
          currency={this.props.currency} />
      )
    });
    return elements;
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
