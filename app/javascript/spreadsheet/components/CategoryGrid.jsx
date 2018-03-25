import React from 'react'

export default class CategoryGrid extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }

  filterCategory(name) {
    this.props.onFilterCategory(name);
  }

  renderCategoryButtons() {
    var categories = this.props.categories;
    var elements = categories.map(function(e) {
      if (e != "income") {
        return (
          <div className="category-button" id={e == this.props.currentCategory ? "active" : null} onClick={()=>this.filterCategory(e)}>
            {e}
          </div>
        )
      }
    }.bind(this));
    return elements;
  }

  render() {
    return (
      <div className="category-panel">
        {this.renderCategoryButtons()}
        <div className="category-button" onClick={()=>this.filterCategory("")}>
          <i className="fa fa-step-backward" /> Return
        </div>
      </div>
    )
  }
}
