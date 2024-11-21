const url = 'https://iu2mua5qjd.execute-api.us-east-1.amazonaws.com/prod/gwdeib01';
export default class TableManager {
    constructor() {
        this.currentCols = [];
        this.currentTableData = [];
    }
    // Need to implement query by scroll as putting 2000+ rows of data into an HTML table is not ideal
    // Just need to load data into the table as needed instead of all at once.
    // Options are sent in the body of the request. Leaving it empty sends just a POST request to the endpoint.
    async GetData(endpoint, options) {
        let request = {
            method: 'POST',
            body: JSON.stringify(options)
        };
        let response = await fetch(`${url}/${endpoint}`, request);
        return response.json();
    }
    FillTable(data) {
        const table = document.getElementById('result');
        data.forEach((row, i) => {
            this.AddRow(row, i, table);
        });
        this.currentTableData = data;
    }
    AddRow(row, location, table) {
        if (!table)
            table = document.getElementById('result');
        let rowEl = table.insertRow(location);
        row.forEach((data, i) => {
            let cell = rowEl.insertCell(i);
            cell.innerText = data ? data.toString() : '';
        });
    }
    ClearTable() {
        const table = document.getElementById('result');
        const tbody = table.getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';
    }
}
;
