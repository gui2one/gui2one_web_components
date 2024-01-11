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
