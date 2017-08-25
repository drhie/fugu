import React from 'react'
import Item from './Item'

export default class Column extends React.Component {
  render() {
    return(
      <div>
        { [0, 1, 2, 3, 4, 5].map(function(i) {
          return <Item />
        }.bind(this)) }
      </div>
    )
  }
}
