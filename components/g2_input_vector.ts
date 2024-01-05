class GuiInputVector extends HTMLElement{
    template_fragment : DocumentFragment;

    label_el : HTMLDivElement;
    input_x : GuiInputFloat;
    input_y : GuiInputFloat;
    input_z : GuiInputFloat;
    default_scalar : number = 0;
    label : string = "Vector";
    
    private _value : number[] = [0,0,0];
    private _default_value : number[] = [0,0,0];
    constructor()
    {
        super();
        this.attachShadow({mode : "open"});

        const styles = String.raw`
            <style>

                .wrapper{
                    margin-top : 3px;
                    font-size : 0.9em;
                }

                .label{
                    font-family : sans-serif;
                }
            </style>
        `;

        const template_str = String.raw`

            ${styles}
            <div class="wrapper">
                <div class="label">${this.label}</div>
                <div class="floats" style="display : flex; gap:5px;">
                    <gui-input-float id="input_x" color="red"   label="x" default_value="${this.default_scalar}"> </gui-input-float>
                    <gui-input-float id="input_y" color="green" label="y" default_value="${this.default_scalar}"></gui-input-float>
                    <gui-input-float id="input_z" color="blue"  label="z" default_value="${this.default_scalar}"></gui-input-float>
                </div>
            </div>
        `;

        this.template_fragment = document.createRange().createContextualFragment(template_str);
        this.shadowRoot!.appendChild(this.template_fragment.cloneNode(true));
    
        this.label_el = this.shadowRoot!.querySelector(".label") as HTMLDivElement; 
        this.input_x = this.shadowRoot!.querySelector("#input_x") as GuiInputFloat;
        this.input_y = this.shadowRoot!.querySelector("#input_y") as GuiInputFloat;
        this.input_z = this.shadowRoot!.querySelector("#input_z") as GuiInputFloat;

        this.input_x.addEventListener("changed", (event : Event)=>{
            let val = (event.target! as GuiInputFloat).value;
            this.value[0] = val;
            this.dispatchEvent(new Event("changed"));
        })
        this.input_y.addEventListener("changed", (event : Event)=>{
            let val = (event.target! as GuiInputFloat).value;
            this.value[1] = val;
            this.dispatchEvent(new Event("changed"));
        })
        this.input_z.addEventListener("changed", (event : Event)=>{
            let val = (event.target! as GuiInputFloat).value;
            this.value[2] = val;
            this.dispatchEvent(new Event("changed"));
        })

    }

    connectedCallback()
    {
        this.input_x.default_value = this.default_scalar;
        this.input_y.default_value = this.default_scalar;
        this.input_z.default_value = this.default_scalar;
        
    }

    static get observedAttributes()
    {
        return ["default_scalar", "label"];
    }

    attributeChangedCallback(name : string, oldValue : any, newValue : any)
    {
        switch(name)
        {
            case 'default_scalar' :
                this.default_scalar = parseFloat(newValue);
                this.input_x.value = this.default_scalar;
                this.input_y.value = this.default_scalar;
                this.input_z.value = this.default_scalar;
                break;
            case 'label' :
                this.label = newValue;
                this.label_el.innerText = newValue;
                break;
            default : 
                break;
        }
    }

    get value() : number[]{
        return [this.input_x.value, this.input_y.value, this.input_z.value];
    }

    set value(val : number[])
    {
        this._value = val;
    }

}


customElements.define("gui-input-vector", GuiInputVector);