import React from 'react'
import Column from './Column'

export default class Grid extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div className="border grid">
        <div className="columns">
          { this.props.categories.map(function(category) {
            return <div className="border column">
              <Column heading={category} items={this.props.items} />
            </div>
          }.bind(this)) }
        </div>
      </div>
    )
  }
}
