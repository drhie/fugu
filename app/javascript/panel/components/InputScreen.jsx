import React from 'react'


export default class InputScreen extends React.Component {

  componentDidMount() {
    this.exitButton();
  }

  exitButton() {
    const closeButton = document.getElementById('close');
    const modal = document.getElementById('input-modal');
    closeButton.addEventListener('click', (e)=> {
      modal.parentNode.removeChild(modal);
    })
  }

  render() {
    return (
      <div id="input-modal">
        <div id="close">X</div>
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
    )
  }
}
