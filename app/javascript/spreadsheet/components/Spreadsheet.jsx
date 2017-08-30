import React, { Component } from 'react';
import Balance from './Balance';
import Grid from './Grid';
import Control from './Control';
import Income from './Income';
import InputScreen from './InputScreen';

export default class Spreadsheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      amount: "",
      category: "",
      inputScreen: false,
      inputType: null,
      categories: [],
      income: [],
      expenses: {},
      currency: "USD",

      totalIncome: 0,
      totalExpense: 0,
      totalBalance: 0
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.closeInputScreen = this.closeInputScreen.bind(this);
  }

  componentDidMount() {
    this.setState({
      categories: this.props.categories,
      income: this.props.income,
      expenses: this.props.expenses,
      totalIncome: parseInt(this.props.totalIncome),
      totalExpense: parseInt(this.props.totalExpense),
      totalBalance: parseInt(this.props.balance),
      currency: this.props.info["currency"]
    })
  }

  closeInputScreen() {
    if (this.state.inputScreen) {
      this.setState({ inputScreen: false });
    } else {
      this.setState({ inputScreen: true });
    }
  }

  handleInputChange(key, value) {
    if (key === "amount") this.setState({amount: value});
    if (key === "name") this.setState({name: value});
    if (key === "category") this.setState({category: value});
  }

  handleInputSubmit(e) {
    var name, amount, category;

    var type = this.state.inputType.toLowerCase();
    var categories = this.state.categories;
    var expenses = this.state.expenses;
    var income = this.state.income;
    var totalIncome = this.state.totalIncome;
    var totalExpense = this.state.totalExpense;
    var totalBalance = this.state.totalBalance;

    let data;

    name = e.target.elements.name.value;
    if (type === "category") {
      categories.push(name);
      expenses[name] = [];
      this.setState({
        categories: categories,
        expenses: expenses
      })
    } else {
      amount = parseInt(e.target.elements.amount.value);
      if (type === "expense") {
        category = e.target.elements.category.value;
        data = {
          item: {
            name: name,
            amount: amount,
            item_type: category,
            is_expense: true,
            spreadsheet_id: this.props.info["id"]
          }
        }
      } else if (type === "income") {
        data = {
          item: {
            name: name,
            amount: amount,
            item_type: "income",
            is_expense: false,
            spreadsheet_id: this.props.info["id"]
          }
        }
      }
      $.ajax({
        url: '/items',
        type: 'POST',
        dataType: 'json',
        data: data
      }).success((data)=>{
        if (type === "expense") {
          if (expenses.hasOwnProperty(category)) {
            expenses[category].push({name: name, amount: amount});
          } else {
            expenses[category] = [{name: name, amount: amount}];
          }
          totalExpense += amount;
          totalBalance -= amount;
          this.setState({expenses: expenses, totalExpense: totalExpense, totalBalance: totalBalance});
        } else if (type === "income") {
          income.push({name: name, amount: amount});
          totalIncome += amount;
          totalBalance += amount;
          this.setState({income: income, totalIncome: totalIncome, totalBalance: totalBalance});
        }
      });

    }
  }

  setInputType(i) {
    this.setState({inputScreen: true, inputType: i})
  }

  calculateTotalIncome() {
    let total = 0;
    income.forEach(function(e) {
      total += e["amount"]
    });
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

  generateControlPanel() {
    if (this.state.categories && this.state.categories.length > 0) {
      return (
        <div className="panel-bar">
          <Control
            inputType={()=>this.setInputType("Expense")}
            title="Expense" />
          <Control
            inputType={()=>this.setInputType("Income")}
            title="Income" />
          <Control
            inputType={()=>this.setInputType("Category")}
            title="Category" />
        </div>
      )
    } else {
      return (
        <div className="panel-bar">
          <Control
            inputType={()=>this.setInputType("Income")}
            title="Income" />
          <Control
            inputType={()=>this.setInputType("Category")}
            title="Category" />
        </div>
      )
    }
  }

  render() {
    return (
      <div id="shell">
        <h2 className="spreadsheet-title">{this.props.info["title"]}</h2>
        <div className="border">
          <Income
            income={this.state.income}
            totalIncome={this.state.totalIncome}
            totalExpense={this.state.totalExpense} />
          <div id="main-section">
            <div className="border info-control">
              <Balance
                currency={this.state.currency}
                totalIncome={this.state.totalIncome}
                totalExpense={this.state.totalExpense}
                balance={this.state.totalBalance}
                />
              <div className="panel">
                { this.generateControlPanel() }
                <InputScreen
                  closeOnSubmit={this.closeInputScreen}
                  revealInput={this.state.inputScreen}
                  categories={this.state.categories}
                  title={this.state.inputType}

                  onInputChange={this.handleInputChange}
                  onInputSubmit={this.handleInputSubmit} />
              </div>
            </div>
            <Grid
              items={this.state.expenses}
              categories={this.state.categories} />
          </div>
        </div>
      </div>
    )
  }
}
