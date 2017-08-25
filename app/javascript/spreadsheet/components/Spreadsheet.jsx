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
        <Balance />
      </div>
    )
  }
}
