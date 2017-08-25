import React, { Component } from 'react';
import Balance from './Balance';
import Grid from './Grid';
import Control from './Control';

export default class Spreadsheet extends Component {
  handleClick() {

  }

  render() {
    return (
      <div className="border">
        <Control />
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
