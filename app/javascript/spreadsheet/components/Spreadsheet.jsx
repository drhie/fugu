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
      categories: ["Groceries", "Entertainment", "Utilities", "Misc"],
      expenses: {
        "Groceries": [{name: "cheese", amount: 100}, {name: "bread", amount: 200}],
        "Entertainment": [{name: "movies", amount: 200}, {name: "magazines", amount: 5000}],
        "Utilities": [{name: "water", amount: 5000}, {name: "internet", amount: 4000}, {name: "electricity", amount: 5000}],
        "Misc": [{name: "key money", amount: 25000}]
      }
    }
  }

  showInputScreen() {
    if (this.state.inputScreen) {
      this.setState({ inputScreen: false });
    } else {
      this.setState({ inputScreen: true });
    }
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

  render() {
    return (
      <div className="border">
        <div className="panel">
          <div className="panel-bar">
            <Control
              toggleInput={()=>this.showInputScreen()}
              title="Expense" />
            <Control
              toggleInput={()=>this.showInputScreen()}
              title="Income" />
            <Control
              toggleInput={()=>this.showInputScreen()}
              title="Category"
              />
          </div>
        </div>
        <InputScreen
          toggleInput={()=>this.showInputScreen()}
          revealInput={this.state.inputScreen}
          title={this.state.inputType} />
        <Grid
          items={this.state.expenses}
          categories={this.state.categories} />
        <Balance
          totalIncome={0}
          totalExpense={this.calculateTotalExpense()}
          balance={0}
          />
      </div>
    )
  }
}
