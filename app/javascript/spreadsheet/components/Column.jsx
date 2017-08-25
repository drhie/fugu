import React from 'react'

export default class Column extends React.Component {
  render() {
    return(
      <div>
        { [0, 1, 2, 3, 4, 5].map(function(i) {
          return <div className="border box"></div>
        }.bind(this)) }        
      </div>
    )
  }
}
