export declare class GuiCollapsible extends HTMLElement {
    template_fragment: DocumentFragment;
    closed: boolean;
    _title: string;
    header_el: HTMLDivElement;
    arrow_el: HTMLDivElement;
    content_el: HTMLDivElement;
    title_el: HTMLSpanElement;
    constructor();
    connectedCallback(): void;
    static get observedAttributes(): string[];
    set title(val: string);
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
}
//# sourceMappingURL=g2_collapsible.d.ts.map