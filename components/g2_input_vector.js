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
