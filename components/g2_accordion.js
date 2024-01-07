"use strict";
class GuiAccordion extends HTMLElement {
    constructor() {
        var _a;
        super();
        this.collapsibles = [];
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
    open(theone) {
        this.collapsibles.forEach((item, index) => {
            // console.log(item, index);
            if (item !== theone) {
                item.setAttribute("closed", "true");
            }
        });
    }
    connectedCallback() {
        const slot = this.shadowRoot.querySelector('slot');
        this.collapsibles = [];
        slot === null || slot === void 0 ? void 0 : slot.addEventListener("slotchange", () => {
            for (let node of slot === null || slot === void 0 ? void 0 : slot.assignedNodes()) {
                if (node.nodeName === 'GUI-COLLAPSIBLE') {
                    let coll = node;
                    coll.addEventListener("open", (ev) => {
                        this.open(ev.target);
                    });
                    this.collapsibles.push(coll);
                }
            }
        });
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
