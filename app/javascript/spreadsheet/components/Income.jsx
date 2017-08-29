import React from 'react';


function total(income) {
  var total = 0;
  income.forEach(function(i) {
    total += i["amount"];
  });
  return total;
}

export default class Income extends React.Component {
  constructor(props) {
    super(props);
  }

  incomeElements() {
    var colors = ["royalblue", "seagreen", "darkorange", "mediumpurple", "chocolate"]
    var income = this.props.income;
    return income.map(function(i, n) {
      console.log(i, (i["amount"]/total(income)*100));
      return <div className="income-bar-part" style={{background: colors[n], width: (i["amount"]/total(income)*100) + "%", height: "25px"}}>{i["name"]}</div>
    })
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
