import React from 'react';
import ReactDOM from 'react-dom';
import Spreadsheet from './components/Spreadsheet';
import './styles/spreadsheets.sass'

document.addEventListener('DOMContentLoaded', ()=> {
  if (document.getElementById('root')) {
    const root = document.getElementById('root');
    const loadData = JSON.parse(root.getAttribute('data'));
    ReactDOM.render(<Spreadsheet {...loadData} />, root);
  }
})
