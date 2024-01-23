import { GuiInputFloat } from "./g2_input_float";
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
    updateSample(): void;
    clampValues(): void;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    get value(): number[];
    set value(val: number[]);
    set default_value(val: number[]);
    set label(str: string);
}
//# sourceMappingURL=g2_input_color.d.ts.map