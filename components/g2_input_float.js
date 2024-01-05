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
        this._value = 42.0;
        this.label = "X";
        this.color = "hotpink";
        this.is_mouse_down = false;
        this.is_dragging = false;
        this.styles = String.raw `
            <style>

            :host{
                --padding-top : 0.5em;
                --padding-bottom : 0.5em;
                --padding-left : 0.3em;
                --padding-right : 0.3em;
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
                border-radius : 3px 0 0 3px;
                height : 100%;
                /* border : none; */
                vertical-align : middle;
                padding-top : var(--padding-top);
                padding-bottom : var(--padding-bottom);
                user-select : none;

                cursor : e-resize;
            }
            .value_div{
                padding-left : 0.2em;
                position : relative;
                height : 100%;
                overflow : hidden;
                border-radius : 0 3px 3px 0;
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
                background-color : transparent;

            }

            </style>        
        `;
        const template = String.raw `

            ${this.styles}

            <div class="wrapper">
                <div class="label">${this.label}</div>
                <div class="value_div">
                    <input type=number step="0.1" value=${this.value} />
                </div>
            <div>
        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(this.template_fragment.cloneNode(true));
        this.label_el = this.shadowRoot.querySelector(".label");
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
            }
        });
        this.label_el.addEventListener("mousedown", (event) => {
            if (event.button === 0) {
                this.is_mouse_down = true;
                this.drag_start_pos = event.clientX;
            }
            else if (event.button === 1) {
                this.value_input.value = this.default_value.toString();
                this._value = this.default_value;
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
    set value(val) {
        this._value = val;
        this.value_input.value = val.toString();
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
                this.color = newValue;
                this.label_el.style.backgroundColor = newValue;
                break;
            case 'label':
                this.label = newValue;
                this.label_el.innerText = newValue;
                break;
            case 'default_value':
                this.default_value = parseFloat(newValue);
                break;
            default:
                break;
        }
        // your code...
    }
}
customElements.define("gui-input-float", GuiInputFloat);
