function onpageLoad(){    
    const addExpenseForm = document.getElementById('addExpenseForm');
    if(addExpenseForm){
        addExpense();
    }else{
        fetchExpenses(); // Initial fetch when the page loads
    }    
}

document.addEventListener('DOMContentLoaded', onpageLoad);

function addExpense(){
    const addExpenseForm = document.getElementById('addExpenseForm');
    addExpenseForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const titleInput = document.getElementById('title');
        const amountInput = document.getElementById('amount');

        const title = titleInput.value;
        const amount = Number(amountInput.value);

        fetch('/expense/add-Expense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, amount }),
        })
        .then(response => {
            if (response.ok) {
                titleInput.value = '';
                amountInput.value = '';
                const msg = document.getElementById('message');
                msg.textContent = 'expense is successfully added'
                
            } else {
                console.error('Error adding Expense');
            }
        })
        .catch(error => console.error('Error adding expense:', error));
    });
}

function fetchExpenses() {
    const expenseListSection = document.getElementById('ExpenseList');
    if(expenseListSection){
        fetch('/expense')
        .then(response => response.json())
        .then(data => {
            expenseListSection.innerHTML = ''; // Clear existing expenses

            if (data) {
                let expenseTotal = 0.0;
                data.forEach(expense => {                        
                    expenseTotal = expenseTotal + Number(`${expense.amount}`);                    
                    const expenseElement = document.createElement('div');
                    expenseElement.setAttribute("id", `${expense._id}`);
                    expenseElement.classList.add('expense');
                    expenseElement.innerHTML = ` <span class='listItem'> Expense name: </span> ${expense.title} ` +
                    `<span class='listItem'> Expense Amount: </span> $${expense.amount} `+
                    `<span class='updateStyle'>  <a href='javascript:void(0)' onclick="updateExpense(\'${expense._id}\',\'${expense.title}\',\'${expense.amount}\');return false;">Update</a> </span> |` +
                    `<span class='deleteStyle'>  <a href='javascript:void(0)' onclick="deleteExpense(\'${expense._id}\');return false;">Delete</a> </span> `;
                    //expenseElement.textContent = ` Expense name: ${expense.title} | Amount: ${expense.amount} | Date: ${expense.date}`;
                    expenseListSection.appendChild(expenseElement);                        
                });
                const TotalElement = document.createElement('div');
                TotalElement.innerHTML = `<span> Total Amount: $${expenseTotal} </span>`
                expenseListSection.appendChild(TotalElement);                        
            }
        })
        .catch(error => console.error('Error fetching expenses:', error));
    }
}

function deleteExpense(id){
    const expenseListSection = document.getElementById('ExpenseList');
    if(expenseListSection){
        const url = '/expense/delete/'+id;
        const deleteMethod = {
            method: 'DELETE'
        }
        fetch(url, deleteMethod)
            .then(response => response.json())
            .then(data => {                            
                if (data) {
                    window.location.reload();
                }
            })
            .catch(error => console.error('Error fetching expenses:', error));
    }        
}

function updateExpense(id, title, amount){    
    const url ='../expense/update?title='+title+'&id='+id+"&amount="+amount;
    window.location.href = url;
}

function updateExpenseData(){
    const id = document.getElementById('id').value;
    const title = document.getElementById('title').value;
    const amount = document.getElementById('amount').value;

    const url = '/expense/update-expense';
    const putMethod = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, title, amount })
    }    
    fetch(url, putMethod)
        .then(response => response.json())
        .then(data => {                            
            if (data) {
                window.location.href = '../expense/list';
            }
        })
        .catch(error => console.error('Error fetching expenses:', error)); 
}

function parseURL(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const title = urlParams.get('title');    
    const titleElement = document.getElementById("title");
    titleElement.value = title;

    const amount = urlParams.get('amount');    
    const amountElement = document.getElementById("amount");
    amountElement.value = amount;

    const id = urlParams.get('id');    
    const idElement = document.getElementById("id");
    idElement.value = id;    
}

function redirectToList(){
    window.location.href = '../expense/list';
}


