"use strict";
class GuiGroup extends HTMLElement {
    constructor() {
        var _a;
        super();
        this._label = "default label";
        this.attachShadow({ mode: "open" });
        const styles = String.raw `<style>

            .wrapper{
                position : relative;
                border-radius : 3px;
                outline : 2px solid #ffffff10;
                padding : 0.2em;
                padding-top : 0.5em;
                margin-top : 1.0em;
                /* height : min-content; */

            }
            .label{
                font-size : 0.8em;
                position : absolute;

                top : 0;
                line-height : 1em;
                background-color : #222222;
                margin-top : -0.5em;
            }
        </style>`;
        const template = String.raw `
            ${styles}


            <div class="wrapper">
            <div class="label">${this._label}</div>
            <slot></slot>

            </div>

        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(this.template_fragment.cloneNode(true));
        this.label_el = this.shadowRoot.querySelector(".label");
    }
    connectedCallback() {
    }
    static get observedAttributes() {
        return ['label'];
    }
    set label(str) {
        if (this.label_el) {
            this._label = str;
            this.label_el.innerText = str;
        }
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'label':
                this.label = newValue;
                break;
            default: break;
        }
    }
}
customElements.define("gui-group", GuiGroup);
