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
          is_expense: false,
        }
      };
      $.ajax({
        url: '/items',
        type: 'POST',
        dataType: 'json',
        data: data
      }).success(()=>{console.log("sent!")});
      this.props.toggleInput();
    })
  }

  render() {
    if (this.props.revealInput) {
      return (
        <div id="input-modal">
          <div id="close" onClick={()=>this.props.toggleInput()}>X</div>
          <h2>Add</h2>
          <form>
            <label>Name:</label>
            <input type="text" name="name" id="name"></input>
            <label>Amount:</label>
            <input type="text" name="amount" id="amount"></input>
            <label>Category:</label>
            <input type="text" name="category" id="category"></input>
            <input type="submit" id="submit-button"></input>
          </form>
        </div>
      );
    } else {
      return null;
    }
  }
}
