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
      inputType: null
    }
  }

  showInputScreen() {
    if (this.state.inputScreen) {
      this.setState({ inputScreen: false });
    } else {
      this.setState({ inputScreen: true });
    }
  }

  setInputType(title) {
    this.setState({ inputType: title })
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
        <Grid />
        <Balance
          totalIncome={0}
          totalExpense={0}
          balance={0}
          />
      </div>
    )
  }
}
