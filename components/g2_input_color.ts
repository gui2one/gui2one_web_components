import { GuiInputFloat } from "./g2_input_float";
export class GuiInputColor extends HTMLElement{
    template_fragment : DocumentFragment;

    label_el : HTMLDivElement;
    input_x : GuiInputFloat;
    input_y : GuiInputFloat;
    input_z : GuiInputFloat;
    default_scalar : number = 0;
    _label : string = "Vector";
    
    private _value : number[] = [0,0,0];
    private _default_value : number[] = [0,0,0];
    
    sample_el : HTMLDivElement;
    constructor()
    {
        super();
        this.attachShadow({mode : "open"});

        const styles = String.raw`
            <style>

                .wrapper{
                    display : flex;
                    flex-direction : column;
                    font-size : 0.9em;
                }

                .label{
                    font-family : sans-serif;
                }

                #clr_sample{
                    flex : 1;
                    width : 30px;
                    background-color : red;
                }
            </style>
        `;

        const template_str = String.raw`

            ${styles}
            <div class="wrapper">
                <div class="label">${this._label}</div>
                <div class="floats" style="display : flex; gap:3px;">
                    <gui-input-float id="input_x" color="red"   label="R" default_value="${this.default_scalar}"> </gui-input-float>
                    <gui-input-float id="input_y" color="green" label="G" default_value="${this.default_scalar}"></gui-input-float>
                    <gui-input-float id="input_z" color="blue"  label="B" default_value="${this.default_scalar}"></gui-input-float>
                    <div id="clr_sample" ></div>
                </div>
            </div>
        `;

        this.template_fragment = document.createRange().createContextualFragment(template_str);
        this.shadowRoot!.appendChild(this.template_fragment.cloneNode(true));
    
        this.label_el = this.shadowRoot!.querySelector(".label") as HTMLDivElement; 
        this.input_x = this.shadowRoot!.querySelector("#input_x") as GuiInputFloat;
        this.input_y = this.shadowRoot!.querySelector("#input_y") as GuiInputFloat;
        this.input_z = this.shadowRoot!.querySelector("#input_z") as GuiInputFloat;
        this.sample_el = this.shadowRoot!.querySelector("#clr_sample") as HTMLDivElement;

        this.input_x.addEventListener("change", (event : Event)=>{
            let val = (event.target! as GuiInputFloat).value;
            this.value[0] = val;
            this.dispatchEvent(new Event("change"));
            this.updateSample();
        })
        this.input_y.addEventListener("change", (event : Event)=>{
            let val = (event.target! as GuiInputFloat).value;
            this.value[1] = val;
            this.dispatchEvent(new Event("change"));
            this.updateSample();
        })
        this.input_z.addEventListener("change", (event : Event)=>{
            let val = (event.target! as GuiInputFloat).value;
            this.value[2] = val;
            this.dispatchEvent(new Event("change"));
            this.updateSample();
        })

    }

    connectedCallback()
    {
        this.input_x._default_value = this.default_scalar;
        this.input_y._default_value = this.default_scalar;
        this.input_z._default_value = this.default_scalar;

        this.updateSample();
        
    }

    updateSample()
    {
        this.clampValues();
        this.sample_el.style.backgroundColor = `rgb(${this.input_x.value * 255},${this.input_y.value * 255},${this.input_z.value * 255})`;
    }

    clampValues()
    {
        if(this.input_x.value > 1.0) this.input_x.value = 1.0;
        else if(this.input_x.value < 0.0) this.input_x.value = 0.0;
        
        if(this.input_y.value > 1.0) this.input_y.value = 1.0;
        else if(this.input_y.value < 0.0) this.input_y.value = 0.0;
        
        if(this.input_z.value > 1.0) this.input_z.value = 1.0;
        else if(this.input_z.value < 0.0) this.input_z.value = 0.0;
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
        console.log("setting values : ", val);
        this.input_x.value = val[0];
        this.input_y.value = val[1];
        this.input_z.value = val[2];
        this._value = val;

        this.updateSample();
    }

    set default_value(val : number[])
    {
        this._default_value = val;
        this.input_x.default_value = val[0];
        this.input_y.default_value = val[1];
        this.input_z.default_value = val[2];
    }

    set label(str : string)
    {
        this._label = str;
        this.label_el.innerText = str;
    }

}


customElements.define("gui-input-color", GuiInputColor);