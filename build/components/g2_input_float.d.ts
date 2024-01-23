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
}
//# sourceMappingURL=g2_input_float.d.ts.map