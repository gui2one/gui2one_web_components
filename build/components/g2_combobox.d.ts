export declare class GuiCombobox extends HTMLElement {
    template_fragment: DocumentFragment;
    _label: string;
    label_el: HTMLLabelElement;
    wrapper: HTMLDivElement;
    _value: string;
    _selectedIndex: number;
    constructor();
    set label(str: string);
    set selectedIndex(index: number);
    get selectedIndex(): number;
    get value(): string;
    set value(str: string);
    connectedCallback(): void;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
}
//# sourceMappingURL=g2_combobox.d.ts.map