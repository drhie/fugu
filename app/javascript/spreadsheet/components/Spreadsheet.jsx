import React, { Component } from 'react';
import Balance from './Balance';
import Grid from './Grid';
import Control from './Control';
import InputScreen from './InputScreen';

export default class Spreadsheet extends Component {
  constructor() {
    super();
    this.state = {
      inputScreen: false,
      inputType: null,
      categories: ["Groceries", "Entertainment", "Utilities", "Misc"],
      expenses: {
        "Groceries": [{name: "cheese", amount: 100}, {name: "bread", amount: 200}],
        "Entertainment": [{name: "movies", amount: 200}, {name: "magazines", amount: 5000}],
        "Utilities": [{name: "water", amount: 5000}, {name: "internet", amount: 4000}, {name: "electricity", amount: 5000}],
        "Misc": [{name: "key money", amount: 25000}]
      }
    }
  }

  closeInputScreen(i) {
    if (this.state.inputScreen) {
      this.setState({ inputScreen: false });
    } else {
      this.setState({ inputScreen: true });
    }
  }

  setInputScreen(i) {
    this.setState({inputScreen: true, inputType: i})
  }

  calculateTotalIncome() {
    let total = 0;
    return total;
  }

  calculateTotalExpense() {
    let expenses = this.state.expenses;
    let total = 0;
    for (var key in expenses) {
      expenses[key].forEach(function(e) {
        total += e["amount"]
      })
    }
    return total;
  }

  calculateTotalBalance() {
    return this.calculateTotalIncome() - this.calculateTotalExpense();
  }

  render() {
    return (
      <div className="border">
        <Grid
          items={this.state.expenses}
          categories={this.state.categories} />
        <div className="border balance">
          <Balance
            totalIncome={this.calculateTotalIncome()}
            totalExpense={this.calculateTotalExpense()}
            balance={this.calculateTotalBalance()}
            />
          <div className="panel">
            <div className="panel-bar">
              <Control
                inputType={()=>this.setInputScreen("Expense")}
                title="Expense" />
              <Control
                inputType={()=>this.setInputScreen("Income")}
                title="Income" />
              <Control
                inputType={()=>this.setInputScreen("Category")}
                title="Category" />
            </div>
            <InputScreen
              submitData={()=>this.closeInputScreen()}
              revealInput={this.state.inputScreen}
              categories={this.state.categories}
              title={this.state.inputType} />
          </div>
        </div>
      </div>
    )
  }
}
