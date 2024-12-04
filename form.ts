export type FormField = {
    type: string; // The HTML form type. Should just need text, select, or checkbox. Can also use label to just add a message.
    name: string; // Name of field, should be the same here as it is in the API. Must be unique within the form.
    label?: string; // Label next to field on form.
    placeholder?: string; // Placeholder for text type. (Not Functional)
    value?: string // Current value of the field. Assign to make a default value.
    nullable?: boolean; // Empty field allowed. Ignored if visible is false. False by default.
    options?: Array<string>; // For select type.
    visible_condition?: (Form: Form) => boolean; // Use this to hide the field under certain conditions.
    visible?: boolean // Indicates if the field is currently visible or not. True by default
    send?: boolean // Controls if the field is sent to the API. Ignored if visible is false or if type is 'label'. True by default.
    updater?: boolean // Controls whether or not the form should update on its change. False by default.
}

export type FormStructure = {
    header: string; // Text at the top of the form
    fields: Array<FormField>; // Self-explanatory
}

export default class Form {
    structure: FormStructure;
    pageBlocker: HTMLDivElement;
    formRoot: HTMLDivElement;
    form: HTMLFormElement;

    formIds: Map<string, string> = new Map<string, string>;
    visible_conditions: Map<string, (form: Form) => boolean> = new Map<string, (form: Form) => boolean>;

    constructor(structure: FormStructure) {
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

        this.structure.fields.forEach((field: FormField, i: Number) => {
            const id = this.GenerateID(field.name);
            const container = document.createElement('p');

            // Create Label
            const label = document.createElement('label');
            
            label.setAttribute('for', id);
            label.textContent = field.label ?? field.name;
            container.appendChild(label);

            // Create Field
            if (field.type == 'label') {
                const label = document.createElement('p');
                label.innerText = field.label ?? '';

                this.form.appendChild(label);
                return;
            }


            const input = document.createElement(field.type == 'select' ? 'select' : 'input');
            
            if (field.type != 'select') input.setAttribute('type', field.type);
            if ((field.nullable ?? true) && (field.visible ?? true)) input.setAttribute('required', '');

            input.setAttribute('id', id);
            input.setAttribute('name', field.name);

            
            // Add value listener to all fields
            input.addEventListener('input', (e) => {
                let input = e.target as HTMLInputElement | HTMLSelectElement

                let fieldName = input.getAttribute('name');
                this.structure.fields.find((val) => {return val.name == fieldName;})!.value = input.value;
            })
            
            // Add event listener to updaters
            if (field.updater) {
                input.addEventListener('input', this.UpdateForm.bind(this));
            }

            // Register visible condition
            if (field.visible_condition) {
                this.visible_conditions.set(field.name, field.visible_condition)
            }
            
            if (field.visible == false) {container.setAttribute('hidden', 'true')}

            // Do switch for different types of inputs here
            switch (field.type) {
                case 'select':
                    field.options?.forEach((option) => {
                        const text = document.createElement('option');
                        text.innerText = option;
                        (input as HTMLSelectElement).add(text);
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
            let field = this.structure.fields.find((val) => {return val.name == key})!;
            this.SetFieldVisibility(key, callback(this));
        })
    }

    GetFieldValue(fieldName: string) {
        let fieldId = this.formIds.get(fieldName);
        let fieldEl = document.getElementById(fieldId!) as HTMLInputElement | HTMLSelectElement;
        return fieldEl.value;    
    }

    SetFieldVisibility(fieldName: string, visible: boolean) {
        let field = this.structure.fields.find((val) => {return val.name == fieldName})!;
        
        if (visible == field.visible) return;

        let fieldId = this.formIds.get(fieldName);
        let fieldEl = document.getElementById(fieldId!) as HTMLInputElement | HTMLSelectElement;
        let container = fieldEl.parentElement!;
        
        field.visible = visible;
        if (!field.visible) {
            container.setAttribute('hidden', '');
            if (!(field.nullable ?? false)) fieldEl.removeAttribute('required');
        }
        else {
            container.removeAttribute('hidden');
            if (!(field.nullable ?? false)) fieldEl.setAttribute('required', '');
        }
    }

    GenerateID(fieldName: string) {
        let id: string;
        do {
            id = Date.now().toString(36) + Math.random().toString(36).substring(2);
        } while (id in this.formIds.values);

        this.formIds.set(fieldName, id)
        return id;
    }

    DeleteForm() {
        this.pageBlocker.remove();
    }
}




