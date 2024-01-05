class GuiInputFloat extends HTMLElement{
    
    private _value : number;
    value_preview : number = 0;
    default_value : number = 0;

    _label : string = '';
    label_el : HTMLDivElement;
    _color: string = "";
    styles : string;
    value_input : HTMLInputElement;
    template_fragment : DocumentFragment;
    
    is_mouse_down : boolean;
    is_dragging : boolean;

    drag_start_pos : number = 0;
    ctrl_pressed : boolean = false;
    shift_pressed : boolean = false;
    
    constructor()
    {
        super();

        this.attachShadow({mode : "open"});
        this._value = 0.0;
        this.label = "X";
        this.color = "hotpink";

        this.is_mouse_down = false;
        this.is_dragging = false;
        
        this.styles = String.raw`
            <style>

            :host{
                --padding-top : 0.3em;
                --padding-bottom : 0.3em;
                --padding-left : 0.15em;
                --padding-right : 0.15em;
            }

            .wrapper{
                position : relative;
                display : flex;
                align-items: stretch;
                width : max-content;
                font-size : 0.9rem;
            }

            .label{
                
                
                color : white;
                position : relative;
                padding-left : 0.5em;
                padding-right : 0.5em;
                background-color : ${this._color};
                border-radius : 2px 0 0 2px;
                vertical-align : middle;
                padding-top : var(--padding-top);
                padding-bottom : var(--padding-bottom);
                user-select : none;

                cursor : e-resize;   
            }

            .label span{
                opacity : 0.8;                
            }

            .value_div{
                padding-left : 0.2em;
                position : relative;
                overflow : hidden;
                border-radius : 0 2px 2px 0;
                background-color : darkgrey;
                padding-top : var(--padding-top);
                padding-bottom : var(--padding-bottom);
                padding-left : var(--padding-left);
            }

            input{
                color : white;
                font-weight : bold;
                height : calc(100% - 2px );
                width : 8ch;
                border : none;
                height: max-content;
                background-color : transparent;
            }

            </style>        
        `;
        const template = String.raw`

            ${this.styles}

            <div class="wrapper">
                <div class="label"><span>${this.label}<span></div>
                <div class="value_div">
                    <input type=number step="0.1" value=${this.value} />
                </div>
            <div>
        `;

        this.template_fragment = document.createRange().createContextualFragment(template);
        this.shadowRoot?.appendChild(this.template_fragment.cloneNode(true));
   
        this.label_el = this.shadowRoot!.querySelector(".label") as HTMLDivElement;
        let label_span = this.label_el.querySelector("span") as HTMLSpanElement;

                
        // label_span.style.opacity = "0.8";   
        this.value_input = this.shadowRoot!.querySelector("input") as HTMLInputElement



    }
    
    connectedCallback(){

        document.addEventListener("keydown", (event : KeyboardEvent) => {
            if(event.ctrlKey)
            {
                this.ctrl_pressed = true;
            }
            if(event.shiftKey)
            {
                this.shift_pressed = true;
            }
        })
        document.addEventListener("keyup", (event : KeyboardEvent) => {
            
            if(event.key == "Control")
            {
                this.ctrl_pressed = false;
                // console.log("ctrl_pressed ", this.ctrl_pressed);
                
            }
            if(event.key == "Shift")
            {
                this.shift_pressed = false;
                // console.log("shift_pressed ", this.shift_pressed);
            }
        })
        this.value_input.addEventListener("input", (event : Event)=>{
            this._value = parseFloat(this.value_input.value);
        })
        this.value_input.addEventListener("keypress", (event : KeyboardEvent)=>{
            if(event.key === "Enter"){
                this.value_input.blur();
                this.triggerChange();
            }
        })

        this.value_input.addEventListener("blur", (event : Event)=>{
            this.triggerChange();
        })

        this.label_el.addEventListener("mousedown", (event : MouseEvent)=>{
            
            if( event.button === 0)
            {
                this.is_mouse_down = true;
                this.drag_start_pos = event.clientX;
            }else if( event.button === 1)
            {
                this.value_input.value = this.default_value.toString();
                this.value = this.default_value;
            }    
        })

        document.addEventListener("mouseup", (event : MouseEvent)=>{
            this.is_mouse_down = false;
            if( event.button === 0)
            {
                if(this.value_preview !== 0)
                {
                    this.value = this.value_preview;
                    this.value_preview = 0;
                }
            }
        })

        document.addEventListener("mousemove", (event : MouseEvent)=>{
            if(this.is_mouse_down)
            {
                let diff = (event.pageX - this.drag_start_pos);
                let mult = 0.1;
                if( this.ctrl_pressed ) mult *= 0.1;
                else if (this.shift_pressed) mult *= 5.0;
                diff *= mult;
                this.value_input.value = (this.value + diff).toString();
                this.value_preview = (this.value + diff);
            }
        })
    }


    static get observedAttributes(){
        return ['label', 'color', "default_value"];
    }

    triggerChange(){
        let ev = new Event("changed", {
            // bubbles : true,
            // composed : false,
            
        });
        
        this.dispatchEvent(ev);
    }
    set value(val : number)
    {
        this._value = val;
        this.value_input.value = val.toString();
        this.triggerChange();
    }

    get value()
    {
        return this._value;
    }

    set color(clr : string)
    {
        this._color = clr;
    }

    set label(str : string)
    {
        this._label = str;
    }


    attributeChangedCallback(name : string, oldValue : any, newValue : any) {
        switch(name)
        {
            case 'color' :
                // this.color = newValue; 
                // console.log(this.label_el);
                this.label_el.style.backgroundColor = newValue;
                
                
                break;
            case 'label' :
                this.label = newValue; 
                this.label_el.innerHTML = `<span>${newValue}</span>`;
        
                break;                
            case 'default_value' :
                this.default_value = parseFloat(newValue);
                this.value = this.default_value;
                
                break;                
            default : 
                break;
        }
        // your code...
      }

    handleEvent(event : Event)
    {
        console.log("Event on Custom Float Component");
        
    }
}

customElements.define("gui-input-float", GuiInputFloat);