"use strict";
class GuiGroup extends HTMLElement {
    constructor() {
        var _a;
        super();
        this.attachShadow({ mode: "open" });
        const styles = String.raw `<style>

            .wrapper{
                border-radius : 3px;
                outline : 1px solid gray;
                padding : 0.2em;
            }
        </style>`;
        const template = String.raw `
            ${styles}
            <div class="wrapper">
            <slot></slot>

            </div>

        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(this.template_fragment.cloneNode(true));
    }
    connectedCallback() {
    }
    static get observedAttributes() {
        return [];
    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
}
customElements.define("gui-group", GuiGroup);
