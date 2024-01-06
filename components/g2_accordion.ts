class GuiAccordion extends HTMLElement{
    template_fragment : DocumentFragment;
    constructor(){
        super();
        this.attachShadow({mode : "open"});
        const styles = String.raw`<style>

        </style>`;
        const template = String.raw`
            ${styles}
            <slot></slot>
        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        this.shadowRoot?.appendChild(this.template_fragment.cloneNode(true));

        
    }
    updateCollapsibles() {
        let collapsibles = this.shadowRoot!.querySelectorAll("gui-collapsible");
        console.log(collapsibles);
    }

    connectedCallback(){
        const slot = this.shadowRoot!.querySelector('slot') as HTMLSlotElement;
        
        // console.log(slot?.hasChildNodes());
        slot?.addEventListener("slotchange", ()=>{
            let collapsibles = slot.querySelectorAll("gui-collaspible");
            for(let node of slot?.assignedNodes())
            {
                if(node.nodeName === 'GUI-COLLAPSIBLE'){
                    console.log(node);
                    
                }
                
            }
        })
        
        // for(let node of slot?.assignedNodes())
        // {
        //     console.log(node);
            
        // }
    }

    adoptedCallBack()
    {
        console.log("adopted");
        
    }


    static get observedAttributes(){
        return [];
    }


    attributeChangedCallback(name : string, oldValue : any, newValue : any) {
    
    }
}
customElements.define("gui-accordion", GuiAccordion);