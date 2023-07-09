// Retrieve expenses from local storage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to save expenses to local storage
function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to render expenses in the table
function renderExpenses() {
  const expenseTable = document.getElementById('expenses-table');
  expenseTable.innerHTML = '';

  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.amount}</td>
      <td>${expense.name}</td>
      <td>${expense.description}</td>
      <td>${expense.category}</td>
      <td>
        <button class="btn btn-primary btn-edit" data-index="${i}">Edit</button>
        <button class="btn btn-danger btn-delete" data-index="${i}">Delete</button>
      </td>
    `;

    expenseTable.appendChild(row);
  }

  // Attach event listeners to edit and delete buttons
  const editButtons = document.getElementsByClassName('btn-edit');
  const deleteButtons = document.getElementsByClassName('btn-delete');

  for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener('click', handleEdit);
    deleteButtons[i].addEventListener('click', handleDelete);
  }
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  const amount = document.getElementById('expense-amount').value;
  const name = document.getElementById('expense-name').value;
  const description = document.getElementById('expense-description').value;
  const category = document.getElementById('expense-category').value;

  const expense = {
    amount,
    name,
    description,
    category
  };
  https://crudcrud.com/api/


  // Save expense to the cloud using POST request
  axios.post('https://crudcrud.com/api/c181d00adee547d1b9a946ebccac23e9/expenses', expense)
    .then(response => {
      console.log(response.data); // Check the response data for confirmation
    })
    .catch(error => {
        document.body.innerHTML +"<h4> something is wrong</h4>"
      console.error(error);
    });

  expenses.push(expense);
  saveExpenses();
  renderExpenses();

  // Clear form inputs
  document.getElementById('expense-amount').value = '';
  document.getElementById('expense-name').value = '';
  document.getElementById('expense-description').value = '';
  document.getElementById('expense-category').value = 'Food';
}

// Function to handle editing an expense
function handleEdit(event) {
  const index = event.target.getAttribute('data-index');
  const expense = expenses[index];

  // Populate form inputs with expense details
  document.getElementById('expense-amount').value = expense.amount;
  document.getElementById('expense-name').value = expense.name;
  document.getElementById('expense-description').value = expense.description;
  document.getElementById('expense-category').value = expense.category;

  // Remove expense from the array and local storage
  expenses.splice(index, 1);
  saveExpenses();
  renderExpenses();
}

// Function to handle deleting an expense
function handleDelete(event) {
  const index = event.target.getAttribute('data-index');

  // Remove expense from the array and local storage
  expenses.splice(index, 1);
  saveExpenses();
  renderExpenses();
}

// Attach event listener to the form submit event
document.getElementById('expense-form').addEventListener('submit', handleSubmit);

// Render expenses on page load
renderExpenses();
