import TableManager from "./table-manager.js";
import Form from './form.js';
import {FormStructure} from './form.js';
import {view_presets, op_presets} from './presets.js';

export type View = {
    name: string;
    endpoint: string;
    reloadable?: boolean;
    form?: FormStructure
};

export default class ViewManager {
    currentView: View;
    tMan: TableManager;

    constructor(tableManager: TableManager) {
        this.tMan = tableManager;


        this.LoadPresetViews();
        this.LoadPresetOperations();
        
        // Load first preset view to start
        this.OnViewPress(view_presets[0]);
        this.currentView = view_presets[0];
    }

    // Hope to be able to store custom views on browser but leave this alone for now
    LoadCustomViews() {}

    // Run on window load. Loads view presets into their folder
    LoadPresetViews() {
        const listEl: HTMLUListElement = document.getElementById('view-preset-list')! as HTMLUListElement;

        view_presets.forEach((view: View, i: Number) => {
            const node: HTMLLIElement = document.createElement('li');
            const span: HTMLSpanElement = document.createElement('span');
            
            span.innerText = view.name;
            span.addEventListener('click', this.OnViewPress.bind(this, view));

            node.appendChild(span);
            listEl.appendChild(node);
        });
    }

    // Run on window load. Loads operation presets into their folder
    LoadPresetOperations() {
        const listEl: HTMLUListElement = document.getElementById('ops-preset-list')! as HTMLUListElement;

        op_presets.forEach((view: View, i: Number) => {
            const node: HTMLLIElement = document.createElement('li');
            const span: HTMLSpanElement = document.createElement('span');
            
            span.innerText = view.name;
            span.addEventListener('click', this.OnViewPress.bind(this, view));

            node.appendChild(span);
            listEl.appendChild(node);
        });
    }

    

    // Run when a view is selected
    async OnViewPress(view: View) {
        if (view == this.currentView && !(this.currentView.reloadable ?? false)) return;
        
        if (view.form) {
            const form = view.form ? new Form(view.form) : undefined;
            
            // Override form submission            
            form?.formRoot.addEventListener('submit', (e) => {
                const data = new FormData(e.target! as HTMLFormElement);

                // Remove data that shouldn't be sent
                form.structure.fields.forEach((val) => {
                    if (!(val.send ?? true) || !(val.visible ?? true)) data.delete(val.name);
                });

                
                this.FillViewTable(view, data);
                e.preventDefault();
                form.DeleteForm();
            });

            return;
        }

        this.FillViewTable(view);    
    }

    async FillViewTable(view: View, options?: object | FormData ) {
        this.tMan.ClearTable();
        this.currentView = view;

        const tableHeader = document.getElementById('table-header') as HTMLSpanElement;
        tableHeader.innerText = view.name

        if (options instanceof FormData) options = Object.fromEntries(options);

        const data = await this.tMan.GetData(view.endpoint, options);
        this.tMan.SetColumns(data.columns);  
        this.tMan.FillTable(data.data);
    }
};

