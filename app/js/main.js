"use strict";
 
 //showing error massage function
function errorMsgShow (errorIdLastPart, message) {
  const element = document.getElementById('error-msg-' + errorIdLastPart);
  const errorMsg = [];
  errorMsg.push(message);

  element.style.display = 'block';
  element.innerText = errorMsg.join(', ');
}
// hiding error massage function 
function errorMsgHide (errorIdLastPart) {
  const element = document.getElementById('error-msg-' + errorIdLastPart);
  element.style.display = 'none';
}

// function getInputValue (fieldId) {
//   const inputTag = document.getElementById(fieldId);
//   const valueInText = inputTag.value;
//   const value = parseFloat(valueInText);
//   return value;
// }
function getInputValueWithErrorHandel (fieldId, errorIdLastPart) {
  const inputTag = document.getElementById(fieldId);
  const valueInText = inputTag.value;
  const value = parseFloat(valueInText);
  if (isNaN(value)) {
    const message = 'Please give number as input';
    errorMsgShow (errorIdLastPart, message);
  }
  if (valueInText == '') {
    const message = "Input can't be blank"
    errorMsgShow (errorIdLastPart, message);
  }
  else if (value < 0) {
    const message = "Please input positive number"
    errorMsgShow (errorIdLastPart, message);
  }
  else {
    errorMsgHide(errorIdLastPart);
    return value;
  }
}

// calculation for expenses and current balance
function getExpensesAndBalance () {
  const income = getInputValueWithErrorHandel ('income-input', 'income');
  // console.log(income);
  const foodCost = getInputValueWithErrorHandel ('food-cost', 'food');
  const rentCost = getInputValueWithErrorHandel ('rent-cost', 'rent');
  const clothesCost = getInputValueWithErrorHandel ('clothes-cost', 'clothes');

  if (income == undefined || foodCost == undefined || rentCost == undefined || clothesCost == undefined) {
  return;
  }
  else {
    const totalExpenses = foodCost + rentCost + clothesCost;
    const balance = income - totalExpenses;
    return [totalExpenses, balance];
  }
}
// event listener
const calculateBtn = document.querySelector('#calculate-btn');

calculateBtn.addEventListener('click', () => {
  const income = getInputValueWithErrorHandel ('income-input', 'income');
  const balanceAndExpenses = getExpensesAndBalance ();
  const ExpensesDisplay = document.getElementById('total-expenses');
  const balanceDisplay = document.getElementById('balance');

  const Expense = balanceAndExpenses[0];
  const currentBalance = balanceAndExpenses[1];

  if (Expense > income) {
    errorMsgShow('expenses', "You don't have money");
  }
  else {
    ExpensesDisplay.innerText = Expense;
    balanceDisplay.innerText = currentBalance;
    errorMsgHide('expenses');
  }
})

// saving functionality
const saveBtn = document.getElementById('save-btn');
function savingAmount () {
  const income = getInputValueWithErrorHandel('income-input', 'income');
  const balanceAndExpenses = getExpensesAndBalance ();
  const currentBalance = balanceAndExpenses[1];
  const savingPresents = getInputValueWithErrorHandel('saving-input', 'saving');
  const savings = (savingPresents/100)*income;

  if (savings > currentBalance) {
    errorMsgShow('saving', `You spent more then ${100-savingPresents}% of your income`)
  }
  else {
    errorMsgHide('saving');
    return [savings, currentBalance];
  }
}

saveBtn.addEventListener ('click', () => {
  const saveAmountAndCurrentBalance = savingAmount ();
  for (const item of saveAmountAndCurrentBalance) {
    if (item != undefined) {
      const saving = saveAmountAndCurrentBalance[0];
      const currentBalance = saveAmountAndCurrentBalance[1];
      const remainBalance = currentBalance - saving;

      const savedAmountDisplay = document.getElementById('saved-amount');
      const RemainingBalanceDisplay = document.getElementById('last-balance');

      savedAmountDisplay.innerText = saving;
      RemainingBalanceDisplay.innerText = remainBalance;
    }
    else {
      return;
    }
  }
});