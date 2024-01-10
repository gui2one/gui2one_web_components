class GuiCombobox extends HTMLElement{
    template_fragment : DocumentFragment;
    constructor(){
        super();
        this.attachShadow({mode : "open"});
        const styles = String.raw`<style></style>`;
        const template = String.raw`
            ${styles}

            
            <slot></slot>

            
        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        this.shadowRoot!.appendChild(this.template_fragment.cloneNode(true));
        
        // let slot = this.shadowRoot!.querySelector("slot");
        // console.log(slot);
        
    }


    connectedCallback(){
        const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement;
        
        
        let option_nodes : Array<HTMLOptionElement> = [];        
        slot?.addEventListener("slotchange", ()=>{
            for(let node of slot?.assignedNodes())
            {
                
                if(node.nodeName === 'OPTION'){
                    

                    let coll = node as HTMLOptionElement;

                    option_nodes.push(coll);

                    this.removeChild(coll);

                
                }        
            }
            console.log(option_nodes);
            
            let old_select = this.shadowRoot!.querySelector("select");
            if(old_select !== null)
            {
                this.removeChild(old_select);
            }
            let data_list = document.createElement("select");
            for(let option of option_nodes)
            {
                let opt = document.createElement("option");
                opt.innerText = option.value;
                // opt.innerText = option.value;
                data_list.appendChild(opt)
            }
            this.shadowRoot!.appendChild(data_list)
        })        
    }


    static get observedAttributes(){
        return [];
    }


    attributeChangedCallback(name : string, oldValue : any, newValue : any) {
    
    }
}
customElements.define("gui-combobox", GuiCombobox);