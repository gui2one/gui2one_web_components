export class GuiCombobox extends HTMLElement{
    template_fragment : DocumentFragment;

    _label : string = "Label";
    label_el : HTMLLabelElement;
    wrapper : HTMLDivElement;

    _value : string = "";
    _selectedIndex : number = 0;

    options : Array<HTMLOptionElement> = [];
    constructor(){
        super();
        this.attachShadow({mode : "open"});
        const styles = String.raw`<style>
            .wrapper{
                /* padding : 0.5em; */
                display : flex;
                flex-direction : row;
                align-items :center;
                justify-content : center;
                height : 30px;
            }

            label{
                display : flex;
                align-items : center;
                justify-content : center;
                position : relative;
                outline : 1px solid rgba(255,255,255,0.1);
                height : 100%;
                flex : 1.0;

                border-radius : 3px 0 0 3px;
            }

            select{
                border : 0;
                height : 31px;
                line-height : 30px;
                flex : 1;
                position : relative;
                display : block;
                color : #222;
                background-color : white;
                border-radius : 0 3px 3px 0;
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
        if(index <= this.options.length && index >= 0 )
        {

            this.value = this.options[index].innerText;
        }
        // this.dispatchEvent(new Event("change"));
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
        
        
        this.options = [];        
        slot?.addEventListener("slotchange", ()=>{
            for(let node of slot?.assignedNodes())
            {
                
                if(node.nodeName === 'OPTION'){
                    

                    let opt = node as HTMLOptionElement;

                    this.options.push(opt);

                    this.removeChild(opt);

                
                }        
            }
            
            this.updateOptions();
        })        
    }

    updateOptions()
    {
    
        let old_select = this.shadowRoot!.querySelector(".wrapper>select");
        if(old_select !== null)
        {
            // console.log("removing old " , old_select);
            this.wrapper.removeChild(old_select);
        }
        let select : HTMLSelectElement = document.createElement("select") as HTMLSelectElement;
        select.id = "list";
        select.addEventListener("change", (event : any)=>{
            let sel = event.target as HTMLSelectElement;
            // console.log(sel.selectedIndex);
            
            this.value = sel.value; 
            this.selectedIndex = sel.selectedIndex;
            let ev= new Event("change", {});
            //  = sel.selectedIndex;
            this.dispatchEvent(ev);

        })
        for(let option of this.options)
        {
            let opt = document.createElement("option");
            opt.innerText = option.value;
            // opt.innerText = option.value;
            select.appendChild(opt)
        }
        this.wrapper.appendChild(select)
    }

    addOption(name : string)
    {
        let opt = document.createElement("option");
        opt.innerText = name;
        this.options.push(opt);

        this.updateOptions();
    }

    resetOptions()
    {
        this.options = [];
        this.updateOptions();
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