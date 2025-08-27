export class GuiInputRange extends HTMLElement {
  template_fragment: DocumentFragment;
  _label: string = "hey";
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
        </style>`;
    const template = String.raw`
            ${styles}
            <div class="wrapper">
<div class="label" title="${this.label}"><span>${this.label}</span></div>
                <div class="value_div">
                    <input type=range min="0" max="1" step="0.01" value="0.5" />
                    <!-- <div class="number_div" contenteditable> -->
                </div>
            </div>
        `;
    this.template_fragment = document
      .createRange()
      .createContextualFragment(template);
    this.shadowRoot?.appendChild(this.template_fragment.cloneNode(true));
  }

  connectedCallback() {}

  static get observedAttributes() {
    return ["label"];
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    switch (name) {
      case "label":
        this.label = newValue;
        break;
      default:
        break;
    }
  }

  get label() {
    return this._label;
  }
  set label(str: string) {
    this._label = str;
    (this.shadowRoot?.querySelector(".label span") as HTMLElement).textContent =
      str;
  }
}
customElements.define("gui-input-range", GuiInputRange);
