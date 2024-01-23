
// g2_accordion.d.ts
// import { GuiCollapsible } from "./g2_collapsible";
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
// g2_checkbox.d.ts
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
// g2_collapsible.d.ts
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
// g2_combobox.d.ts
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
// g2_group.d.ts
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
// g2_input_color.d.ts
// import { GuiInputFloat } from "./g2_input_float";
export declare class GuiInputColor extends HTMLElement {
    template_fragment: DocumentFragment;
    label_el: HTMLDivElement;
    input_x: GuiInputFloat;
    input_y: GuiInputFloat;
    input_z: GuiInputFloat;
    default_scalar: number;
    _label: string;
    private _value;
    private _default_value;
    sample_el: HTMLDivElement;
    constructor();
    connectedCallback(): void;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    get value(): number[];
    set value(val: number[]);
    set default_value(val: number[]);
    set label(str: string);
}
//# sourceMappingURL=g2_input_color.d.ts.map
// g2_input_float.d.ts
export declare class GuiInputFloat extends HTMLElement {
    private _value;
    value_preview: number;
    value_offset: number;
    _default_value: number;
    old_value: number;
    new_value: number;
    _label: string;
    label_el: HTMLDivElement;
    _color: string;
    styles: string;
    value_input: HTMLInputElement;
    template_fragment: DocumentFragment;
    is_mouse_down: boolean;
    is_dragging: boolean;
    drag_start_pos: number;
    ctrl_pressed: boolean;
    shift_pressed: boolean;
    constructor();
    connectedCallback(): void;
    static get observedAttributes(): string[];
    triggerChange(): void;
    set value(val: number);
    get value(): number;
    set default_value(val: number);
    set color(clr: string);
    set label(str: string);
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    handleEvent(event: Event): void;
}
//# sourceMappingURL=g2_input_float.d.ts.map
// g2_input_vector.d.ts
// import { GuiInputFloat } from "./g2_input_float";
export declare class GuiInputVector extends HTMLElement {
    template_fragment: DocumentFragment;
    label_el: HTMLDivElement;
    input_x: GuiInputFloat;
    input_y: GuiInputFloat;
    input_z: GuiInputFloat;
    default_scalar: number;
    _label: string;
    private _value;
    private _default_value;
    constructor();
    connectedCallback(): void;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    get value(): number[];
    set value(val: number[]);
    set default_value(val: number[]);
    set label(str: string);
}
//# sourceMappingURL=g2_input_vector.d.ts.map
// g2_panel.d.ts
export declare class GuiPanel extends HTMLElement {
    template_fragment: DocumentFragment;
    constructor();
}
//# sourceMappingURL=g2_panel.d.ts.map
// g2_separator.d.ts
export declare class GuiSeparator extends HTMLElement {
    template_fragment: DocumentFragment;
    constructor();
    connectedCallback(): void;
    static get observedAttributes(): never[];
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
}
//# sourceMappingURL=g2_separator.d.ts.map
// g2_title.d.ts
export declare class GuiTitle extends HTMLElement {
    title: string;
    constructor();
    connectedCallback(): void;
    render(): void;
}
//# sourceMappingURL=g2_title.d.ts.map