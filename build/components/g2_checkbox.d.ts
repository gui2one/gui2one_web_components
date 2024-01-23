export declare class GuiCheckbox extends HTMLElement {
    template_fragment: DocumentFragment;
    _label: string;
    label_el: HTMLLabelElement;
    pretty_el: HTMLDivElement;
    value: boolean;
    constructor();
    connectedCallback(): void;
    static get observedAttributes(): string[];
    set label(str: string);
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
}
//# sourceMappingURL=g2_checkbox.d.ts.map