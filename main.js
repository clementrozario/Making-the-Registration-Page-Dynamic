// Declare expenseId variable
let expenseId = null;

// Function to render expenses in the table
function renderExpenses(expenses) {
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
        <button class="btn btn-danger btn-delete" data-id="${expense._id}">Delete</button>
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

  if (expenseId) {
    // If an expenseId is set, it means we are editing an existing expense
    axios
      .put(
        `https://crudcrud.com/api/c181d00adee547d1b9a946ebccac23e9/expenses/${expenseId}`,
        expense
      )
      .then(response => {
        console.log(response.data); // Check the response data for confirmation
        expenseId = null; // Reset the expenseId after successful edit
        fetchExpenses(); // Fetch the updated expenses after successful edit
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    // If expenseId is not set, it means we are creating a new expense
    axios
      .post(
        'https://crudcrud.com/api/c181d00adee547d1b9a946ebccac23e9/expenses',
        expense
      )
      .then(response => {
        console.log(response.data); // Check the response data for confirmation
        fetchExpenses(); // Fetch the updated expenses after successful POST
      })
      .catch(error => {
        console.error(error);
      });
  }

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

  // Set the expenseId to the selected expense's _id
  expenseId = expense._id;
}

// Function to handle deleting an expense
function handleDelete(event) {
  const id = event.target.getAttribute('data-id');

  // Delete expense from the cloud using DELETE request
  axios
    .delete(`https://crudcrud.com/api/c181d00adee547d1b9a946ebccac23e9/expenses/${id}`)
    .then(response => {
      console.log(response.data); // Check the response data for confirmation
      fetchExpenses(); // Fetch the updated expenses after successful DELETE
    })
    .catch(error => {
      console.error(error);
    });
}

// Function to fetch expenses from the cloud
function fetchExpenses() {
  axios
    .get('https://crudcrud.com/api/c181d00adee547d1b9a946ebccac23e9/expenses')
    .then(response => {
      const expenses = response.data;
      renderExpenses(expenses);
    })
    .catch(error => {
      console.error(error);
    });
}

// Fetch expenses from the cloud when the DOM has loaded
document.addEventListener('DOMContentLoaded', fetchExpenses);

// Attach event listener to the form submit event
document.getElementById('expense-form').addEventListener('submit', handleSubmit);
