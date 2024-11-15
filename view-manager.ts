import TableManager from "./table-manager";

export type View = {
    name: string;
    endpoint: string;
};

const presets: Array<View> = [
    {
        name: 'Complex Select',
        endpoint: 'cselect'
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
        
        this.tMan.ClearTable();
        let options = undefined

        if (view.name == 'test') options = {query: 'SELECT * FROM genres'};
        else if (view.name == 'test2') options = {query: 'SELECT * FROM foo'};

        const data = await this.tMan.GetData(view.endpoint, options);
        console.log(data);
        this.tMan.FillTable(data);

        this.currentView = view;
    }
};

