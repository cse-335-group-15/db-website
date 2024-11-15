const presets = [
    {
        name: 'Complex Select',
        endpoint: 'cselect'
    }
];
export default class ViewManager {
    // Hope to be able to store custom views on browser but leave this alone for now
    LoadCustomViews() { }
    // Run on window load
    LoadPresets() {
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
    OnViewPress(view) {
        console.log(this);
        console.log(view);
    }
}
;
