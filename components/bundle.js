"use strict";
class GuiInputFloat extends HTMLElement {
    constructor() {
        var _a;
        super();
        this.value_preview = 0;
        this.default_value = 0;
        this._label = '';
        this._color = "";
        this.drag_start_pos = 0;
        this.ctrl_pressed = false;
        this.shift_pressed = false;
        this.attachShadow({ mode: "open" });
        this._value = 0.0;
        this.label = "X";
        this.color = "hotpink";
        this.is_mouse_down = false;
        this.is_dragging = false;
        this.styles = String.raw `
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
                align-items : center;
                width : max-content;
            }

            .label{
                color : white;
                position : relative;
                padding-left : 0.5em;
                padding-right : 0.5em;
                background-color : ${this._color};
                border-radius : 2px 0 0 2px;
                height : 100%;
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
                height : 100%;
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
                height: 100%;
                background-color : transparent;
            }

            </style>        
        `;
        const template = String.raw `

            ${this.styles}

            <div class="wrapper">
                <div class="label"><span>${this.label}<span></div>
                <div class="value_div">
                    <input type=number step="0.1" value=${this.value} />
                </div>
            <div>
        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(this.template_fragment.cloneNode(true));
        this.label_el = this.shadowRoot.querySelector(".label");
        let label_span = this.label_el.querySelector("span");
        // label_span.style.opacity = "0.8";   
        this.value_input = this.shadowRoot.querySelector("input");
    }
    connectedCallback() {
        document.addEventListener("keydown", (event) => {
            if (event.ctrlKey) {
                this.ctrl_pressed = true;
            }
            if (event.shiftKey) {
                this.shift_pressed = true;
            }
        });
        document.addEventListener("keyup", (event) => {
            if (event.key == "Control") {
                this.ctrl_pressed = false;
                // console.log("ctrl_pressed ", this.ctrl_pressed);
            }
            if (event.key == "Shift") {
                this.shift_pressed = false;
                // console.log("shift_pressed ", this.shift_pressed);
            }
        });
        this.value_input.addEventListener("input", (event) => {
            this._value = parseFloat(this.value_input.value);
        });
        this.value_input.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                this.value_input.blur();
                this.triggerChange();
            }
        });
        this.value_input.addEventListener("blur", (event) => {
            this.triggerChange();
        });
        this.label_el.addEventListener("mousedown", (event) => {
            if (event.button === 0) {
                this.is_mouse_down = true;
                this.drag_start_pos = event.clientX;
            }
            else if (event.button === 1) {
                this.value_input.value = this.default_value.toString();
                this.value = this.default_value;
            }
        });
        document.addEventListener("mouseup", (event) => {
            this.is_mouse_down = false;
            if (event.button === 0) {
                if (this.value_preview !== 0) {
                    this.value = this.value_preview;
                    this.value_preview = 0;
                }
            }
        });
        document.addEventListener("mousemove", (event) => {
            if (this.is_mouse_down) {
                let diff = (event.pageX - this.drag_start_pos);
                let mult = 0.1;
                if (this.ctrl_pressed)
                    mult *= 0.1;
                else if (this.shift_pressed)
                    mult *= 5.0;
                diff *= mult;
                this.value_input.value = (this.value + diff).toString();
                this.value_preview = (this.value + diff);
            }
        });
    }
    static get observedAttributes() {
        return ['label', 'color', "default_value"];
    }
    triggerChange() {
        let ev = new Event("changed", {
        // bubbles : true,
        // composed : false,
        });
        this.dispatchEvent(ev);
    }
    set value(val) {
        this._value = val;
        this.value_input.value = val.toString();
        this.triggerChange();
    }
    get value() {
        return this._value;
    }
    set color(clr) {
        this._color = clr;
    }
    set label(str) {
        this._label = str;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'color':
                // this.color = newValue; 
                // console.log(this.label_el);
                this.label_el.style.backgroundColor = newValue;
                break;
            case 'label':
                this.label = newValue;
                this.label_el.innerHTML = `<span>${newValue}</span>`;
                break;
            case 'default_value':
                this.default_value = parseFloat(newValue);
                this.value = this.default_value;
                break;
            default:
                break;
        }
        // your code...
    }
    handleEvent(event) {
        console.log("Event on Custom Float Component");
    }
}
customElements.define("gui-input-float", GuiInputFloat);
"use strict";
class GuiInputVector extends HTMLElement {
    constructor() {
        super();
        this.default_scalar = 0;
        this.label = "Vector";
        this._value = [0, 0, 0];
        this._default_value = [0, 0, 0];
        this.attachShadow({ mode: "open" });
        const styles = String.raw `
            <style>

                .wrapper{
                    margin-top : 3px;
                }

                .label{
                    font-family : sans-serif;
                }
            </style>
        `;
        const template_str = String.raw `

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
        this.shadowRoot.appendChild(this.template_fragment.cloneNode(true));
        this.label_el = this.shadowRoot.querySelector(".label");
        this.input_x = this.shadowRoot.querySelector("#input_x");
        this.input_y = this.shadowRoot.querySelector("#input_y");
        this.input_z = this.shadowRoot.querySelector("#input_z");
        this.input_x.addEventListener("changed", (event) => {
            let val = event.target.value;
            this.value[0] = val;
            this.dispatchEvent(new Event("changed"));
        });
        this.input_y.addEventListener("changed", (event) => {
            let val = event.target.value;
            this.value[1] = val;
            this.dispatchEvent(new Event("changed"));
        });
        this.input_z.addEventListener("changed", (event) => {
            let val = event.target.value;
            this.value[2] = val;
            this.dispatchEvent(new Event("changed"));
        });
    }
    connectedCallback() {
        this.input_x.default_value = this.default_scalar;
        this.input_y.default_value = this.default_scalar;
        this.input_z.default_value = this.default_scalar;
    }
    static get observedAttributes() {
        return ["default_scalar", "label"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'default_scalar':
                this.default_scalar = parseFloat(newValue);
                this.input_x.value = this.default_scalar;
                this.input_y.value = this.default_scalar;
                this.input_z.value = this.default_scalar;
                break;
            case 'label':
                this.label = newValue;
                this.label_el.innerText = newValue;
                break;
            default:
                break;
        }
    }
    get value() {
        return [this.input_x.value, this.input_y.value, this.input_z.value];
    }
    set value(val) {
        this._value = val;
    }
}
customElements.define("gui-input-vector", GuiInputVector);
"use strict";
class GuiCollaspible extends HTMLElement {
    constructor() {
        var _a;
        super();
        this._title = "collaspible";
        this.attachShadow({ mode: "open" });
        const styles = String.raw `
        <style>

            .header{
                cursor : pointer;
                background-color : #222;
                margin : 0;
                margin-top : 0.25em;
                padding-left : 0.5em; 
            }

            .header:hover{
                filter: brightness(1.2);
            }

            .header.closed{
                font-weight : bold;
            }
            .content{
                padding : 0.5em;
                padding-left : 0.5em;
                padding-right : 0.5em;
                overflow-y : hidden;
                height : auto;
                transition : all 0.1s;
            }
            .content.closed{
                height : 0;
                padding-top : 0;
                padding-bottom : 0;
            }
            
        
        </style>`;
        const template = String.raw `
            
            ${styles}

            <div class="wrapper">
                <div class="header"><span>${this.title}</span></div>
                <div class="content">
                    <slot></slot>
                </div>
            </div>
        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(this.template_fragment.cloneNode(true));
        this.header_el = this.shadowRoot.querySelector(".header");
        this.content_el = this.shadowRoot.querySelector(".content");
    }
    connectedCallback() {
        this.header_el.addEventListener("click", (event) => {
            this.header_el.classList.toggle("closed");
            this.content_el.classList.toggle("closed");
        });
    }
    static get observedAttributes() {
        return ['title'];
    }
    set title(val) {
        this._title = val;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        var _a;
        switch (name) {
            case 'title':
                this.title = newValue;
                let span = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(".header>span");
                span.innerText = newValue;
                break;
            default: break;
        }
    }
}
customElements.define("gui-collapsible", GuiCollaspible);
"use strict";
class GuiPanel extends HTMLElement {
    constructor() {
        var _a, _b, _c, _d;
        super();
        this.attachShadow({ mode: "open" });
        const styles = String.raw `
            <style>
                #wrapper{
                    position : absolute;
                    top : 0px;
                    right : 0px;
                    padding : 0.5em;
                    /* overflow-y : auto; */
                    /* outline : 1px solid red; */
                    box-shadow : -2px 2px 8px #0001;
                    border-radius : 0 0 0 3px;
                    max-height : 100vh;
                    color : white;
                    background-color : #111;

                    transition : transform;
                    transition-duration : 0.2s;

                    cursor: default;
                    user-select : none;
                }

                #wrapper.hidden{
                    transform : translate3d(100%,0,0 );
                }

                .close_btn{
                    cursor : pointer;
                }

                .close_btn:hover{
                    opacity : 0.5;
                }

                .open_btn{
                    position : absolute;
                    width : 25px;
                    height : 25px;
                    background-color : transparent; 
                    top : 0;
                    left : 0;  
                    z-index : 2;
                    margin-left : -25px;
                }
            </style>
        `;
        const template = String.raw `
            
            ${styles}
            <div id="wrapper">
                <div class="open_btn"></div>
                <div class="close_btn">X</div>
                <slot></slot>
            </div>
        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(this.template_fragment.cloneNode(true));
        let close_btn = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector(".close_btn");
        let open_btn = (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector(".open_btn");
        let wrapper = (_d = this.shadowRoot) === null || _d === void 0 ? void 0 : _d.querySelector("#wrapper");
        close_btn === null || close_btn === void 0 ? void 0 : close_btn.addEventListener("click", (event) => {
            wrapper.classList.add("hidden");
        });
        open_btn === null || open_btn === void 0 ? void 0 : open_btn.addEventListener("click", (event) => {
            wrapper.classList.remove("hidden");
        });
        document.addEventListener("keypress", (event) => {
            if (event.key === "h") {
                wrapper.classList.toggle("hidden");
            }
        });
    }
}
customElements.define("gui-panel", GuiPanel);
"use strict";
class GuiTitle extends HTMLElement {
    constructor() {
        super();
        this.title = 'Hello, World!';
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.render();
    }
    render() {
        this.shadowRoot.innerHTML = String.raw `
      <style>
        :host {
          display: block;
        }

      </style>
      <h2><slot></slot></h2>
    `;
    }
}
// Register the custom element
customElements.define('gui-title', GuiTitle);
