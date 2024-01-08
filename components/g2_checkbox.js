"use strict";
class GuiCheckbox extends HTMLElement {
    constructor() {
        var _a;
        super();
        this.label = "toggle";
        this.value = true;
        this.attachShadow({ mode: "open" });
        const styles = String.raw `<style>
            :host{
                --padding-top : 0.3em;
                --padding-bottom : 0.3em;
                --padding-left : 0.15em;
                --padding-right : 0.15em;
            }
            #wrapper{
                display : flex;
                align-items : center;
                /* justify-content : center; */
                margin-bottom : 0.5em;
            }

            label{
                display : flex;
                align-items : center;
                justify-content : center;
                color : white;
                background-color : grey;
                padding-left : var(--padding-left);
                padding-top : var(--padding-top);
                padding-bottom : var(--padding-bottom);

                border-radius : 3px 0 0 3px;
                line-height : 1em;
                width : 50%;
                cursor : pointer;
            }
            input[type=checkbox]
            {
                visibility : hidden;
            }
            .pretty{
                position : relative;
                height : 1em;
                width : 50px;
                background-color : black;
                padding-top : var(--padding-top);
                padding-bottom : var(--padding-bottom);

                border-radius : 0px 3px 3px 0px;
            }

            
            .pretty.checked::after{
                content : "";
                position : absolute;
                left : 0;
                top : 0;
                width : 100%;
                height : 100%;
                background-color : orange;
                border-radius : 0px 3px 3px 0px;
            }
        </style>`;
        const template = String.raw `
            ${styles}

            <div id="wrapper">
            <label for="checkbox">${this.label}</label>
            <div class="pretty ${this.value ? 'checked' : ''}">
            </div>
            <input id="checkbox" type="checkbox" ${this.value ? 'checked' : ''} />
            </div>
        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(this.template_fragment.cloneNode(true));
        this.label_el = this.shadowRoot.querySelector("label");
        this.pretty_el = this.shadowRoot.querySelector(".pretty");
        let checkbox = this.shadowRoot.querySelector("#checkbox");
        checkbox.addEventListener("change", (event) => {
            let checkbox = event.target;
            // console.log(event);
            this.value = checkbox.toggleAttribute("checked");
            this.pretty_el.classList.toggle("checked");
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
