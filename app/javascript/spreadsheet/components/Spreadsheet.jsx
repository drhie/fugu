import React, { Component } from 'react';
import Balance from './Balance';
import Grid from './Grid';
import Control from './Control';
import IncomeBar from './IncomeBar';
import InputScreen from './InputScreen';

var ajaxPromise = function(spreadsheetID) {
  return $.ajax({
    url: spreadsheetID + "/last_item",
    dataType: "JSON",
    type: "GET"
  });
}

var retrieveNewItem = function(ajaxData, itemData) {
  return $.ajax({
    url: ajaxData["url"],
    type: ajaxData["type"],
    dataType: 'json',
    data: itemData
  });
}

var getNewItem = function(data) {
  return data
};

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
    this.onNew = this.onNew.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.generateControlPanel = this.generateControlPanel.bind(this);
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
    this.organizeItems();
  }

  update() {
    this.setState(
      {
      totalIncome: this.calculateTotalIncome(),
      totalExpense: this.calculateTotalExpense(),
      totalBalance: this.calculateTotalBalance()
      },
      function() {this.organizeItems()}
    )
  }

  organizeItems() {
    var items = this.props.items;
    var expenses = {};
    var income = [];
    var categories = [];
    var expenseItems = items.forEach(function(item) {
      if (item.is_expense) {
        if (expenses.hasOwnProperty(item["item_type"])) {
          expenses[item["item_type"]].push({id: item["id"], name: item["name"], amount: item["amount"], category: item["item_type"]});
        } else {
          expenses[item["item_type"]] = [{id: item["id"], name: item["name"], amount: item["amount"], category: item["item_type"]}];
          categories.push(item["item_type"]);
        }
      } else {
        income.push({id: item["id"], name: item["name"], amount: item["amount"], category: "income"});
      }
    })
    this.setState({expenses: expenses, income: income, categories: categories});
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
    let itemToEdit = this.state.itemToEdit;
    var newItem;
    let ajaxData = {
      url: itemToEdit ? "/items/" + itemToEdit : "/items",
      type: itemToEdit ? "PATCH" : "POST"
    }
    var spreadsheetID = this.props.info["id"];
    let itemData;

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
        itemData = {
          item: {
            name: name,
            amount: amount,
            item_type: category,
            is_expense: true,
            spreadsheet_id: spreadsheetID
          }
        }
      } else if (type === "income") {
        itemData = {
          item: {
            name: name,
            amount: amount,
            item_type: "income",
            is_expense: false,
            spreadsheet_id: spreadsheetID
          }
        }
      }
      var ajaxItems = retrieveNewItem(ajaxData, itemData).done(function(response) {
        if (ajaxData["type"] === "POST") {
          //BIG ISSUES WITH THIS ONE
          var newItem;
          $.ajax({
            url: spreadsheetID + "/last_item",
            dataType: "JSON",
            type: "GET"
          }).done(function(data) {
            newItem = getNewItem(data)
          });
        } else if (ajaxData["type"] === "PATCH") {
          items.forEach(function(item) {
            if (item.id === itemToEdit) {
              item["name"] = inputValues["name"];
              item["amount"] = parseInt(inputValues["amount"]);
              item["item_type"] = inputValues["category"] || "income";
            }
          });
        }
        debugger;
      });
      debugger;
      console.log(ajaxItems);
    };
  }

  newItem() {

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
            title="Income"
            onNew={this.onNew} />
          <Control
            inputType={()=>this.setInputType("Category")}
            title="Category"
            onNew={this.onNew} />
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
        <div>
          <IncomeBar
            currency={this.state.currency}
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
              currency={this.state.currency}

              onEdit={this.onEdit}
              onDelete={this.onDelete} />
          </div>
        </div>
      </div>
    )
  }
}
