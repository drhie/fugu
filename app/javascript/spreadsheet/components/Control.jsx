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
        id={"add-"+this.props.title.toLowerCase()}
        className="panel-button border"
        onClick={()=>{this.props.inputType(this.props.title)}}
        >
        Add {this.props.title}
      </div>
    )
  }
}
