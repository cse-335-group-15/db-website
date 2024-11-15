var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const presets = [
    {
        name: 'Complex Select',
        endpoint: 'cselect'
    }
];
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
    // TODO: Implement form to gather options
    OnViewPress(view) {
        return __awaiter(this, void 0, void 0, function* () {
            if (view == this.currentView)
                return;
            this.tMan.ClearTable();
            let options = undefined;
            if (view.name == 'test')
                options = { query: 'SELECT * FROM genres' };
            else if (view.name == 'test2')
                options = { query: 'SELECT * FROM foo' };
            const data = yield this.tMan.GetData(view.endpoint, options);
            console.log(data);
            this.tMan.FillTable(data);
            this.currentView = view;
        });
    }
}
;
