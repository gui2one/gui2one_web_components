class GuiGroup extends HTMLElement{
    template_fragment : DocumentFragment;
    constructor(){
        super();
        this.attachShadow({mode : "open"});
        const styles = String.raw`<style>

            .wrapper{
                border-radius : 3px;
                outline : 1px solid gray;
                padding : 0.2em;
            }
        </style>`;
        const template = String.raw`
            ${styles}
            <div class="wrapper">
            <slot></slot>

            </div>

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
customElements.define("gui-group", GuiGroup);