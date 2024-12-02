import Form from './form.js';
import { view_presets } from './presets.js';
const presets = [...view_presets];
export default class ViewManager {
    constructor(tableManager) {
        this.tMan = tableManager;
        this.LoadPresetViews();
        // Load first preset view to start
        this.OnViewPress(presets[0]);
        this.currentView = presets[0];
    }
    // Hope to be able to store custom views on browser but leave this alone for now
    LoadCustomViews() { }
    // Run on window load
    LoadPresetViews() {
        const listEl = document.getElementById('preset-list');
        presets.forEach((view, i) => {
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
                const data = new FormData(e.target);
                // Remove data that shouldn't be sent
                form.structure.fields.forEach((val) => {
                    var _a, _b;
                    if (!((_a = val.send) !== null && _a !== void 0 ? _a : true) || !((_b = val.visible) !== null && _b !== void 0 ? _b : true))
                        data.delete(val.name);
                });
                this.FillViewTable(view, data);
                e.preventDefault();
                form.DeleteForm();
            });
            return;
        }
        this.FillViewTable(view);
    }
    async FillViewTable(view, options) {
        this.tMan.ClearTable();
        this.currentView = view;
        const tableHeader = document.getElementById('table-header');
        tableHeader.innerText = view.name;
        if (options instanceof FormData)
            options = Object.fromEntries(options);
        const data = await this.tMan.GetData(view.endpoint, options);
        this.tMan.SetColumns(data.columns);
        this.tMan.FillTable(data.data);
    }
}
;
