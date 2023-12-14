document.addEventListener('DOMContentLoaded', onpageLoad);

function onpageLoad(){    
    showExpenseReport();
}

function showExpenseReport(){
    const reportElement = document.getElementById('reportPage');
    if(reportElement){
        fetch('/expense/monthlyReport')
        .then(response => response.json())
        .then(data => {
            reportElement.innerHTML = ''; // Clear existing expenses

            if (data) {                
                data.forEach(expense => {                                    
                    const innerReportElement= document.createElement('div');                
                    innerReportElement.classList.add('reportStyle');
                    innerReportElement.innerHTML = ` <span class='listItem'> Time Period: </span> ${expense._id.month}/${expense._id.year}`  + 
                   `<span class='listItem'>  |  Total Amount: </span> ${expense.totalAmount} `
                    reportElement.appendChild(innerReportElement);                        
                });                
            }
        })
        .catch(error => console.error('Error fetching expenses:', error));
    }
}