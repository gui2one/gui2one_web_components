"use strict";
class GuiAccordion extends HTMLElement {
    constructor() {
        var _a;
        super();
        this.attachShadow({ mode: "open" });
        const styles = String.raw `<style>

        </style>`;
        const template = String.raw `
            ${styles}
            <slot></slot>
        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(this.template_fragment.cloneNode(true));
    }
    updateCollapsibles() {
        let collapsibles = this.shadowRoot.querySelectorAll("gui-collapsible");
        console.log(collapsibles);
    }
    connectedCallback() {
        const slot = this.shadowRoot.querySelector('slot');
        // console.log(slot?.hasChildNodes());
        slot === null || slot === void 0 ? void 0 : slot.addEventListener("slotchange", () => {
            let collapsibles = slot.querySelectorAll("gui-collaspible");
            for (let node of slot === null || slot === void 0 ? void 0 : slot.assignedNodes()) {
                if (node.nodeName === 'GUI-COLLAPSIBLE') {
                    console.log(node);
                }
            }
        });
        // for(let node of slot?.assignedNodes())
        // {
        //     console.log(node);
        // }
    }
    adoptedCallBack() {
        console.log("adopted");
    }
    static get observedAttributes() {
        return [];
    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
}
customElements.define("gui-accordion", GuiAccordion);
