import React from 'react';
import ReactDOM from 'react-dom';
import Spreadsheet from './components/Spreadsheet';
import './styles/spreadsheets.sass'


document.addEventListener('DOMContentLoaded', ()=> {
  const container = document.body.appendChild(document.createElement('div'));
  ReactDOM.render(<Spreadsheet />, container)
})