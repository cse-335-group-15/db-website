import ViewManager from './view-manager.js';
import TableManager from './table-manager.js';


const tableManager: TableManager = new TableManager();
const viewManager: ViewManager = new ViewManager(tableManager);


// TODO:
//  - Need to handle errors with form submission before closing form
//  - Need to figure out system to figure out the column headers
//  - Need to add more presets
//  - Need to make the table load only a small portion of the data at once so it doesn't load 2000 entries at once.
//  - Stylesheet (not a priority)