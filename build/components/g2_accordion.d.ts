import { GuiCollapsible } from "./g2_collapsible";
export declare class GuiAccordion extends HTMLElement {
    template_fragment: DocumentFragment;
    collapsibles: GuiCollapsible[];
    constructor();
    open(theone: GuiCollapsible): void;
    connectedCallback(): void;
    adoptedCallBack(): void;
    static get observedAttributes(): never[];
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
}
//# sourceMappingURL=g2_accordion.d.ts.map