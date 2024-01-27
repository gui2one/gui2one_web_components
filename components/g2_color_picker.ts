function rgbToHsv(r, g, b) {

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

    return { r, g, b };
}


export class GuiColorPicker extends HTMLElement{
    template_fragment : DocumentFragment;
    sample_el : HTMLDivElement;
    dialog_el : HTMLDialogElement;

    _value : number[] = []

    _hsv_values : number[] = [0,0,0];
    hsv_ranges : HTMLDivElement;
    rgb_ranges : HTMLDivElement;

    hue_range : HTMLInputElement;
    sat_range : HTMLInputElement;
    val_range : HTMLInputElement;

    red_range : HTMLInputElement;
    green_range : HTMLInputElement;
    blue_range : HTMLInputElement;

    mode_btn : HTMLButtonElement;
    constructor(){
        super();
        this.attachShadow({mode : "open"});
        const styles = String.raw`<style>

            :host{
                --track-height : 5px;
                --thumb-size : 20px;
            }
            .clr_sample{
                position : relative;
                width : calc(100% - 2px);
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
                padding : 2.5em;
                border : none;
                border-radius : var(--border-radius,5px);
            }

            input[type="range"]
            {
                display : block;
                width : 250px;
            }

            .hidden{
                display : none;
            }

            /** Cross browser style */
/* Reset default styles */
input[type="range"] {
  -webkit-appearance: none;
  -moz-apperance: none;
  appearance: none;
  margin: 10px 0;
  /* width: 100%; */
}

/* Webkit (Chrome, Safari, Opera) */
input[type="range"]::-webkit-slider-runnable-track {
  height: var(--track-height);
  background: #ddd;
  border: 1px solid #ccc;
  border-radius: var(--border-radius, 2px);
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: var(--thumb-size);
  height: var(--thumb-size);
  background: #3498db;
  /* border: 1px solid #2980b9; */
  border-radius: 50%;
  margin-top: calc(var(--thumb-size) /2.0 * -1 + (var(--track-height) / 2.0) - 1px);
}

/* Firefox */
input[type="range"]::-moz-range-track {
  height: var(--track-height);
  background: #ddd;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #3498db;
  border: 1px solid #2980b9;
  border-radius: 50%;
}

/* Edge and IE */
input[type="range"]::-ms-track {
  height: 8px;
  background: #ddd;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input[type="range"]::-ms-thumb {
  width: 20px;
  height: 20px;
  background: #3498db;
  border: 1px solid #2980b9;
  border-radius: 50%;
}

/* General styling */
input[type="range"]:focus {
  outline: none;
}

input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #ccc;
}

input[type="range"]:focus::-moz-range-track {
  background: #ccc;
}

input[type="range"]:focus::-ms-track {
  background: #ccc;
}
        </style>`;
        
        const template = String.raw`

            ${styles}
            

            <div class="clr_sample"></div>
            <dialog id="clr_dialog">
                <!-- <div class="bg" ></div> -->

                <div id="hsv_ranges">
                    <label for="hue_range" >Hue<input type="range" id="hue_range" step="0.001" max="360"/></label>
                    <label for="sat_range" >Sat<input type="range" id="sat_range"  step="0.001"  max ="100"/></label>
                    <label for="val_range" >Value<input type="range" id="val_range"  step="0.001" max="100"/></label>
                </div>
                <div id="rgb_ranges" class="hidden">
                    <label for="red_range" >R<input type="range" id="red_range" step="0.001" max="1.0"/></label>
                    <label for="green_range" >G<input type="range" id="green_range"  step="0.001"  max ="1.0"/></label>
                    <label for="blue_range" >B<input type="range" id="blue_range"  step="0.001" max="1.0"/></label>
                </div>
                <button id="mode_btn">Mode</button>
                <form method="dialog">
                    <button>OK</button>
                </form>
            </dialog>

        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        this.shadowRoot?.appendChild(this.template_fragment.cloneNode(true));

        this.hsv_ranges = this.shadowRoot?.querySelector("#hsv_ranges") as HTMLDivElement;
        
        this.hue_range = this.shadowRoot?.querySelector("#hue_range") as HTMLInputElement;
        this.sat_range = this.shadowRoot?.querySelector("#sat_range") as HTMLInputElement;
        this.val_range = this.shadowRoot?.querySelector("#val_range") as HTMLInputElement;
        
        this.hue_range.addEventListener("input", (event : Event)=>{
            let rgb = hsvToRgb(parseFloat(this.hue_range.value), parseFloat(this.sat_range.value), parseFloat(this.val_range.value))
            this.value = [rgb.r, rgb.g, rgb.b];
        });
        this.sat_range.addEventListener("input", (event : Event)=>{
            let rgb = hsvToRgb(parseFloat(this.hue_range.value), parseFloat(this.sat_range.value), parseFloat(this.val_range.value))
            this.value = [rgb.r, rgb.g, rgb.b];
        });
        this.val_range.addEventListener("input", (event : Event)=>{
            let rgb = hsvToRgb(parseFloat(this.hue_range.value), parseFloat(this.sat_range.value), parseFloat(this.val_range.value))
            this.value = [rgb.r, rgb.g, rgb.b];
        }); 

        this.rgb_ranges = this.shadowRoot?.querySelector("#rgb_ranges") as HTMLDivElement;
        
        this.red_range = this.shadowRoot?.querySelector("#red_range") as HTMLInputElement;
        this.green_range = this.shadowRoot?.querySelector("#green_range") as HTMLInputElement;
        this.blue_range = this.shadowRoot?.querySelector("#blue_range") as HTMLInputElement;

        this.red_range.addEventListener("input", (event : Event)=>{
            let r = parseFloat(this.red_range.value);
            let g = parseFloat(this.green_range.value);
            let b = parseFloat(this.blue_range.value);
            this.value = [r, g, b];
        });
        this.green_range.addEventListener("input", (event : Event)=>{
            let r = parseFloat(this.red_range.value);
            let g = parseFloat(this.green_range.value);
            let b = parseFloat(this.blue_range.value);
            this.value = [r, g, b];
        });
        this.blue_range.addEventListener("input", (event : Event)=>{
            let r = parseFloat(this.red_range.value);
            let g = parseFloat(this.green_range.value);
            let b = parseFloat(this.blue_range.value);
            this.value = [r, g, b];
        }); 

        this.mode_btn = this.shadowRoot?.querySelector("#mode_btn") as HTMLButtonElement;
        this.sample_el = this.shadowRoot?.querySelector(".clr_sample") as HTMLDivElement;
        this.dialog_el = this.shadowRoot?.querySelector("#clr_dialog") as HTMLDialogElement;
        this.sample_el.addEventListener("click", ()=>{
            // console.log(this.value);
            let hsv = rgbToHsv(this.value[0],this.value[1], this.value[2]);
            // console.log(hsv);
            this.hue_range.value = hsv.h.toString();
            this.sat_range.value = hsv.s.toString();
            this.val_range.value = hsv.v.toString();

            this.red_range.value = this.value[0].toString();
            this.green_range.value = this.value[1].toString();
            this.blue_range.value = this.value[2].toString();
            
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

        this.mode_btn.addEventListener("click", ()=>{
            this.toggleMode();
        })
    }


    toggleMode()
    {
        let hsv = rgbToHsv(this.value[0],this.value[1], this.value[2]);
        // console.log(hsv);
        this.hue_range.value = hsv.h.toString();
        this.sat_range.value = hsv.s.toString();
        this.val_range.value = hsv.v.toString();

        this.red_range.value = this.value[0].toString();
        this.green_range.value = this.value[1].toString();
        this.blue_range.value = this.value[2].toString();

        this.hsv_ranges.classList.toggle("hidden");
        this.rgb_ranges.classList.toggle("hidden");
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
        this.sample_el.style.backgroundColor = `rgb(${values[0] * 255},${values[1] * 255},${values[2] * 255})`;
        // this.dispatchEvent(new Event("change"));
    }
}
customElements.define("gui-color-picker", GuiColorPicker);