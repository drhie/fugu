import React, { Component } from 'react';
import Balance from './Balance';
import Grid from './Grid';

export default class Spreadsheet extends Component {
  render() {
    return (
      <div className="border">
        <Grid />
        <Balance />
      </div>
    )
  }
}
