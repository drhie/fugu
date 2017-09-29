import React from 'react'

export default class Control extends React.Component {
  constructor() {
    super();
  }


  onNew() {
    this.props.inputType(this.props.title);
    this.props.onNew();
  }

  render() {
    return (
      <div
        id={"add-"+this.props.title.toLowerCase()}
        className="panel-button border"
        onClick={()=>{this.onNew()}}
        >
        {this.props.title}
      </div>
    )
  }
}
