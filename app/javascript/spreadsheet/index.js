import React from 'react';
import ReactDOM from 'react-dom';
import Spreadsheet from './components/Spreadsheet';
import './styles/spreadsheets.sass'


document.addEventListener('DOMContentLoaded', ()=> {
  const container = document.body.appendChild(document.createElement('div'));
  // document.getElementById('create-spreadsheet').addEventListener('click', (e)=> {
  //   e.preventDefault();
  //   let data = {
  //     spreadsheet: {
  //       name: "Test",
  //       currency: "JPY"
  //     }
  //   };
  //   $.ajax({
  //     url: '/spreadsheets',
  //     type: "POST",
  //     data: data,
  //     dataType: "JSON"
  //   }).success((data)=>{
  //     console.log("Data!" + data);
  //   })
    ReactDOM.render(<Spreadsheet />, container);
  // })
})
