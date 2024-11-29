import TableManager from "./table-manager.js";
import Form from './form.js';
import {FormStructure} from "./form.js";

export type View = {
    name: string;
    endpoint: string;
    reloadable?: boolean;
    form?: FormStructure
};

// Radio buttons are not supported, use select instead.
const presets: Array<View> = [
    {
        name: 'full table',
        endpoint: 'select'
    },
    {
        name: 'Complex Select',
        endpoint: 'cselect'
    },
    {
        name: "Find Duos",
        endpoint: 'find_duos'
    },
    {
        name: 'Custom Query',
        endpoint: 'query',
        reloadable: true,
        form: {
            header: 'Custom Query',
            fields : [
                {
                    name: 'query',
                    type: 'text',
                    label: 'Query:'
                }
            ]
        }
    }
]

export default class ViewManager {
    currentView: View;
    tMan: TableManager;

    constructor(tableManager: TableManager) {
        this.tMan = tableManager;


        this.LoadPresetViews();
        
        // Load first preset view to start
        this.OnViewPress(presets[0]);
        this.currentView = presets[0];
    }

    // Hope to be able to store custom views on browser but leave this alone for now
    LoadCustomViews() {}

    // Run on window load
    LoadPresetViews() {
        const listEl: HTMLUListElement = document.getElementById('preset-list')! as HTMLUListElement;

        presets.forEach((view: View, i: Number) => {
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

