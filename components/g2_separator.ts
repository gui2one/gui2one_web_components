export class GuiSeparator extends HTMLElement{
    template_fragment : DocumentFragment;
    constructor(){
        super();
        this.attachShadow({mode : "open"});
        const styles = String.raw`<style>

            hr{
                opacity : 0.1;
            }
        </style>`;
        const template = String.raw`
            ${styles}
            <hr>
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
customElements.define("gui-separator", GuiSeparator);