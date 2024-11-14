let button: HTMLButtonElement;
let queryInput: HTMLTextAreaElement;

window.onload = (e) => {    
    button = document.getElementById('submit')! as HTMLButtonElement;
    queryInput = document.getElementById('query')! as HTMLTextAreaElement;

    button.addEventListener('click', async (e): Promise<void> => {
        let body = await sendQuery(queryInput.value) as Array<Array<string>>;
        clearTable('queryResult');
        
        setHeaders('queryResult', 'foo')
        body.forEach((row) => {
            addDataRow('queryResult', ...row);
        });
    });
};

// API stuff
async function sendQuery(query: string): Promise<Object> {
    let url = `https://iu2mua5qjd.execute-api.us-east-1.amazonaws.com/prod/gwdeib01/query`;

    let request = {
        method: 'POST',
        body: JSON.stringify({
            query: query
        })
    };

    let response = await fetch(url, request);
    return await response.json();
}


// Table Managers
async function setHeaders(tableId: string, dbTableName: string): Promise<void> {
    // This query retreives the column names of the table
    let body = await sendQuery(`SELECT column_name FROM information_schema.columns WHERE table_name = \"${dbTableName}\" ORDER BY ordinal_position`) as Array<Array<string>>

    let table = document.getElementById(tableId)! as HTMLTableElement;
    let header = table.createTHead();
    let hRow = header.insertRow();
    
    body.forEach((val: Array<string>, i: number) => {
        let cell = hRow.insertCell();
        cell.outerHTML = `<th>${val[0]}`;
    })
}

// poo
function addDataRow(tableId: string, ...rowData: Array<string>): void {
    let table = document.getElementById(tableId)! as HTMLTableElement;

    let row = table.insertRow(-1);
    for (let i = 0; i < rowData.length; i++) {
        let cell = row.insertCell(i);
        cell.appendChild(document.createTextNode(rowData[i]));
    }
}

function clearTable(tableId: string) { // Expand this later with keeping headers and other options.
    let table = document.getElementById(tableId)! as HTMLTableElement;
    table.innerHTML = "";
}