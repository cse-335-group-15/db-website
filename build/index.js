import ViewManager from './view-manager.js';
import TableManager from './table-manager.js';
const tableManager = new TableManager();
const viewManager = new ViewManager(tableManager);
// TODO:
//  - Need to handle errors with form submission before closing form
//  - Regex on form fields.
