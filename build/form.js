export default class Form {
    constructor(structure) {
        this.formIds = new Map;
        this.visible_conditions = new Map;
        this.structure = structure;
        this.pageBlocker = document.createElement('div');
        this.pageBlocker.setAttribute('class', 'page-block');
        this.formRoot = document.createElement('div');
        this.formRoot.setAttribute('class', 'modal');
        this.pageBlocker.appendChild(this.formRoot);
        this.form = document.createElement('form');
        this.formRoot.appendChild(this.form);
        this.GenerateForm();
    }
    GenerateForm() {
        this.form.innerHTML = '';
        const header = document.createElement('h1');
        header.textContent = this.structure.header;
        this.form.appendChild(header);
        this.structure.fields.forEach((field, i) => {
            var _a, _b, _c, _d, _e;
            const id = this.GenerateID(field.name);
            const container = document.createElement('p');
            // Create Label
            const label = document.createElement('label');
            label.setAttribute('for', id);
            label.textContent = (_a = field.label) !== null && _a !== void 0 ? _a : field.name;
            container.appendChild(label);
            // Create Field
            if (field.type == 'label') {
                const label = document.createElement('p');
                label.innerText = (_b = field.label) !== null && _b !== void 0 ? _b : '';
                this.form.appendChild(label);
                return;
            }
            const input = document.createElement(field.type == 'select' ? 'select' : 'input');
            if (field.type != 'select')
                input.setAttribute('type', field.type);
            if (((_c = field.nullable) !== null && _c !== void 0 ? _c : true) && ((_d = field.visible) !== null && _d !== void 0 ? _d : true))
                input.setAttribute('required', '');
            input.setAttribute('id', id);
            input.setAttribute('name', field.name);
            // Add value listener to all fields
            input.addEventListener('input', (e) => {
                let input = e.target;
                let fieldName = input.getAttribute('name');
                this.structure.fields.find((val) => { return val.name == fieldName; }).value = input.value;
            });
            // Add event listener to updaters
            if (field.updater) {
                input.addEventListener('input', this.UpdateForm.bind(this));
            }
            // Register visible condition
            if (field.visible_condition) {
                this.visible_conditions.set(field.name, field.visible_condition);
            }
            if (field.visible == false) {
                container.setAttribute('hidden', 'true');
            }
            // Do switch for different types of inputs here
            switch (field.type) {
                case 'select':
                    (_e = field.options) === null || _e === void 0 ? void 0 : _e.forEach((option) => {
                        const text = document.createElement('option');
                        text.innerText = option;
                        input.add(text);
                    });
            }
            container.appendChild(input);
            this.form.appendChild(container);
        });
        // Create submit button
        const submit = document.createElement('input');
        submit.setAttribute('type', 'submit');
        submit.textContent = 'Submit';
        this.form.appendChild(submit);
        // Create cancel button
        const cancel = document.createElement('button');
        cancel.textContent = 'Cancel';
        cancel.addEventListener('click', (e) => {
            this.DeleteForm();
        });
        this.form.appendChild(cancel);
        // Add Form to page
        document.body.appendChild(this.pageBlocker);
        // Update Form
        this.UpdateForm();
    }
    UpdateForm() {
        this.visible_conditions.forEach((callback, key) => {
            let field = this.structure.fields.find((val) => { return val.name == key; });
            this.SetFieldVisibility(key, callback(this));
        });
    }
    GetFieldValue(fieldName) {
        let fieldId = this.formIds.get(fieldName);
        let fieldEl = document.getElementById(fieldId);
        return fieldEl.value;
    }
    SetFieldVisibility(fieldName, visible) {
        var _a, _b;
        let field = this.structure.fields.find((val) => { return val.name == fieldName; });
        if (visible == field.visible)
            return;
        let fieldId = this.formIds.get(fieldName);
        let fieldEl = document.getElementById(fieldId);
        let container = fieldEl.parentElement;
        field.visible = visible;
        if (!field.visible) {
            container.setAttribute('hidden', '');
            if (!((_a = field.nullable) !== null && _a !== void 0 ? _a : false))
                fieldEl.removeAttribute('required');
        }
        else {
            container.removeAttribute('hidden');
            if (!((_b = field.nullable) !== null && _b !== void 0 ? _b : false))
                fieldEl.setAttribute('required', '');
        }
    }
    GenerateID(fieldName) {
        let id;
        do {
            id = Date.now().toString(36) + Math.random().toString(36).substring(2);
        } while (id in this.formIds.values);
        this.formIds.set(fieldName, id);
        return id;
    }
    DeleteForm() {
        this.pageBlocker.remove();
    }
}
