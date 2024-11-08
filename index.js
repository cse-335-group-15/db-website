let button;
let queryInput;
let table;

window.onload = (e) => {    
    button = document.getElementById('submit');
    queryInput = document.getElementById('query');
    table = document.getElementsByTagName('table')[0]

    button.addEventListener('click', sendQuery);
};

// API stuff
async function sendQuery() {
    query = queryInput.value;
    url = 'https://iu2mua5qjd.execute-api.us-east-1.amazonaws.com/prod/gwdeib01/select';

    request = {
        method: 'POST',
        body: JSON.stringify({
            query: query
        })
    };

    let response = await fetch(url, request);
    let body = await response.json();

    body.forEach((row) => {
        addRow('queryResult', ...row)
    });
}


// Table Managers
function addRow(tableId, ...rowData) {
    let table = document.getElementById(tableId);
    if (table == null) {
        console.error(`Could not find table with id ${tableId}`)
    }

    let row = table.insertRow(-1);
    for (let i = 0; i < rowData.length; i++) {
        let cell = row.insertCell(i)
        cell.appendChild(document.createTextNode(rowData[i]))
    }
}

function clearTable() {}