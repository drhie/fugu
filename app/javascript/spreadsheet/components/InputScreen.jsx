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
    return this.props.item ? "Edit " + this.props.title : "Add " + this.props.title;
  }

  render() {
    var name = this.props.name;
    var amount = this.props.amount;
    var category = this.props.category;

    var nameForm = <div className="name-form" id={this.props.title === "Category" ? "category" : null}>
      <label>Name:</label>
      <input type="text"
        id="name"
        name="name"
        value={name}
        onChange={this.handleChange} />
    </div>

    var amountForm = <div className="amount-form">
      <label>Amount:</label>
      <input type="text"
        name="amount"
        id="amount"
        value={amount}
        onChange={this.handleChange} />
    </div>

    var categoryForm = <div className="category-form">
      <label>Category:</label>
      { this.props.categories.map((e)=> {
        return <div>
          <label>
            <input type="radio" name="category" value={e} onChange={this.handleChange} checked={e === category} />
            {e}
          </label>
        </div>
      }) }
    </div>

    var formElements;

    if (this.props.title === "Expense") {
      formElements = <div><div className="form-top-half">{nameForm}{amountForm}</div>{categoryForm}</div>
    } else if (this.props.title === "Income") {
      formElements = <div className="form-top-half">{nameForm}{amountForm}</div>
    } else {
      formElements = <div>{nameForm}</div>
    }
    if (this.props.revealInput) {
      return (
        <div id="input-modal">
          <h2>{this.showHeading()}</h2>
          <form onSubmit={this.handleSubmit} id={this.props.title.toLowerCase()}>
            { formElements }
            <input type="submit" id="submit-button" value="Submit" />
          </form>
        </div>
      );
    } else {
      return null;
    }
  }
}
