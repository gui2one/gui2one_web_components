class GuiCombobox extends HTMLElement{
    template_fragment : DocumentFragment;

    _label : string = "Label";
    label_el : HTMLLabelElement;
    wrapper : HTMLDivElement;

    _value : string = "";
    _selectedIndex : number = -1;
    constructor(){
        super();
        this.attachShadow({mode : "open"});
        const styles = String.raw`<style>
            .wrapper{
                padding : 0.5em;
                display : flex;
                flex-direction : row;
                align-items :center;
            }

            label{
                position : relative;
                display : block;
                flex : 1.0;
            }

            select{
                height : 2.2em;
                flex : 1;
                position : relative;
                display : block;
                color : #eee;
                background-color : grey;
                border-radius : 3px;
            }
        </style>`;
        const template = String.raw`
            ${styles}

            <div class="wrapper">
            <label for="list">${this._label}</label>
            <slot></slot>

            </div>

            
        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        this.shadowRoot!.appendChild(this.template_fragment.cloneNode(true));
        this.wrapper = this.shadowRoot!.querySelector(".wrapper") as HTMLDivElement;
        this.label_el = this.shadowRoot!.querySelector("label") as HTMLLabelElement;
        // let slot = this.shadowRoot!.querySelector("slot");
        // console.log(slot);
        
    }

    set label(str : string)
    {
        if(this.label_el)
        {
            this._label = str;
            this.label_el.innerText = str;
        }
    }

    set selectedIndex(index : number)
    {
        this._selectedIndex = index;
    }

    get selectedIndex() : number
    {
        return this._selectedIndex;
    }

    get value()
    {
        return this._value;
    }

    set value(str : string)
    {
        this._value = str;
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
            
            let old_select = this.shadowRoot!.querySelector(".wrapper>select");
            console.log(old_select);
            if(old_select !== null)
            {
                this.wrapper.removeChild(old_select);
            }
            let select : HTMLSelectElement = document.createElement("select") as HTMLSelectElement;
            select.id = "list";
            select.addEventListener("change", (event : any)=>{
                let sel = event.target as HTMLSelectElement;
                // console.log(sel.selectedIndex);
                
                this.value = sel.value; 
                this.selectedIndex = sel.selectedIndex;
                let ev= new CustomEvent("change", {});
                //  = sel.selectedIndex;
                this.dispatchEvent(ev);

            })
            for(let option of option_nodes)
            {
                let opt = document.createElement("option");
                opt.innerText = option.value;
                // opt.innerText = option.value;
                select.appendChild(opt)
            }
            this.wrapper.appendChild(select)
        })        
    }


    static get observedAttributes(){
        return ["label"];
    }


    attributeChangedCallback(name : string, oldValue : any, newValue : any) {
        switch(name){
            case 'label':
                if(this.label_el){
                    this.label_el.innerText = newValue;
                }
            default : break;
        }
    }
}
customElements.define("gui-combobox", GuiCombobox);