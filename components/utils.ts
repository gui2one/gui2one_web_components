export function customDefineComponent(name: string, constructor: any) {
  customElements.get(name) || customElements.define(name, constructor);
  customElements.get(name) || window.customElements.define(name, constructor);
}
