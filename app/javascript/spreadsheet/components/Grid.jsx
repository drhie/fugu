import React from 'react'
import Column from './Column'

export default class Grid extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }

  onEdit() {
    this.props.onEdit();
  }

  render() {
    return (
      <div className="border grid">
        <div className="columns">
          { this.props.categories.map(function(category) {
            return <div className="column">
              <Column
                heading={category}
                items={this.props.items}
                name={this.props.name}
                amount={this.props.amount}
                category={this.props.category}
                onEdit={()=>this.onEdit()} />
            </div>
          }.bind(this)) }
        </div>
      </div>
    )
  }
}
