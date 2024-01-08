"use strict";
class GuiCheckbox extends HTMLElement {
    constructor() {
        var _a;
        super();
        this.label = "toggle";
        this.value = true;
        this.attachShadow({ mode: "open" });
        const styles = String.raw `<style></style>`;
        const template = String.raw `
            ${styles}

            <div id="wrapper">
            <label for="checkbox">${this.label}</label>
            <input id="checkbox" type="checkbox" ${this.value ? 'checked' : ''} />
            </div>
        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(this.template_fragment.cloneNode(true));
        this.label_el = this.shadowRoot.querySelector("label");
        let checkbox = this.shadowRoot.querySelector("#checkbox");
        checkbox.addEventListener("change", (event) => {
            let checkbox = event.target;
            // console.log(event);
            this.value = checkbox.toggleAttribute("checked");
            let ev = new Event("change");
            this.dispatchEvent(ev);
        });
    }
    connectedCallback() {
    }
    static get observedAttributes() {
        return ["label"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'value':
                this.value = newValue;
                break;
            case 'label':
                this.label = newValue;
                this.label_el.innerText = newValue;
                break;
            default: break;
        }
    }
}
customElements.define("gui-checkbox", GuiCheckbox);
