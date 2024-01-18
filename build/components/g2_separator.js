export class GuiSeparator extends HTMLElement {
    constructor() {
        var _a;
        super();
        this.attachShadow({ mode: "open" });
        const styles = String.raw `<style>

            hr{
                opacity : 0.1;
            }
        </style>`;
        const template = String.raw `
            ${styles}
            <hr>
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
customElements.define("gui-separator", GuiSeparator);
