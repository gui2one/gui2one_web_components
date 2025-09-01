import { customDefineComponent } from "./utils";

export class GuiTitle extends HTMLElement {
  title: string = "Hello, World!";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = String.raw`
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
customDefineComponent("gui-title", GuiTitle);
