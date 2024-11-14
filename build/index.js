"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let button;
let queryInput;
window.onload = (e) => {
    button = document.getElementById('submit');
    queryInput = document.getElementById('query');
    button.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
        let body = yield sendQuery(queryInput.value);
        clearTable('queryResult');
        setHeaders('queryResult', 'foo');
        body.forEach((row) => {
            addDataRow('queryResult', ...row);
        });
    }));
};
// API stuff
function sendQuery(query) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = `https://iu2mua5qjd.execute-api.us-east-1.amazonaws.com/prod/gwdeib01/query`;
        let request = {
            method: 'POST',
            body: JSON.stringify({
                query: query
            })
        };
        let response = yield fetch(url, request);
        return yield response.json();
    });
}
// Table Managers
function setHeaders(tableId, dbTableName) {
    return __awaiter(this, void 0, void 0, function* () {
        // This query retreives the column names of the table
        let body = yield sendQuery(`SELECT column_name FROM information_schema.columns WHERE table_name = \"${dbTableName}\" ORDER BY ordinal_position`);
        let table = document.getElementById(tableId);
        let header = table.createTHead();
        let hRow = header.insertRow();
        body.forEach((val, i) => {
            let cell = hRow.insertCell();
            cell.outerHTML = `<th>${val[0]}`;
        });
    });
}
// poo
function addDataRow(tableId, ...rowData) {
    let table = document.getElementById(tableId);
    let row = table.insertRow(-1);
    for (let i = 0; i < rowData.length; i++) {
        let cell = row.insertCell(i);
        cell.appendChild(document.createTextNode(rowData[i]));
    }
}
function clearTable(tableId) {
    let table = document.getElementById(tableId);
    table.innerHTML = "";
}
