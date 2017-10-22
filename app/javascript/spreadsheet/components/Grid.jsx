import React from 'react'
import Column from './Column'
import CategoryGrid from './CategoryGrid'

export default class Grid extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }

  showColumns() {
    if (this.props.currentCategory) {
      var indexNumber = this.props.categories.indexOf(this.props.currentCategory);
      return <div className="column">
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
    } else {
      return this.props.categories.map(function(category) {
        if (category != "income") {
          return <div className="column">
            <Column
              heading={category}
              items={this.props.items}
              name={this.props.name}
              amount={this.props.amount}
              currency={this.props.currency}
              category={this.props.category}
              onEdit={this.props.onEdit}
              onDelete={this.props.onDelete} />
          </div>
        }
      }.bind(this))
    }
  }

  render() {
    return (
      <div className="border grid">
        <CategoryGrid categories={this.props.categories} onFilterCategory={this.props.onFilterCategory}/>
        <div className="columns">
          { this.showColumns() }
        </div>
      </div>
    )
  }
}
