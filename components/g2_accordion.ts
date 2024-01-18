import { GuiCollapsible } from "./g2_collapsible";
export class GuiAccordion extends HTMLElement{
    template_fragment : DocumentFragment;
    collapsibles : GuiCollapsible[] = [];
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
    open(theone : GuiCollapsible) {
        this.collapsibles.forEach((item, index)=>{
            // console.log(item, index);
            if(item !== theone){
                item.setAttribute("closed", "true");
            }
        })
    }

    connectedCallback(){
        const slot = this.shadowRoot!.querySelector('slot') as HTMLSlotElement;
        
        this.collapsibles = [];
        
        slot?.addEventListener("slotchange", ()=>{
            for(let node of slot?.assignedNodes())
            {
                if(node.nodeName === 'GUI-COLLAPSIBLE'){

                    let coll = node as GuiCollapsible;
                    coll.addEventListener("open", (ev : Event)=>{
                        this.open(ev.target as GuiCollapsible)
                    })
                    // console.log(coll);
                    
                    this.collapsibles.push(coll);
                }        
            }
        })
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