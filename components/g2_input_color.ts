import { GuiInputFloat } from "./g2_input_float";
import { GuiColorPicker } from "./g2_color_picker";
import { customDefineComponent } from "./utils";
export class GuiInputColor extends HTMLElement {
  template_fragment: DocumentFragment;

  label_el: HTMLDivElement;
  default_scalar: number = 0;
  _label: string = "Color";

  _value: number[] = [0, 0, 0];
  _default_value: number[] = [0, 0, 0];

  picker_el: GuiColorPicker;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const styles = String.raw`
            <style>

                .wrapper{
                    display : grid;
                    grid-template-columns : var(--label-width) 1fr;
                    font-size : 0.9em;
                }

                .label{
                    font-family : sans-serif;
                }

                .floats{
                    /* position : relative; */
                    /* width : auto; */
                }
            </style>
        `;

    const template_str = String.raw`

            ${styles}
            <div class="wrapper">
                <div class="label">${this._label}</div>
                <div class="floats" >
                    <gui-color-picker></gui-color-picker>
                </div>
            </div>
        `;

    this.template_fragment = document
      .createRange()
      .createContextualFragment(template_str);
    this.shadowRoot!.appendChild(this.template_fragment.cloneNode(true));

    this.label_el = this.shadowRoot!.querySelector(".label") as HTMLDivElement;

    this.picker_el = this.shadowRoot!.querySelector(
      "gui-color-picker"
    ) as GuiColorPicker;
    this.picker_el.addEventListener("change", (event: Event) => {
      // console.log(this.picker_el.value);
      this.value = this.picker_el.value;
    });
    Promise.all([customElements.whenDefined("gui-color-picker")]).then(() => {
      this.picker_el.value = this.value;
    });
  }

  connectedCallback() {}

  static get observedAttributes() {
    return ["default_scalar", "label"];
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    switch (name) {
      case "default_scalar":
        this.default_scalar = parseFloat(newValue);
        this.value = [
          this.default_scalar,
          this.default_scalar,
          this.default_scalar,
        ];
        break;
      case "label":
        this.label = newValue;
        this.label_el.innerText = newValue;
        break;
      default:
        break;
    }
  }

  get value(): number[] {
    return this._value;
  }

  set value(val: number[]) {
    this._value = val;
  }

  set default_value(val: number[]) {
    this._default_value = val;
  }

  set label(str: string) {
    this._label = str;
    this.label_el.innerText = str;
  }
}

customDefineComponent("gui-input-color", GuiInputColor);
