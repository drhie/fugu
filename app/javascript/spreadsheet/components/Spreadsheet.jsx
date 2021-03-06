import React, { Component } from 'react';
import Balance from './Balance';
import Grid from './Grid';
import Control from './Control';
import IncomeBar from './IncomeBar';
import InputScreen from './InputScreen';

import happyFish_1 from '../images/blowfish_happy_1';
import happyFish_2 from '../images/blowfish_happy_2';
import sadFish_1 from '../images/blowfish_sad_1';
import sadFish_2 from '../images/blowfish_sad_2';

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
      transactionDate: "",
      inputScreen: false,
      inputType: null,
      itemToEdit: null,
      categories: [],
      income: [],
      expenses: {},
      items: {},
      currency: "USD",
      currentCategory: null,

      info: {},

      totalIncome: 0,
      totalExpense: 0,
      totalBalance: 0,
      entireBalance: 0,
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.closeInputScreen = this.closeInputScreen.bind(this);
    this.onNew = this.onNew.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.generateControlPanel = this.generateControlPanel.bind(this);
    this.onFilterCategory = this.onFilterCategory.bind(this);
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
      info: this.props.info,
      entireBalance: parseInt(this.props.entireBalance)
    });
    this.organizeItems("mount");
  }

  update() {
    var totalBalance = this.calculateTotalBalance()
    this.setState(
      {
      totalIncome: this.calculateTotalIncome(),
      totalExpense: this.calculateTotalExpense(),
      totalBalance: totalBalance
      },
      function() {
        this.organizeItems("update");
        this.animateFugu(totalBalance);
      }
    )
  }

  animateFugu(balance) {
    var mascot = document.getElementsByClassName('mascot fugu-chan')[0];
    var frames = balance > 0 ? [happyFish_1, happyFish_2] : [sadFish_1, sadFish_2];
    var intervalTimes = 0;
    var interval = setInterval(function(){
      mascot.src = mascot.src.includes("_1") ? frames[1] : frames[0];
      intervalTimes ++;
      if (intervalTimes > 2) clearInterval(interval);
    }, 500)
  }

  organizeItems(stage) {
    var items = stage == "mount" ? this.props.items : this.state.items;
    var expenses = {};
    var income = [];
    var category_index;
    $.ajax({
      url: "/categories",
      type: "GET",
      dataType: "JSON"
    }).done(function(data) {
      category_index = data;
      var expenseItems = items.forEach(function(item) {
        if (typeof item["category_id"] === "string") {
          for (var key in category_index) {
            if (item["category_id"] === category_index[key]) {
              item["category_id"] = key;
            }
          }
        }
        var category = category_index[item["category_id"]]
        if (item.is_expense) {
          if (expenses.hasOwnProperty(category)) {
            expenses[category].push({id: item["id"], name: item["name"], amount: item["amount"], category: category, transactionDate: item["transaction_date"]});
          } else {
            expenses[category] = [{id: item["id"], name: item["name"], amount: item["amount"], category: category, transactionDate: item["transaction_date"]}];
          }
        } else {
          income.push({id: item["id"], name: item["name"], amount: item["amount"], category: category, transactionDate: item["transaction_date"]});
        }
      });
      this.setState({expenses: expenses, income: income});
    }.bind(this));
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
    if (key === "transaction_date") this.setState({transactionDate: value});
  }

  handleInputSubmit(e) {
    var inputValues = {
      name: e.target.name ? e.target.name.value : undefined,
      amount: e.target.amount ? e.target.amount.value : undefined,
      category: e.target.category ? e.target.category.value : undefined,
      transactionDate: e.target.transaction_date ? e.target.transaction_date.value : undefined,
    };
    if (this.state.inputType.toLowerCase() === "income") {
      var existingItem = this.state.itemToEdit ? this.state.itemToEdit : false;
      inputValues["category"] = "income";
      this.registerItem(inputValues, existingItem);
    } else if (this.state.inputType.toLowerCase() === "category") {
      this.registerCategory(inputValues["name"].toLowerCase());
    } else if (this.state.inputType.toLowerCase() === "expense") {
      var existingItem = this.state.itemToEdit ? this.state.itemToEdit : false;
      this.registerItem(inputValues, existingItem);
    }
  }

  registerItem(inputValues, existingItem) {
    var url = existingItem ? "/items/" + existingItem : "/items";
    var method = existingItem ? "PATCH" : "POST";
    var isExpense = inputValues["category"] === "income" ? false : true;
    $.ajax({
      url: url,
      type: method,
      dataType: "JSON",
      data: {
        item: {
          name: inputValues["name"],
          amount: inputValues["amount"],
          is_expense: isExpense,
          transaction_date: inputValues["transactionDate"]
        },
        spreadsheet_id: this.props.info["id"],
        category: inputValues["category"]
      },
    }).then((data)=> {
      if (method === "POST") {
        $.ajax({
          url: this.props.info["id"] + "/last_item",
          dataType: "JSON",
          type: "GET",
        }).then(function(item) {
          var items = this.state.items;
          items.push(item);
          //Always set items and then update. Don't manipulate income and expense states.
          this.setState({ items: items }, this.update());
        }.bind(this));
      }
    });

    if (method === "PATCH") {
      var items = this.state.items;
      items.forEach((e) => {
        if (e.id === existingItem) {
          e["name"] = inputValues["name"];
          e["amount"] = parseInt(inputValues["amount"]);
          e["transaction_date"] = inputValues["transactionDate"];
          if (inputValues["category"]) e["category_id"] = inputValues["category"]
        }
      });
      //Always set items and then update. Don't manipulate income and expense states.
      this.setState({ items: items, itemToEdit: null }, this.update());
    }
  }

  registerCategory(name) {
    //BACKEND
    $.ajax({
      url: "/categories",
      type: "POST",
      dataType: "JSON",
      data: {
        category: {
          name: name,
        },
        spreadsheet_id: this.props.info["id"]
      }
    })
    //FRONTEND
    var categories = this.state.categories
    if (!categories.includes(name)) {
      categories.push(name)
      this.setState({ categories: categories })
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
    if (this.state.categories.length > 1) {
      return (
        <div className="panel-bar">
          <Control
            inputType={()=>this.setInputType("income")}
            title="income"
            currentTitle={this.state.inputType}
            onNew={this.onNew} />
          <Control
            inputType={()=>this.setInputType("category")}
            title="category"
            currentTitle={this.state.inputType}
            onNew={this.onNew} />
          <Control
            inputType={()=>this.setInputType("expense")}
            title="expense"
            currentTitle={this.state.inputType}
            onNew={this.onNew} />
        </div>
      )
    } else {
      return (
        <div className="panel-bar">
          <Control
            inputType={()=>this.setInputType("income")}
            title="income"
            onNew={this.onNew} />
          <Control
            inputType={()=>this.setInputType("category")}
            title="category"
            onNew={this.onNew} />
        </div>
      )
    }
  }

  onDelete(type, identifier) {
    let items = this.state.items;
    let categories = this.state.categories;
    let spreadsheet = this.state.info["id"];
    if (type == "item") {
      $.ajax({
        url: "/items/" + identifier["id"],
        type: "DELETE",
      }).done(function(deleted_id) {
        for (var i = 0; i < items.length; i++) {
          if (items[i]["id"] === deleted_id) {
            var index = items.indexOf(items[i]);
            items.splice(index, 1);
          }
        }
        //Always set items and then update. Don't manipulate income and expense states.
        this.setState({items: items}, this.update());
      }.bind(this));
    } else if (type == "category") {
      $.ajax({
        url: "/spreadsheets/" + spreadsheet + "/categories/" + identifier,
        type: "DELETE",
      }).done((data)=> {
        items = items.filter((item)=> !data["deleted_ids"].includes(item["id"]));
        categories = categories.filter((category)=> category != data["deleted_category"])
        //Always set items and then update. Don't manipulate income and expense states.
        this.setState({items: items, categories: categories}, function() {this.update()});
      });
    }
  }

  onEdit(item) {
    var transactionDate = item["transactionDate"] || ""
    if (item["category"] === "income") {
      this.setState({inputType: "income", inputScreen: true, itemToEdit: item["id"], name: item["name"], amount: item["amount"], transactionDate: transactionDate});
    } else {
      this.setState({inputType: "expense", inputScreen: true, itemToEdit: item["id"], name: item["name"], amount: item["amount"], category: item["category"], transactionDate: transactionDate});
    }
  }

  onNew() {
    this.setState({
      name: "",
      amount: "",
      category: "",
      transactionDate: "",
      itemToEdit: null,
    })
  }

  onFilterCategory(name) {
    this.setState({currentCategory: name});
  }

  render() {
    return (
      <div id="shell">
        <h2 className="spreadsheet-title">{this.props.info["title"]}</h2>
        <div>
          <IncomeBar
            currency={this.state.currency}
            income={this.state.income}
            expenses={this.state.expenses}
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
                entireBalance={this.state.entireBalance}
                userID={this.state.info["user_id"]}
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
                  transactionDate={this.state.transactionDate}

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
              currentCategory={this.state.currentCategory}
              onEdit={this.onEdit}
              onDelete={this.onDelete}
              onFilterCategory={this.onFilterCategory} />
          </div>
        </div>
      </div>
    )
  }
}
