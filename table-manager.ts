type sqlData = number | string | null;
type sqlRow = Array<sqlData>;
type sqlTable = Array<sqlRow>;

const url = 'https://iu2mua5qjd.execute-api.us-east-1.amazonaws.com/prod/gwdeib01';


export default class TableManager {
    currentCols: Array<string> = [];
    currentTableData: sqlTable = [];

    // Need to implement query by scroll as putting 2000+ rows of data into an HTML table is not ideal
    // Just need to load data into the table as needed instead of all at once.


    // Options are sent in the body of the request. Leaving it empty sends just a POST request to the endpoint.
    async GetData(endpoint: string, options?: object): Promise<sqlTable> {
        let request = {
            method: 'POST',
            body: JSON.stringify(options)
        };

        let response = await fetch(`${url}/${endpoint}`, request);

        return response.json() as Promise<sqlTable>;
    }
    
    FillTable(data: sqlTable) {
        const table = document.getElementById('result') as HTMLTableElement;
        
        data.forEach((row: sqlRow, i: number) => {
            this.AddRow(row, i, table);
        });

        this.currentTableData = data;
    }

    AddRow(row: sqlRow, location: number, table?: HTMLTableElement) {
        if (!table) table = document.getElementById('result') as HTMLTableElement;

        let rowEl = table.insertRow(location);
        row.forEach((data: sqlData, i: number) => {
            let cell = rowEl.insertCell(i);
            cell.innerText = data ? data.toString() : '';
        });
    }

    ClearTable() {
        const table = document.getElementById('result') as HTMLTableElement;
        const tbody = table.getElementsByTagName('tbody')[0] as HTMLTableSectionElement;

        tbody.innerHTML = '';
    }
};