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
    // Hope to be able to store custom views on browser but leave this alone for now
    LoadCustomViews() {}

    // Run on window load
    LoadPresets() {
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
    OnViewPress(view: View) {
        console.log(this);
        console.log(view);
    }
};

