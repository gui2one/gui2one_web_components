
// g2_accordion.js
export class GuiAccordion extends HTMLElement {
    constructor() {
        var _a;
        super();
        this.collapsibles = [];
        this.attachShadow({ mode: "open" });
        const styles = String.raw `<style>

        </style>`;
        const template = String.raw `
            ${styles}
            <slot></slot>
        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(this.template_fragment.cloneNode(true));
    }
    open(theone) {
        this.collapsibles.forEach((item, index) => {
            // console.log(item, index);
            if (item !== theone) {
                item.setAttribute("closed", "true");
            }
        });
    }
    connectedCallback() {
        const slot = this.shadowRoot.querySelector('slot');
        this.collapsibles = [];
        slot === null || slot === void 0 ? void 0 : slot.addEventListener("slotchange", () => {
            for (let node of slot === null || slot === void 0 ? void 0 : slot.assignedNodes()) {
                if (node.nodeName === 'GUI-COLLAPSIBLE') {
                    let coll = node;
                    coll.addEventListener("open", (ev) => {
                        this.open(ev.target);
                    });
                    // console.log(coll);
                    this.collapsibles.push(coll);
                }
            }
        });
    }
    adoptedCallBack() {
        console.log("adopted");
    }
    static get observedAttributes() {
        return [];
    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
}
customElements.define("gui-accordion", GuiAccordion);

// g2_checkbox.js
export class GuiCheckbox extends HTMLElement {
    constructor() {
        var _a;
        super();
        this._label = "toggle";
        this.value = true;
        this.attachShadow({ mode: "open" });
        const styles = String.raw `<style>
            :host{
                --padding-top : 0.3em;
                --padding-bottom : 0.3em;
                --padding-left : 0.15em;
                --padding-right : 0.15em;
            }
            #wrapper{
                display : flex;
                align-items : center;
                /* justify-content : center; */
                margin-bottom : 0.5em;
            }

            label{
                display : flex;
                align-items : center;
                justify-content : center;
                color : white;
                background-color : grey;
                padding-left : var(--padding-left);
                padding-top : var(--padding-top);
                padding-bottom : var(--padding-bottom);

                border-radius : 3px 0 0 3px;
                line-height : 1em;
                width : 50%;
                cursor : pointer;
            }

            label.checked{
                background-color : green;
            }
            input[type=checkbox]
            {
                visibility : hidden;
            }
            .pretty{
                position : relative;
                height : 1em;
                width : 50px;
                background-color : black;
                padding-top : var(--padding-top);
                padding-bottom : var(--padding-bottom);

                border-radius : 0px 3px 3px 0px;
            }

            
            .pretty.checked::after{
                content : "";
                position : absolute;
                left : 0;
                top : 0;
                width : 100%;
                height : 10px;
                /* background-color : red; */
                border-radius : 0px 3px 3px 0px;
                border : 6px solid white;
                border-top : none;
                border-right : none;
                transform : rotate(-45deg) scale(0.6);
            }
        </style>`;
        const template = String.raw `
            ${styles}

            <div id="wrapper">
            <label for="checkbox" class=" ${this.value ? 'checked' : ''}">${this._label}</label>
            <div class="pretty ${this.value ? 'checked' : ''}">
            </div>
            <input id="checkbox" type="checkbox" ${this.value ? 'checked' : ''} />
            </div>
        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(this.template_fragment.cloneNode(true));
        this.label_el = this.shadowRoot.querySelector("label");
        this.pretty_el = this.shadowRoot.querySelector(".pretty");
        let checkbox = this.shadowRoot.querySelector("#checkbox");
        checkbox.addEventListener("change", (event) => {
            let checkbox = event.target;
            // console.log(event);
            this.value = checkbox.toggleAttribute("checked");
            this.pretty_el.classList.toggle("checked");
            this.label_el.classList.toggle("checked");
            let ev = new Event("change");
            this.dispatchEvent(ev);
        });
    }
    connectedCallback() {
    }
    static get observedAttributes() {
        return ["label"];
    }
    set label(str) {
        if (this.label_el) {
            this.label_el.innerHTML = `<span>${str}</span>`;
        }
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'value':
                this.value = newValue;
                break;
            case 'label':
                this.label = newValue;
                // this.label_el.innerText = newValue;
                break;
            default: break;
        }
    }
}
customElements.define("gui-checkbox", GuiCheckbox);

// g2_collapsible.js
export class GuiCollaspible extends HTMLElement {
    constructor() {
        var _a;
        super();
        this.closed = true;
        this._title = "collaspible";
        this.attachShadow({ mode: "open" });
        const styles = String.raw `
        <style>

            .header{
                display : flex;
                align-items : center;
                cursor : pointer;
                background-color : #222;
                margin : 0;
                height : 2em;
                margin-top : 0.25em;
                padding-left : 0.5em; 
                font-weight : bolder;
            }

            .header:hover{
                filter: brightness(1.2);
            }

            .header.closed{
                font-weight : normal;
            }
            .content{
                padding : 0.5em;
                padding-left : 0.5em;
                padding-right : 0.5em;
                overflow-y : hidden;
                /* height : auto; */
                opacity : 1;
                transform-origin : center top;
                transform : scale3d(1.0, 1.0, 1.0);
                transition : all .2s;
            }
            .content.closed{
                /* transform : scale3d(1.0, 0.0, 1.0); */
                height : 0;
                padding-top : 0;
                padding-bottom : 0;
                opacity : 0;
            }
            
        
        </style>`;
        this.closed = true;
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
        if (this.closed) {
            this.header_el.setAttribute("closed", "true");
            this.content_el.setAttribute("closed", "true");
            this.header_el.classList.add("closed");
            this.content_el.classList.add("closed");
        }
        this.header_el.addEventListener("click", (event) => {
            this.header_el.classList.toggle("closed");
            this.content_el.classList.toggle("closed");
            if (this.header_el.classList.contains("closed")) {
                this.closed = true;
            }
            else {
                this.closed = false;
                let ev = new Event("open");
                this.dispatchEvent(ev);
            }
        });
    }
    static get observedAttributes() {
        return ['title', 'closed'];
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
            case 'closed':
                if (newValue === "")
                    this.closed = true;
                else if (newValue === "true")
                    this.closed = true;
                else if (newValue === "false")
                    this.closed = false;
                if (this.closed) {
                    this.header_el.classList.add("closed");
                    this.content_el.classList.add("closed");
                }
                else {
                    this.header_el.classList.remove("closed");
                    this.content_el.classList.remove("closed");
                }
                break;
            default: break;
        }
    }
}
customElements.define("gui-collapsible", GuiCollaspible);

// g2_combobox.js
"use strict";
class GuiCombobox extends HTMLElement {
    constructor() {
        super();
        this._label = "Label";
        this._value = "";
        this._selectedIndex = 0;
        this.attachShadow({ mode: "open" });
        const styles = String.raw `<style>
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
        const template = String.raw `
            ${styles}

            <div class="wrapper">
            <label for="list">${this._label}</label>
            <slot></slot>

            </div>

            
        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        this.shadowRoot.appendChild(this.template_fragment.cloneNode(true));
        this.wrapper = this.shadowRoot.querySelector(".wrapper");
        this.label_el = this.shadowRoot.querySelector("label");
        // let slot = this.shadowRoot!.querySelector("slot");
        // console.log(slot);
    }
    set label(str) {
        if (this.label_el) {
            this._label = str;
            this.label_el.innerText = str;
        }
    }
    set selectedIndex(index) {
        this._selectedIndex = index;
    }
    get selectedIndex() {
        return this._selectedIndex;
    }
    get value() {
        return this._value;
    }
    set value(str) {
        this._value = str;
    }
    connectedCallback() {
        var _a;
        const slot = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('slot');
        let option_nodes = [];
        slot === null || slot === void 0 ? void 0 : slot.addEventListener("slotchange", () => {
            for (let node of slot === null || slot === void 0 ? void 0 : slot.assignedNodes()) {
                if (node.nodeName === 'OPTION') {
                    let coll = node;
                    option_nodes.push(coll);
                    this.removeChild(coll);
                }
            }
            let old_select = this.shadowRoot.querySelector(".wrapper>select");
            if (old_select !== null) {
                console.log("removing old ", old_select);
                this.wrapper.removeChild(old_select);
            }
            let select = document.createElement("select");
            select.id = "list";
            select.addEventListener("change", (event) => {
                let sel = event.target;
                // console.log(sel.selectedIndex);
                this.value = sel.value;
                this.selectedIndex = sel.selectedIndex;
                let ev = new Event("change", {});
                //  = sel.selectedIndex;
                this.dispatchEvent(ev);
            });
            for (let option of option_nodes) {
                let opt = document.createElement("option");
                opt.innerText = option.value;
                // opt.innerText = option.value;
                select.appendChild(opt);
            }
            this.wrapper.appendChild(select);
        });
    }
    static get observedAttributes() {
        return ["label"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'label':
                if (this.label_el) {
                    this.label_el.innerText = newValue;
                }
            default: break;
        }
    }
}
customElements.define("gui-combobox", GuiCombobox);

// g2_input_float.js
export class GuiInputFloat extends HTMLElement {
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
        this._label = "wtf ?";
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
                background-color : #eee;
                padding-top : var(--padding-top);
                padding-bottom : var(--padding-bottom);
                padding-left : var(--padding-left);
                
            }

            input{
                color : #222;
                font-weight : bold;
                height : calc(100% - 2px );
                width : 8ch;
                border : none;
                height: max-content;
                background-color : transparent;
            }

            </style>        
        `;
        const template = String.raw `

            ${this.styles}

            <div class="wrapper" oncontextmenu="return false;">
                <div class="label"><span>${this._label}<span></div>
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
            else if (event.button === 2) {
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
        let ev = new Event("change", {
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
        if (this.label_el) {
            this.label_el.innerHTML = `<span>${str}</span>`;
        }
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
                // this.label_el.innerHTML = `<span>${newValue}</span>`;
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

// g2_input_vector.js
export class GuiInputVector extends HTMLElement {
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
                    font-size : 0.9em;
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
        this.input_x.addEventListener("change", (event) => {
            let val = event.target.value;
            this.value[0] = val;
            this.dispatchEvent(new Event("change"));
        });
        this.input_y.addEventListener("change", (event) => {
            let val = event.target.value;
            this.value[1] = val;
            this.dispatchEvent(new Event("change"));
        });
        this.input_z.addEventListener("change", (event) => {
            let val = event.target.value;
            this.value[2] = val;
            this.dispatchEvent(new Event("change"));
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

// g2_panel.js
export class GuiPanel extends HTMLElement {
    constructor() {
        var _a, _b, _c, _d;
        super();
        this.attachShadow({ mode: "open" });
        const styles = String.raw `
            <style>
                .panel{
                    --scrollbar-width : 8px;
                    --scrollbar-track-color : darkgray;
                    --scrollbar-thumb-color : gray;
                }
                
                        /* For WebKit browsers (Chrome, Safari) */
                        ::-webkit-scrollbar {
                            width: var(--scrollbar-width);
                        }

                        ::-webkit-scrollbar-thumb {
                            background-color: var(--scrollbar-thumb-color);
                            border-radius: 6px;
                        }

                        ::-webkit-scrollbar-track {
                            background-color: var(--scrollbar-track-color);
                        }

                        /* For Firefox */
                        * {
                            scrollbar-color: var(--scrollbar-thumb-color) var(--scrollbar-track-color);
                        }

                        *::-webkit-scrollbar {
                            width: var(--scrollbar-width);
                        }

                        *::-webkit-scrollbar-thumb {
                            background-color: var(--scrollbar-thumb-color);
                            border-radius: 6px;
                        }

                        *::-webkit-scrollbar-track {
                            background-color: var(--scrollbar-track-color);
                        }                
                #wrapper{
                    position : fixed;
                    top : 0px;
                    right : 0px;
                    padding : 0.5em;
                    padding-bottom : 0;
                    padding-top : 0;

                    box-shadow : -2px 2px 8px #0001;
                    border-radius : 0 0 0 3px;
                    height : 100%;
                    max-height : 100%;
                    color : white;
                    background-color : #111;

                    transition : transform;
                    transition-duration : 0.1s;

                    cursor: default;
                    user-select : none;
                }

                #wrapper.hidden{
                    transform : translate3d(100%,0,0 );
                }

                .panel{
                    position : relative;
                    overflow-y : scroll;
                    height : calc(100% - 50px);
                    width : 100%;
                }
                .panel:after{
                    content : " ";
                    position : absolute;
                    width : 100%;
                    height : 30px;
                }

                .close_btn{
                    position : relative;
                    top : 0;
                    cursor : pointer;
                    height : calc(50px);
                    margin-top : 2px;
                    margin-left : 0px;
                    opacity : 0.5;
                    /* outline : 1px solid white; */
                    width : 100%;
                }

                .close_btn:hover{
                    opacity : 0.25;
                }

                .close_btn::before{
                    content : '';
                    position : absolute;
                    top : 0; 
                    left : 0;
                    width : 4px;
                    height : 100%;
                    border-radius : 5px;
                    background-color : #eee;
                    transform-origin : 50% 50%;
                    transform :  translateX(20px) rotate(45deg);
                }
                .close_btn::after{
                    content : '';
                    position : absolute;
                    top : 0; 
                    left : 0;
                    width : 4px;
                    height : 100%;
                    border-radius : 5px;
                    background-color : #eee;
                    transform-origin : 50% 50%;
                    transform : translateX(20px) rotate(-45deg);
                }

                .open_btn{
                    position : absolute;
                    width : 25px;
                    height : 25px;
                    background-color : red; 
                    top : 0;
                    left : 0;  
                    z-index : 2;
                    margin-left : -25px;
                }
            </style>
        `;
        const template = String.raw `
            
            ${styles}
            <!-- <div id="wrapper" oncontextmenu="return false;"> -->
            <div id="wrapper" >
                <div class="open_btn"></div>
                <div class="close_btn"></div>
                <div class="panel">
                    <slot></slot>
                </div>
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

// g2_title.js
export class GuiTitle extends HTMLElement {
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