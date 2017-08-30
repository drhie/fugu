import React from 'react';
import ReactDOM from 'react-dom';
import Spreadsheet from './components/Spreadsheet';
import './styles/spreadsheets.sass'


document.addEventListener('DOMContentLoaded', ()=> {
  const container = document.body.appendChild(document.createElement('div'));
  const root = document.getElementById('root');
  const loadData = JSON.parse(root.getAttribute('data'));
  document.getElementById('create-spreadsheet').addEventListener('click', (e)=> {
    e.preventDefault();
    let data = {
      spreadsheet: {
        name: "Test",
        currency: "JPY"
      }
    };
    $.ajax({
      url: '/spreadsheets',
      type: "POST",
      data: data,
      dataType: "JSON"
    }).success(function(data) {
      console.log("Data!" + data);
      debugger;
    })
    ReactDOM.render(<Spreadsheet {...loadData} />, root);
  })
})
