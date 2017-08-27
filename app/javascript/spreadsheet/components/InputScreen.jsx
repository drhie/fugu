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
      this.props.toggleInput();
    })
  }

  render() {
    if (this.props.revealInput) {
      return (
        <div id="input-modal">
          <div id="close" onClick={()=>this.props.toggleInput()}>X</div>
          <h2>Add {this.props.title}</h2>
          <form>
            <label>Name:</label>
            <input type="text" name="name"></input>
            <label>Amount:</label>
            <input type="text" name="amount"></input>
            <label>Category:</label>
            <input type="text" name="category"></input>
            <input type="submit" id="submit-button"></input>
          </form>
        </div>
      );
    } else {
      return null;
    }
  }
}
