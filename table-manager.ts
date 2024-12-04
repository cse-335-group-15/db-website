type sqlData = number | string | null;
type sqlRow = Array<sqlData>;
type sqlTable = Array<sqlRow>;
type sqlColumnData = Array<number | string | boolean | null>;
type apiResponse = {
    columns: Array<sqlColumnData>;
    data: sqlTable;
    query: string
}

const url = 'https://iu2mua5qjd.execute-api.us-east-1.amazonaws.com/prod/gwdeib01';


export default class TableManager {
    currentCols: Array<string> = [];
    currentTableData: sqlTable = [];

    // Need to implement query by scroll as putting 2000+ rows of data into an HTML table is not ideal
    // Just need to load data into the table as needed instead of all at once.


    // Options are sent in the body of the request. Leaving it empty sends just a POST request to the endpoint.
    async GetData(endpoint: string, options?: object): Promise<apiResponse> {
        let request = {
            method: 'POST',
            body: JSON.stringify(options ?? {})
        };

        let response = await fetch(`${url}/${endpoint}`, request);

        return response.json() as Promise<apiResponse>;
    }

    SetColumns(columns: Array<sqlColumnData>) {
        const table = document.getElementById('result') as HTMLTableElement;
        const thead = table.getElementsByTagName('thead')[0] as HTMLTableSectionElement;

        thead.innerHTML = "";

        const rowEl = thead.insertRow();
        columns.forEach((data: sqlColumnData, i: number) => {
            let cell = rowEl.insertCell(i);
            let nameExp = /(?:[\w\d]+_?)+/;

            let name = data[0];
            if (typeof name == 'string' && nameExp.test(name)) {
                let tokens = name.split('_');
                name = '';
                tokens.forEach((token) => {
                    name += token[0].toUpperCase() + token.slice(1) + ' ';
                })
            }

            cell.outerHTML = `<th>${name ? name.toString() : ''}`;
        });
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
        const tbody = table.getElementsByTagName('tbody')[0] as HTMLTableSectionElement; 

        const rowEl = tbody.insertRow(location);
        row.forEach((data: sqlData, i: number) => {
            let cell = rowEl.insertCell(i);
            cell.innerText = data ? data.toString() : '';
        });
    }

    ClearTable() {
        const table = document.getElementById('result') as HTMLTableElement;
        const tbody = table.getElementsByTagName('tbody')[0] as HTMLTableSectionElement;
        const thead = table.getElementsByTagName('thead')[0] as HTMLTableSectionElement;

        tbody.innerHTML = '';
        thead.innerHTML = '';
    }
};