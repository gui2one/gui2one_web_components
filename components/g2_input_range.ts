import { defineComponent } from "./utils";

export class GuiInputRange extends HTMLElement {
  template_fragment: DocumentFragment;
  _label: string = "hey";
  input_el: HTMLInputElement;
  txt_div: HTMLDivElement;
  on_change: Function = () => {};
  on_click: Function = () => {};

  _value: number = 42;
  _min: number = 0.0;
  _max: number = 1.0;
  _step: number = 0.01;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const styles = String.raw`<style>

            :host{
                width : 100%;
            }
            .wrapper{
                position : relative;
                display : grid;
                grid-template-columns : var(--label-width) 1fr;
                align-items: center;
                justify-items: stretch;
                width : 100%;
                font-size : 0.9rem;
                flex : 1.0;
            }       
            
            input[type=range]{
                width : 100%;
                margin : 0.8em 0;
                padding : 0;
            }

            .value_div{
                display : flex;
                align-items: center;
                justify-content: center;

                
            }

            .text_value{
              width : 50px;
              text-align : center;
            }
        </style>`;
    const template = String.raw`
            ${styles}
            <div class="wrapper">
<div class="label" title="${this.label}"><span>${this.label}</span></div>
                <div class="value_div">
                    <input type=range min="${this._min}" max="${this._max}" step="${this._step}" value="${this._value}" /><div class="text_value">${this._value}</div>
                </div>
            </div>
        `;
    this.template_fragment = document
      .createRange()
      .createContextualFragment(template);
    this.shadowRoot!.appendChild(this.template_fragment.cloneNode(true));
    this.input_el = this.shadowRoot!.querySelector("input") as HTMLInputElement;
    this.txt_div = this.shadowRoot!.querySelector(
      ".text_value"
    ) as HTMLDivElement;
  }

  connectedCallback() {
    this.input_el.onclick = (event) => {
      this.on_click(event);
    };
    this.input_el.oninput = (event) => {
      this.on_change(event);
      this._value = parseFloat(this.input_el.value);
      this.txt_div.textContent = "" + this._value;
    };
  }

  static get observedAttributes() {
    return ["label", "min", "max", "step", "value"];
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    switch (name) {
      case "label":
        this._label = newValue;
        break;
      case "min":
        this._min = parseFloat(newValue);
        this.input_el.setAttribute("min", "" + newValue);
        break;
      case "max":
        this._max = parseFloat(newValue);
        this.input_el.setAttribute("max", "" + newValue);
        break;
      case "step":
        this._step = parseFloat(newValue);
        this.input_el.setAttribute("step", "" + newValue);
        break;
      case "value":
        this._value = parseFloat(newValue);
        this.input_el.setAttribute("value", newValue);
        this.txt_div.textContent = newValue;
        this.input_el.value = newValue;
        break;
      default:
        break;
    }
  }

  get min() {
    return this._min;
  }
  get max() {
    return this._max;
  }

  get step() {
    return this._step;
  }
  get value() {
    return this._value;
  }
  get label() {
    return this._label;
  }
  triggerChange() {
    let ev = new Event("change", {
      // bubbles : true,
      // composed : false,
    });

    this.dispatchEvent(ev);
  }
  set min(val: number) {
    this._min = val;
    this.input_el.min = "" + val;
  }
  set max(val: number) {
    this._max = val;
    this.input_el.max = "" + val;
  }
  set step(val: number) {
    this._step = val;
    this.input_el.step = "" + val;
  }
  set value(val: number) {
    this._value = val;
    this.input_el.setAttribute("value", "" + val);
    this.txt_div.textContent = "" + val;
    this.triggerChange();
  }

  set label(str: string) {
    this._label = str;
    (this.shadowRoot?.querySelector(".label span") as HTMLElement).textContent =
      str;
  }
}
defineComponent("gui-input-range", GuiInputRange);
