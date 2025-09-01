export function defineComponent(name: string, constructor: any) {
  customElements.get(name) || customElements.define(name, constructor);
}
