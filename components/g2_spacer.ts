export class GuiSpacer extends HTMLElement {
  template_fragment: DocumentFragment;
  _height: number = 0;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const styles = String.raw`<style>

        div{
            background-color : transparent;
        }
    </style>`;
    const template = String.raw`
            ${styles}
            <div></div>
        `;
    this.template_fragment = document
      .createRange()
      .createContextualFragment(template);
    this.shadowRoot?.appendChild(this.template_fragment.cloneNode(true));
  }

  connectedCallback() {}

  static get observedAttributes() {
    return ["height"];
  }

  get height() {
    let css_height = this.getAttribute("height");
    return parseInt(css_height || "0");
  }
  set height(val: number) {
    // console.log(val);
    // this.height = val;
    (this.shadowRoot?.querySelector("div") as HTMLDivElement).style.height =
      "" + val + "px";
  }
  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    switch (name) {
      case "height":
        this.height = newValue;
        break;
      default:
        break;
    }
  }
}
customElements.define("gui-spacer", GuiSpacer);
