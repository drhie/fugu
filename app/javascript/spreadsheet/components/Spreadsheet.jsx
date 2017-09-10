import React, { Component } from 'react';
import Balance from './Balance';
import Grid from './Grid';
import Control from './Control';
import IncomeBar from './IncomeBar';
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
      items: {},
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
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    this.setState({
      categories: this.props.categories,
      income: this.props.income,
      items: this.props.items,
      totalIncome: parseInt(this.props.totalIncome),
      totalExpense: parseInt(this.props.totalExpense),
      totalBalance: parseInt(this.props.balance),
      currency: this.props.info["currency"],
      info: this.props.info
    })
    this.organizeExpenses();
  }

  update() {
    this.setState(
      {
      totalIncome: this.calculateTotalIncome(),
      totalExpense: this.calculateTotalExpense(),
      totalBalance: this.calculateTotalBalance()
      },
      function() {this.organizeExpenses()}
  )
  }

  organizeExpenses() {
    var items = this.props.items;
    var expenses = {};
    var income = [];
    var expenseItems = items.forEach(function(item) {
      if (item.is_expense) {
        if (expenses.hasOwnProperty(item["item_type"])) {
          expenses[item["item_type"]].push({id: item["id"], name: item["name"], amount: item["amount"], category: item["item_type"]});
        } else {
          expenses[item["item_type"]] = [{id: item["id"], name: item["name"], amount: item["amount"], category: item["item_type"]}];
        }
      } else {
        income.push({id: item["id"], name: item["name"], amount: item["amount"], category: "income"});
      }
    })
    this.setState({expenses: expenses, income: income});
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
    var items = this.state.items;

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
          var newItem;
          getLastItem.success(function(data) {
            newItem = data;
          });
          // if (type === "expense") {
            items.push({
              id: newItem["id"],
              name: name,
              amount: amount,
              item_type: type === "expense" ? newItem["item_type"] : "income",
              is_expense: type=== "expense" ? true : false,
              spreadsheet_id: this.props.info["id"]
            });
            this.setState(
              {items: items},
              function() {this.update()}
            );
          // } else if (type === "income") {
          //   income.push({id: newId, name: name, amount: amount});
          //   totalIncome += amount;
          //   totalBalance += amount;
          //   this.setState({income: income, totalIncome: totalIncome, totalBalance: totalBalance});
          // }
        } else if (ajaxType === "PATCH") {
          items.forEach(function(item) {
            if (item.id === itemToEdit) {
              item["name"] = inputValues["name"];
              item["amount"] = parseInt(inputValues["amount"]);
              item["item_type"] = inputValues["category"] || "income";
            }
          });
          this.setState(
            {items: items},
            function() {this.update()}
          );
        }
      });

    }
  }

  setInputType(i) {
    this.setState({inputScreen: true, inputType: i})
  }

  calculateTotalIncome() {
    let total = 0;
    let items = this.state.items;
    let income = items.forEach(function(e) {
      if (!e.is_expense) total += parseInt(e["amount"]);
    })
    return total;
  }

  calculateTotalExpense() {
    let total = 0;
    let items = this.state.items;
    let expenses = items.forEach(function(e) {
      if (e.is_expense) {
        total += parseInt(e["amount"]);
      }
    })
    return total;
  }

  calculateTotalBalance() {
    console.log("Balance", this.calculateTotalIncome() - this.calculateTotalExpense())
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

  onDelete(item) {
    let items = this.state.items;
    console.log("Deleting", item)
    $.ajax({
      url: "/items/" + item["id"],
      type: "DELETE",
    }).success(()=>{
      for (var i = 0; i < items.length; i++) {
        if (items[i]["id"] === item["id"]) {
          var index = items.indexOf(items[i]);
          items.splice(index, 1);
        }
      }
      this.setState({items, items}, this.update())
    });
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
          <IncomeBar
            income={this.state.income}
            totalIncome={this.state.totalIncome}
            totalExpense={this.state.totalExpense}
            item={this.state.itemToEdit}

            onEdit={this.onEdit}
            onDelete={this.onDelete} />
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
              onEdit={this.onEdit}
              onDelete={this.onDelete} />
          </div>
        </div>
      </div>
    )
  }
}
