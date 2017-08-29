import React from 'react';

export default class Income extends React.Component {
  constructor(props) {
    super(props);
  }

  incomeElements() {
    var colors = ["royalblue", "orange", "turquoise", "yellow", "crimson"]
    var income = this.props.income;
    var total = 0;
    income.forEach(function(i) {
      total += i["amount"];
    });
    return income.map(function(i, n) {
      console.log(i, (i["amount"]/total*100));
      return <div className="incomeBarPart" style={{background: colors[n], width: (i["amount"]/total*100) + "%", height: "20px"}}>{i["name"]}</div>
    })
  }

  render() {
    return <div style={{height: "20px"}}>
      {this.incomeElements()}
    </div>
  }
}
