import Form from './form.js';
import { view_presets, op_presets, table_presets } from './presets.js';
export default class ViewManager {
    constructor(tableManager) {
        this.tMan = tableManager;
        this.LoadPresetViews();
        this.LoadTables();
        this.LoadPresetOperations();
        // Load first preset view to start
        this.OnViewPress(view_presets[0]);
        this.currentView = view_presets[0];
    }
    // Hope to be able to store custom views on browser but leave this alone for now
    LoadCustomViews() { }
    // Run on window load. Loads view presets into their folder
    LoadPresetViews() {
        const listEl = document.getElementById('view-preset-list');
        view_presets.forEach((view, i) => {
            const node = document.createElement('li');
            const span = document.createElement('span');
            span.innerText = view.name;
            span.addEventListener('click', this.OnViewPress.bind(this, view));
            node.appendChild(span);
            listEl.appendChild(node);
        });
    }
    // Run on window load. Loads table presets into their folder
    LoadTables() {
        const listEl = document.getElementById('table-list');
        table_presets.forEach((view, i) => {
            const node = document.createElement('li');
            const span = document.createElement('span');
            span.innerText = view.name;
            span.addEventListener('click', this.OnViewPress.bind(this, view));
            node.appendChild(span);
            listEl.appendChild(node);
        });
    }
    // Run on window load. Loads operation presets into their folder
    LoadPresetOperations() {
        const listEl = document.getElementById('ops-preset-list');
        op_presets.forEach((view, i) => {
            const node = document.createElement('li');
            const span = document.createElement('span');
            span.innerText = view.name;
            span.addEventListener('click', this.OnViewPress.bind(this, view));
            node.appendChild(span);
            listEl.appendChild(node);
        });
    }
    // Run when a view is selected
    async OnViewPress(view) {
        var _a;
        if (view == this.currentView && !((_a = this.currentView.reloadable) !== null && _a !== void 0 ? _a : false))
            return;
        if (view.form) {
            const form = view.form ? new Form(view.form) : undefined;
            // Override form submission            
            form === null || form === void 0 ? void 0 : form.formRoot.addEventListener('submit', (e) => {
                e.preventDefault();
                const data = new FormData(e.target);
                // Remove data that shouldn't be sent
                form.structure.fields.forEach((field) => {
                    var _a, _b;
                    if (!((_a = field.send) !== null && _a !== void 0 ? _a : true) || !((_b = field.visible) !== null && _b !== void 0 ? _b : true))
                        data.delete(field.name);
                    if (field.type == 'label')
                        data.delete(field.name);
                });
                this.FillViewTable(view, data);
                form.DeleteForm();
            });
            return;
        }
        this.FillViewTable(view);
    }
    async FillViewTable(view, options) {
        var _a;
        this.tMan.ClearTable();
        this.currentView = view;
        const tableHeader = document.getElementById('table-header');
        const tableDescription = document.getElementById('view-description');
        tableHeader.innerText = view.name;
        tableDescription.innerText = (_a = view.description) !== null && _a !== void 0 ? _a : '';
        if (options instanceof FormData)
            options = Object.fromEntries(options);
        const data = await this.tMan.GetData(view.endpoint, { ...view.options, ...options });
        const queryBox = document.getElementById('query-box');
        queryBox.innerText = data.query;
        this.tMan.SetColumns(data.columns);
        this.tMan.FillTable(data.data);
    }
}
;
