import React from 'react'

export default class Control extends React.Component {
  render() {
    return (
      <div className="panel">
        <div className="panel-bar">
          <div className="panel-button border" id="add-expense">
            Add an Expense
          </div>
          <div className="panel-button border" id="add-income">
            Add an Income
          </div>
          <div className="panel-button border" id="add-category">
            Add a Category
          </div>
        </div>
      </div>
    )
  }
}
