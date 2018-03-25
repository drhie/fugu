import React from 'react'


export default class InputScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    // this.props.revealInput ? this.submitButton() : window.removeEventListener('click', document.getElementById('submit-button'));
  }

  handleChange(e) {
    this.props.onInputChange(e.target.name, e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onInputSubmit(e);
    this.props.closeOnSubmit();
  }

  showHeading() {
    var title = this.props.title
    title = title[0].toUpperCase() + title.slice(1).toLowerCase()
    return this.props.item ? "Edit " + title : "Add " + title;
  }

  render() {
    var name = this.props.name;
    var amount = this.props.amount;
    var category = this.props.category;
    var transactionDate = this.props.transactionDate;

    var nameForm = <div className="name-form" id={this.props.title === "category" ? "category" : null}>
      <label>Name</label>
      <input type="text"
        placeholder={this.props.title === "income" ? "e.g., David" : this.props.title === "expense" ? "e.g., Tully's Coffee" : "e.g., Groceries" }
        id="name"
        name="name"
        value={name}
        onChange={this.handleChange} />
    </div>

    var amountForm = <div className="amount-form">
      <label>Amount</label>
      <input type="text"
        placeholder="e.g., 2000"
        name="amount"
        id="amount"
        value={amount}
        onChange={this.handleChange} />
    </div>

    var dateForm = <div className="date-form">
      <label>Date</label>
      <input type="date"
        name="transaction_date"
        id="transaction_date"
        value={transactionDate}
        onChange={this.handleChange} />
    </div>

    var categoryForm = <div className="category-form">
      <label>Category</label>
      { this.props.categories.map((e)=> {
        if (e != "income") {
          return <div className="category-label" id={e === category ? "active" : null}>
            <label>
              <input type="radio" name="category" value={e} onChange={this.handleChange} checked={e === category} />
              {e[0].toUpperCase() + e.slice(1).toLowerCase()}
            </label>
          </div>
        }
      }) }
    </div>

    var formElements;

    if (this.props.title === "expense") {
      formElements = <div>
        <div className="form-top-half">{nameForm}</div>
        <div className="form-bottom-half">{amountForm}{dateForm}{categoryForm}</div>
      </div>
    } else if (this.props.title === "income") {
      formElements = <div>
        <div className="form-top-half">{nameForm}</div>
        <div className="form-bottom-half">
          {amountForm}{dateForm}
        </div>
      </div>
    } else {
      formElements = <div>{nameForm}</div>
    }
    if (this.props.revealInput) {
      return (
        <div id="input-modal">
          <h2>{this.showHeading()}</h2>
          <form onSubmit={this.handleSubmit} id={this.props.title}>
            { formElements }
            <input type="submit" id="submit-button" className="btn btn-default" value="Submit" />
          </form>
        </div>
      );
    } else {
      return null;
    }
  }
}
