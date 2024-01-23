export class GuiColorPicker extends HTMLElement{
    template_fragment : DocumentFragment;
    constructor(){
        super();
        this.attachShadow({mode : "open"});
        const styles = String.raw`<style>

            .clr_sample{
                width : 30px;
                height : 100%;
                cursor : pointer;

                /* overflow : visible; */
                margin : 1px;
            }

            .clr_sample:hover{
                outline : 1px solid white !important;
            }
        </style>`;
        
        const template = String.raw`

            ${styles}
            

                <div class="clr_sample"></div>

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
customElements.define("gui-color-picker", GuiColorPicker);