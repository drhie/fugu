import InputScreen from './components/InputScreen';
import React from 'react';
import ReactDOM from 'react-dom';

const panel = {
  initialize() {
    const addIncome = document.getElementById('add-income');
    const addExpense = document.getElementById('add-expense');
    const addCategory = document.getElementById('add-category');
    const root = document.getElementById('root');

    addIncome.addEventListener('click', (e) => {
      e.preventDefault();
      ReactDOM.render(
        <InputScreen title="Income"/>, root
      );
    });

    addExpense.addEventListener('click', (e) => {
      e.preventDefault();
      ReactDOM.render(
        <InputScreen title="Expense"/>, root
      );
    });

    addCategory.addEventListener('click', (e) => {
      e.preventDefault();
      ReactDOM.render(
        <InputScreen title="Category"/>, root
      );
    });
  }

}

export default panel
