"use strict";
class GuiInputVector extends HTMLElement {
    constructor() {
        super();
        this._value = [0, 0, 0];
        this.attachShadow({ mode: "open" });
        const styles = String.raw `
            <style>

                .wrapper{
                    margin-top : 3px;
                }
            </style>
        `;
        const template_str = String.raw `

            ${styles}

            <div class="wrapper" style="display : flex; gap:5px;">
                <gui-input-float id="input_x" color="red"   label="x" default_value="1"> </gui-input-float>
                <gui-input-float id="input_y" color="green" label="y" default_value="1"></gui-input-float>
                <gui-input-float id="input_z" color="blue"  label="z" default_value="1"></gui-input-float>
            </div>
        `;
        this.template_fragment = document.createRange().createContextualFragment(template_str);
        this.shadowRoot.appendChild(this.template_fragment.cloneNode(true));
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
    }
    get value() {
        return [this.input_x.value, this.input_y.value, this.input_z.value];
    }
    set value(val) {
        this._value = val;
    }
}
customElements.define("gui-input-vector", GuiInputVector);
