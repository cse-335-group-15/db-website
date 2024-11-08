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
    query = queryInput.value
    url = 'https://iu2mua5qjd.execute-api.us-east-1.amazonaws.com/prod/gwdeib01/select'

    request = {
        method: 'POST',
        body: JSON.stringify({
            query: query
        })
    }

    let response = await fetch(url, request)
    console.log(response);
}


// Table Managers
function addRow() {}
function clearTable() {}