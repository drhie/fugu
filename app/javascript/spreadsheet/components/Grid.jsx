import React from 'react'
import Column from './Column'

export default class Grid extends React.Component {
  render() {
    return (
      <div className="border grid">
        { [0, 1, 2, 3].map(function(i) {
          return <div className="border column">
              <Column />
          </div>
        }.bind(this)) }
      </div>
    )
  }
}