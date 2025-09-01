export function defineComponent(name: string, constructor: any) {
  if (!customElements.get(name)) customElements.define(name, constructor);
}
