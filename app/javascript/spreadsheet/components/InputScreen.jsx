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

  render() {
    const name = this.props.name;
    var nameForm = <div>
      <label>Name:</label>
      <input type="text"
        name="name"
        id="name"
        onChange={this.handleChange} /><br/>
    </div>

    var amountForm = <div>
      <label>Amount:</label>
      <input type="text"
        name="amount"
        id="amount"
        onChange={this.handleChange} /><br/>
    </div>

    var categoryForm = <div>
      <label>Category:</label>
      <select name="category" id="category" onChange={this.handleChange}>
        { this.props.categories.map((e)=> {
          return <option value={e}>{e}</option>
        }) }
      </select><br/>
    </div>

    var formElements;

    if (this.props.title === "Expense") {
      formElements = <div>{nameForm}{amountForm}{categoryForm}</div>
    } else if (this.props.title === "Income") {
      formElements = <div>{nameForm}{amountForm}</div>
    } else {
      formElements = <div>{nameForm}</div>
    }
    if (this.props.revealInput) {
      return (
        <div id="input-modal">
          <h2>Add {this.props.title}</h2>
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
