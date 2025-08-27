export class GuiRow extends HTMLElement {
  template_fragment: DocumentFragment;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const styles = String.raw`<style>

        .wrapper{
            outline : 1px solid rgba(255,255,255,0.1);
            display : flex;
            flex-direction : row;
            flex-wrap : nowrap;
            align-items : center;
            gap : 0.5em;
            width : 100%;
        }

        </style>`;
    const template = String.raw`
            ${styles}
            <div class="wrapper">
                <slot></slot>
            </div>
        `;
    this.template_fragment = document
      .createRange()
      .createContextualFragment(template);
    this.shadowRoot?.appendChild(this.template_fragment.cloneNode(true));
  }

  connectedCallback() {}

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {}
}
customElements.define("gui-row", GuiRow);
