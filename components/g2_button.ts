export class GuiButton extends HTMLElement {
  template_fragment: DocumentFragment;
  _label: string = "Button Label";
  callback: Function = () => {};
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const styles = String.raw`<style>

            button{
                padding : 0.5em 1em;
                background-color : darkgreen;
                color : white;
                border : none;
                width : 100%;
                
            }

            button:hover{
                background-color : green;
            }
            button:active{
                background-color : darkgreen;
            }
        </style>`;
    const template = String.raw`
            ${styles}
            <button>${this._label}</button>
        `;
    this.template_fragment = document
      .createRange()
      .createContextualFragment(template);
    this.shadowRoot?.appendChild(this.template_fragment.cloneNode(true));
    this.shadowRoot
      ?.querySelector("button")
      ?.addEventListener("click", () => this.callback());
  }

  connectedCallback() {}

  get label() {
    return this._label;
  }
  set label(str: string) {
    (this.shadowRoot?.querySelector("button") as HTMLButtonElement).innerText =
      str;
  }
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
}
customElements.define("gui-button", GuiButton);
