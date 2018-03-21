import React from 'react'

export default class Control extends React.Component {
  constructor() {
    super();
  }


  onNew() {
    this.props.inputType(this.props.title);
    this.props.onNew();
  }

  getIcon(title) {
    if (title == "income") return <i className="fa fa-money fa-2x" />
    if (title == "category") return <i className="fa fa-sitemap fa-2x" />
    if (title == "expense") return <i className="fa fa-shopping-cart fa-2x" />
  }

  render() {
    return (
      <div
        id={"add-"+this.props.title.toLowerCase()}
        className={this.props.title === this.props.currentTitle ? "panel-button border active" : "panel-button border" }
        onClick={()=>{this.onNew()}}
        >
        {this.getIcon(this.props.title)}
        {this.props.title}
      </div>
    )
  }
}
