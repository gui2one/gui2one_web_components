"use strict";
class GuiCombobox extends HTMLElement {
    constructor() {
        super();
        this._label = "Label";
        this.attachShadow({ mode: "open" });
        const styles = String.raw `<style>
            .wrapper{
                padding : 0.5em;
                display : flex;
                flex-direction : row;
                align-items :center;
            }

            label{
                position : relative;
                display : block;
                flex : 1.0;
            }

            select{
                height : 2.2em;
                flex : 1;
                position : relative;
                display : block;
                color : #eee;
                background-color : grey;
                border-radius : 3px;
            }
        </style>`;
        const template = String.raw `
            ${styles}

            <div class="wrapper">
            <label for="list">${this._label}</label>
            <slot></slot>

            </div>

            
        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        this.shadowRoot.appendChild(this.template_fragment.cloneNode(true));
        this.wrapper = this.shadowRoot.querySelector(".wrapper");
        this.label_el = this.shadowRoot.querySelector("label");
        // let slot = this.shadowRoot!.querySelector("slot");
        // console.log(slot);
    }
    set label(str) {
        if (this.label_el) {
            this._label = str;
            this.label_el.innerText = str;
        }
    }
    connectedCallback() {
        var _a;
        const slot = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('slot');
        let option_nodes = [];
        slot === null || slot === void 0 ? void 0 : slot.addEventListener("slotchange", () => {
            for (let node of slot === null || slot === void 0 ? void 0 : slot.assignedNodes()) {
                if (node.nodeName === 'OPTION') {
                    let coll = node;
                    option_nodes.push(coll);
                    this.removeChild(coll);
                }
            }
            let old_select = this.shadowRoot.querySelector(".wrapper>select");
            console.log(old_select);
            if (old_select !== null) {
                this.wrapper.removeChild(old_select);
            }
            let select = document.createElement("select");
            select.id = "list";
            select.addEventListener("change", (event) => {
                let sel = event.target;
                // console.log(sel.selectedIndex);
                let ev = new CustomEvent("change", {});
                //  = sel.selectedIndex;
                this.dispatchEvent(ev);
            });
            for (let option of option_nodes) {
                let opt = document.createElement("option");
                opt.innerText = option.value;
                // opt.innerText = option.value;
                select.appendChild(opt);
            }
            this.wrapper.appendChild(select);
        });
    }
    static get observedAttributes() {
        return ["label"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'label':
                if (this.label_el) {
                    this.label_el.innerText = newValue;
                }
            default: break;
        }
    }
}
customElements.define("gui-combobox", GuiCombobox);
