class GuiAccordion extends HTMLElement{
    template_fragment : DocumentFragment;
    constructor(){
        super();
        this.attachShadow({mode : "open"});
        const styles = String.raw`<style>

            :host{
                background-color : red;
            }
        </style>`;
        const template = String.raw`
            ${styles}
            <h5>Accordion !!</h5>
            <slot></slot>
        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        this.shadowRoot?.appendChild(this.template_fragment.cloneNode(true));
    }


    connectedCallback(){
    }


    static get observedAttributes(){
        return [];
    }


    attributeChangedCallback(name : string, oldValue : any, newValue : any) {
    
    }
}
customElements.define("gui-accordion", GuiAccordion);