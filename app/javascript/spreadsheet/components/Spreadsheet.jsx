import React, { Component } from 'react';
import Balance from './Balance';
import Grid from './Grid';
import Control from './Control';
import Income from './Income';
import InputScreen from './InputScreen';

var lastItem = function(spreadsheetID) {
  return $.ajax({
    url: spreadsheetID + "/last_item",
    dataType: "JSON",
    type: "GET"
  })
}

export default class Spreadsheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      amount: "",
      category: "",
      inputScreen: false,
      inputType: null,
      itemToEdit: null,
      categories: [],
      income: [],
      expenses: {},
      currency: "USD",

      info: {},

      totalIncome: 0,
      totalExpense: 0,
      totalBalance: 0
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.closeInputScreen = this.closeInputScreen.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onNew = this.onNew.bind(this);
  }

  componentDidMount() {
    this.setState({
      categories: this.props.categories,
      income: this.props.income,
      expenses: this.props.expenses,
      totalIncome: parseInt(this.props.totalIncome),
      totalExpense: parseInt(this.props.totalExpense),
      totalBalance: parseInt(this.props.balance),
      currency: this.props.info["currency"],
      info: this.props.info
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
    var inputValues = {
      name: e.target.name ? e.target.name.value : undefined,
      amount: e.target.amount ? e.target.amount.value : undefined,
      category: e.target.category ? e.target.category.value : undefined
    }
    var name, amount, category;

    var type = this.state.inputType.toLowerCase();
    var categories = this.state.categories;
    var expenses = this.state.expenses;
    var income = this.state.income;
    var totalIncome = this.state.totalIncome;
    var totalExpense = this.state.totalExpense;
    var totalBalance = this.state.totalBalance;


    let ajaxUrl = this.state.itemToEdit ? "/items/" + this.state.itemToEdit : "/items";
    let ajaxType = this.state.itemToEdit ? "PATCH" : "POST";
    var getLastItem = lastItem(this.props.info["id"]);
    let itemToEdit = this.state.itemToEdit;

    let data;
    name = inputValues["name"];
    if (type === "category") {
      categories.push(name);
      expenses[name] = [];
      this.setState({
        categories: categories,
        expenses: expenses
      })
    } else {
      amount = parseInt(inputValues["amount"]);
      if (type === "expense") {
        category = inputValues["category"];
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
        url: ajaxUrl,
        type: ajaxType,
        dataType: 'json',
        data: data
      }).success((data)=>{
        if (ajaxType === "POST") {
          var newItem;;
          getLastItem.success(function(data) {
            newItem = data;
          });
          if (type === "expense") {
            if (expenses.hasOwnProperty(category)) {
              expenses[category].push({id: newItem["id"], name: name, amount: amount, category: newItem["item_type"]});
            } else {
              expenses[category] = [{id: newItem["id"], name: name, amount: amount, category: newItem["item_type"]}];
            }
            totalExpense += amount;
            totalBalance -= amount;
            this.setState({expenses: expenses, totalExpense: totalExpense, totalBalance: totalBalance});
          } else if (type === "income") {
            income.push({id: newId, name: name, amount: amount});
            totalIncome += amount;
            totalBalance += amount;
            this.setState({income: income, totalIncome: totalIncome, totalBalance: totalBalance});
          }
        } else if (ajaxType === "PATCH") {
          if (type === "expense") {
            expenses[category].forEach(function(item) {
              if (item.id === itemToEdit) {
                item["name"] = inputValues["name"];
                item["amount"] = inputValues["amount"];
                item["category"] = inputValues["category"];
              }
            });
            this.setState({expenses: expenses, totalExpense: this.calculateTotalExpense(), totalBalance: this.calculateTotalBalance()});
          }
        }
      });

    }
  }

  setInputType(i) {
    this.setState({inputScreen: true, inputType: i})
  }

  calculateTotalIncome() {
    let total = 0;
    let income = this.state.income;
    income.forEach(function(e) {
      total += parseInt(e["amount"]);
    });
    return total;
  }

  calculateTotalExpense() {
    let total = 0;
    let expenses = this.state.expenses;
    for (var key in expenses) {
      expenses[key].forEach(function(e) {
        total += parseInt(e["amount"]);
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
            title="Expense"
            onNew={this.onNew} />
          <Control
            inputType={()=>this.setInputType("Income")}
            title="Income"
            onNew={this.onNew} />
          <Control
            inputType={()=>this.setInputType("Category")}
            title="Category"
            onNew={this.onNew} />
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

  onEdit(item) {
    console.log(item["id"], item["name"], item["amount"], item["category"], "from Spreadsheet");
    if (item["category"].toLowerCase() === "income") {
      this.setState({inputType: "Income", inputScreen: true, itemToEdit: item["id"], name: item["name"], amount: item["amount"]});
    } else {
      this.setState({inputType: "Expense", inputScreen: true, itemToEdit: item["id"], name: item["name"], amount: item["amount"], category: item["category"]});
    }
  }

  onNew() {
    this.setState({
      name: "",
      amount: "",
      category: "",
      itemToEdit: null,
    })
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
                currency={this.state.info["currency"]}
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
                  item={this.state.itemToEdit}

                  name={this.state.name}
                  amount={this.state.amount}
                  category={this.state.category}

                  onInputChange={this.handleInputChange}
                  onInputSubmit={this.handleInputSubmit} />
              </div>
            </div>
            <Grid
              items={this.state.expenses}
              categories={this.state.categories}
              name={this.state.name}
              amount={this.state.amount}
              category={this.state.category}
              onEdit={this.onEdit} />
          </div>
        </div>
      </div>
    )
  }
}
