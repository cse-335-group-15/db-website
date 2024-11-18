let UsedIDs = [];
export default class Form {
    constructor(structure) {
        this.formIDs = [];
        this.structure = structure;
        this.formRoot = document.createElement('form');
        this.GenerateForm();
    }
    GenerateForm() {
        this.formRoot.innerHTML = '';
        const header = document.createElement('h1');
        header.textContent = this.structure.header;
        this.formRoot.appendChild(header);
        this.structure.fields.forEach((field, i) => {
            var _a;
            const id = this.GenerateID();
            const container = document.createElement('p');
            // Create Label
            const label = document.createElement('label');
            label.setAttribute('for', id);
            label.textContent = (_a = field.label) !== null && _a !== void 0 ? _a : field.name;
            container.appendChild(label);
            // Create Field
            const input = document.createElement('input');
            input.setAttribute('type', field.type);
            input.setAttribute('id', id);
            input.setAttribute('name', field.name);
            // Do switch for different types of inputs here
            container.appendChild(input);
            this.formRoot.appendChild(container);
        });
        // Create submit button
        const submit = document.createElement('input');
        submit.setAttribute('type', 'submit');
        submit.textContent = 'Submit';
        this.formRoot.appendChild(submit);
        // Add Form to page
        document.body.appendChild(this.formRoot);
    }
    GenerateID() {
        let id;
        do {
            id = Date.now().toString(36) + Math.random().toString(36).substring(2);
        } while (id in UsedIDs);
        UsedIDs.push(id);
        this.formIDs.push(id);
        return id;
    }
    DeleteForm() {
        UsedIDs = UsedIDs.filter((val) => { return !(val in this.formIDs); });
        this.formRoot.remove();
    }
}
