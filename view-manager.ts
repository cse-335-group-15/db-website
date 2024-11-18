import TableManager from "./table-manager.js";
import Form from './form.js';
import {FormStructure} from "./form.js";

export type View = {
    name: string;
    endpoint: string;
    form?: FormStructure
};

const presets: Array<View> = [
    {
        name: 'Complex Select',
        endpoint: 'cselect'
    },
    {
        name: 'Custom Query',
        endpoint: 'query',
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
    // TODO: Implement form to gather options
    async OnViewPress(view: View) {
        if (view == this.currentView) return;
        
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

        if (options instanceof FormData) options = Object.fromEntries(options);

        const data = await this.tMan.GetData(view.endpoint, options);
        this.tMan.FillTable(data);
        this.currentView = view;
    }
};

