import React from 'react'


export default class InputScreen extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    this.props.revealInput ? this.submitButton() : window.removeEventListener('click', document.getElementById('submit-button'));
  }

  submitButton() {
    const modal = document.getElementById('input-modal');
    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', (e)=> {
      e.preventDefault();
      let data = {
        item: {
          name: document.getElementById("name").value,
          amount: document.getElementById("amount").value,
          item_type: document.getElementById("category").value,
          is_expense: true,
        }
      };
      $.ajax({
        url: '/items',
        type: 'POST',
        dataType: 'json',
        data: data
      }).success(()=>{console.log("sent!")});
      this.props.submitData();
    })
  }

  render() {
    var nameForm = <div>
      <label>Name:</label>
      <input type="text" name="name" id="name"></input><br/>
    </div>

    var amountForm = <div>
      <label>Amount:</label>
      <input type="text" name="amount" id="amount"></input><br/>
    </div>

    var categoryForm = <div>
      <label>Category:</label>
      <select name="category" id="category">
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
          <form>
            { formElements }
            <input type="submit" id="submit-button"></input>
          </form>
        </div>
      );
    } else {
      return null;
    }
  }
}
