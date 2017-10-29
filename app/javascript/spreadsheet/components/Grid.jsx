import React from 'react';
import Column from './Column';
import CategoryGrid from './CategoryGrid';
import {formatInteger} from './helperFunctions';

export default class Grid extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }

  calculateCategoryCost(category) {
    var items = this.props.items;
    var total = 0;
    if (items[category]) {
      items[category].forEach(function(item) {
        total += item["amount"];
      })
    }
    return formatInteger("JPY", total);
  }

  calculateCategoryQuantity(category) {
    var items = this.props.items;
    var quantity = 0;
    if (items[category]) {
      return items[category].length
    } else {
      return 0;
    }
  }

  filterCategory(name) {
    this.props.onFilterCategory(name);
  }

  showColumns() {
    if (this.props.currentCategory) {
      var indexNumber = this.props.categories.indexOf(this.props.currentCategory);
      return (
        <div>
          <CategoryGrid categories={this.props.categories} onFilterCategory={this.props.onFilterCategory}/>
          <div className="columns">
            <div className="column">
              <Column
                heading={this.props.categories[indexNumber]}
                items={this.props.items}
                name={this.props.name}
                amount={this.props.amount}
                currency={this.props.currency}
                category={this.props.category}
                onEdit={this.props.onEdit}
                onDelete={this.props.onDelete} />
            </div>
          </div>
        </div>
      )
    } else {
      var orderedCategories = this.props.categories;
      return orderedCategories.map(function(category) {
        if (category != "income") {
          return (
            <div className="category-summary" onClick={()=>this.filterCategory(category)}>
              <div className="summary detail name">{category}</div>
              <div className="summary detail">{this.calculateCategoryQuantity(category)}</div>
              <div className="summary detail">{this.calculateCategoryCost(category)}</div>
            </div>
          )
        }
      }.bind(this))
    }
  }

  render() {
    return (
      <div className="border grid">
        { this.showColumns() }
      </div>
    )
  }
}
