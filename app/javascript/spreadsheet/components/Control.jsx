import React from 'react'

export default class Control extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }


  render() {
    return (
      <div
        id="add-expense"
        className="panel-button border"
        onClick={()=>{this.props.toggleInput()}}
        >
        {this.props.title}
      </div>
    )
  }
}
