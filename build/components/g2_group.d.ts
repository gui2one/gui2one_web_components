export declare class GuiGroup extends HTMLElement {
    template_fragment: DocumentFragment;
    _label: string;
    label_el: HTMLDivElement;
    constructor();
    connectedCallback(): void;
    static get observedAttributes(): string[];
    set label(str: string);
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
}
//# sourceMappingURL=g2_group.d.ts.map