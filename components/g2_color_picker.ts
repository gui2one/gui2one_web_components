function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0, s = 0, v = max;

    if (delta !== 0) {
        s = delta / max;

        if (max === r) {
            h = (g - b) / delta + (g < b ? 6 : 0);
        } else if (max === g) {
            h = (b - r) / delta + 2;
        } else if (max === b) {
            h = (r - g) / delta + 4;
        }

        h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
}
function hsvToRgb(h, s, v) {
    h /= 360;
    s /= 100;
    v /= 100;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let r, g, b;

    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}


export class GuiColorPicker extends HTMLElement{
    template_fragment : DocumentFragment;
    sample_el : HTMLDivElement;
    dialog_el : HTMLDialogElement;

    _value : number[] = []
    constructor(){
        super();
        this.attachShadow({mode : "open"});
        const styles = String.raw`<style>

            .clr_sample{
                width : 30px;
                height : 100%;
                cursor : pointer;

                /* overflow : visible; */
                margin : 1px;
            }

            .clr_sample:hover{
                outline : 1px solid white !important;
            }

            #clr_dialog{
                z-index : 10;
                position : absolute;
            }

            .bg{
                position : absolute;
                top : 0;
                left : 0;
                width : 100%;
                height : 100%;
                background-color : red;
                z-index : 1;
            }
        </style>`;
        
        const template = String.raw`

            ${styles}
            

            <div class="clr_sample"></div>
            <dialog id="clr_dialog">
                <div class="bg" ></div>
                <form method="dialog">
                <button>OK</button>
                </form>
            </dialog>

        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        this.shadowRoot?.appendChild(this.template_fragment.cloneNode(true));

        this.sample_el = this.shadowRoot?.querySelector(".clr_sample") as HTMLDivElement;
        this.dialog_el = this.shadowRoot?.querySelector("#clr_dialog") as HTMLDialogElement;
        this.sample_el.addEventListener("click", ()=>{
            console.log(this.value);
            
            this.dialog_el.showModal();
        });

        this.dialog_el.addEventListener('click', (event) =>{
            var rect = this.dialog_el.getBoundingClientRect();
            var isInDialog=(rect.top <= event.clientY && event.clientY <= rect.top + rect.height
              && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
            if (!isInDialog) {
                this.dialog_el.close();
            }
        });
    }



    connectedCallback(){
    }


    static get observedAttributes(){
        return [];
    }


    attributeChangedCallback(name : string, oldValue : any, newValue : any) {
    
    }

    get value()
    {
        return this._value;
    }

    set value(values : number[])
    {
        this._value = values;
        this.style.backgroundColor = `rgb(${values[0] * 255},${values[1] * 255},${values[2] * 255})`;
    }
}
customElements.define("gui-color-picker", GuiColorPicker);