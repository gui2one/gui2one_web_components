export class GuiSpacer extends HTMLElement {
  template_fragment: DocumentFragment;
  height: number = 0;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const styles = String.raw`<style></style>`;
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

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    switch (name) {
      case "height":
        this.height = parseInt(newValue);
        (this.shadowRoot?.querySelector("div") as HTMLDivElement).style.height =
          this.height + "px";
        break;
      default:
        break;
    }
  }
}
customElements.define("gui-spacer", GuiSpacer);
