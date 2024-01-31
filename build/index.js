// components/g2_accordion.ts
var GuiAccordion = class extends HTMLElement {
  template_fragment;
  collapsibles = [];
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const styles = String.raw`<style>

        </style>`;
    const template = String.raw`
            ${styles}
            <slot></slot>
        `;
    this.template_fragment = document.createRange().createContextualFragment(template);
    this.shadowRoot?.appendChild(this.template_fragment.cloneNode(true));
  }
  open(theone) {
    this.collapsibles.forEach((item, index) => {
      if (item !== theone) {
        item.setAttribute("closed", "true");
      }
    });
  }
  connectedCallback() {
    const slot = this.shadowRoot.querySelector("slot");
    this.collapsibles = [];
    slot?.addEventListener("slotchange", () => {
      for (let node of slot?.assignedNodes()) {
        if (node.nodeName === "GUI-COLLAPSIBLE") {
          let coll = node;
          coll.addEventListener("open", (ev) => {
            this.open(ev.target);
          });
          this.collapsibles.push(coll);
        }
      }
    });
  }
  adoptedCallBack() {
    console.log("adopted");
  }
  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, oldValue, newValue) {
  }
};
customElements.define("gui-accordion", GuiAccordion);

// components/g2_checkbox.ts
var GuiCheckbox = class extends HTMLElement {
  template_fragment;
  _label = "toggle";
  label_el;
  pretty_el;
  value = true;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const styles = String.raw`<style>
            :host{
                --padding-top : 0.3em;
                --padding-bottom : 0.3em;
                --padding-left : 0.5em;
                --padding-right : 0.5em;
            }
            #wrapper{
                display : flex;
                align-items : center;
                justify-content : center;
                /* margin-top : 0.5em;
                margin-bottom : 0.5em; */
                /* padding-left : 0.5em;
                padding-right : 0.5em; */

                /* padding-top : var(--padding-top); */
                /* padding-bottom : 0.1em; */
            }
            label{
                display : flex;
                flex : 1;
                align-items : center;
                /* justify-content : center; */
                color : white;
                background-color : grey;
                padding-left : var(--padding-left);
                padding-top : var(--padding-top);
                padding-bottom : var(--padding-bottom);

                border-radius : 3px 0 0 3px;
                line-height : 1em;
                width : 50%;
                cursor : pointer;
            }
            label.checked{
                background-color : green;
            }
            input[type=checkbox]
            {
                visibility : hidden;
                display : none;
            }
            .pretty{
                position : relative;
                flex : 1;
                height : 1em;
                width : 50px;
                background-color : white;
                padding-top : var(--padding-top);
                padding-bottom : var(--padding-bottom);

                border-radius : 0px 3px 3px 0px;
            }
            .pretty.checked::after{
                content : "";
                position : absolute;
                left : calc(50% - 30px/2);
                top : 0;
                width : 30px;
                height : 10px;
                /* background-color : red; */
                border-radius : 0px 3px 3px 0px;
                border : 10px solid #222;
                border-top : none;
                border-right : none;
                transform-origin : 50% 50%;
                transform : scale(0.6) rotate(-45deg) ;
            }
        </style>`;
    const template = String.raw`
            ${styles}

            <div id="wrapper">
            <label for="checkbox" class=" ${this.value ? "checked" : ""}">${this._label}</label>
            <div class="pretty ${this.value ? "checked" : ""}">
            </div>
            <input id="checkbox" type="checkbox" ${this.value ? "checked" : ""} />
            </div>
        `;
    this.template_fragment = document.createRange().createContextualFragment(template);
    this.shadowRoot?.appendChild(this.template_fragment.cloneNode(true));
    this.label_el = this.shadowRoot.querySelector("label");
    this.pretty_el = this.shadowRoot.querySelector(".pretty");
    let checkbox = this.shadowRoot.querySelector("#checkbox");
    checkbox.addEventListener("change", (event) => {
      let checkbox2 = event.target;
      this.value = checkbox2.toggleAttribute("checked");
      this.pretty_el.classList.toggle("checked");
      this.label_el.classList.toggle("checked");
      let ev = new Event("change");
      this.dispatchEvent(ev);
    });
  }
  connectedCallback() {
  }
  static get observedAttributes() {
    return ["label"];
  }
  set label(str) {
    if (this.label_el) {
      this.label_el.innerHTML = `<span>${str}</span>`;
    }
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "value":
        this.value = newValue;
        break;
      case "label":
        this.label = newValue;
        break;
      default:
        break;
    }
  }
};
customElements.define("gui-checkbox", GuiCheckbox);

// components/g2_collapsible.ts
var GuiCollapsible = class extends HTMLElement {
  template_fragment;
  closed = true;
  _title = "collaspible";
  header_el;
  arrow_el;
  content_el;
  title_el;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const styles = String.raw`
        <style>

            .header{
                display : flex;
                align-items : center;
                cursor : pointer;
                background-color : #222;
                margin : 0;
                /* outline : 1px solid white; */
                height : 2em;
                margin-top : 0.25em;
                padding-left : 0.5em; 
                font-weight : bolder;
            }

            .header:hover{
                filter: brightness(1.2);
            }

            .header.closed{
                font-weight : normal;
            }
            .content{
                display : grid;
                grid-template-rows : 1fr;
                gap : 0.5em;
                /* padding : 0.5em; */
                padding : 0.5em;
                /* overflow-y : hidden; */
                /* height : auto; */
                opacity : 1;
                transform-origin : center top;
                /* transform : scale3d(1.0, 1.0, 1.0); */

                /* transition: grid-template-rows 0.2s ease-out; */
                transition: all 0.2s ease-out;
            }
            .content.closed{
                grid-template-rows : 0fr;
                padding-top : 0;
                padding-bottom : 0;
            }

            .arrow {
                width: 0; 
                height: 0; 
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent; 
                
                border-left:10px solid white; 
                /* padding-right : 10px; */
                transform-origin : 50% 50%;
                margin-right : 20px;
                transform : rotate(90deg);
                transition : all 0.08s; 
                opacity : 1.0;
            }
            
            .arrow.closed{
                transform : rotate(0deg);
                opacity : 0.5;
            }

            .inner {
                overflow: hidden;
                display : flex;
                flex-direction : column;
                gap : 1em;
                /* width : 100%; */
            }
            
        
        </style>`;
    this.closed = true;
    const template = String.raw`
            
            ${styles}

            <div class="wrapper">
                <div class="header"><div class="arrow" id="arrow"></div><span id="title">${this.title}</span></div>
                <div class="content">
                    <div class="inner">
                    <slot></slot>
                    </div>
                </div>
            </div>
        `;
    this.template_fragment = document.createRange().createContextualFragment(template);
    this.shadowRoot?.appendChild(this.template_fragment.cloneNode(true));
    this.header_el = this.shadowRoot.querySelector(".header");
    this.arrow_el = this.shadowRoot.querySelector(".header>.arrow");
    this.title_el = this.shadowRoot.querySelector("#title");
    this.content_el = this.shadowRoot.querySelector(".content");
  }
  connectedCallback() {
    if (this.closed) {
      this.header_el.setAttribute("closed", "true");
      this.content_el.setAttribute("closed", "true");
      this.arrow_el.classList.add("closed");
      this.header_el.classList.add("closed");
      this.content_el.classList.add("closed");
    }
    this.header_el.addEventListener("click", (event) => {
      this.arrow_el.classList.toggle("closed");
      this.header_el.classList.toggle("closed");
      this.content_el.classList.toggle("closed");
      if (this.header_el.classList.contains("closed")) {
        this.closed = true;
      } else {
        this.closed = false;
        let ev = new Event("open");
        this.dispatchEvent(ev);
      }
    });
  }
  static get observedAttributes() {
    return ["title", "closed"];
  }
  set title(val) {
    this._title = val;
    if (this.title_el) {
      this.title_el.innerText = val;
    }
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "title":
        this.title = newValue;
        let span = this.shadowRoot?.querySelector(".header>span");
        span.innerText = newValue;
        break;
      case "closed":
        if (newValue === "")
          this.closed = true;
        else if (newValue === "true")
          this.closed = true;
        else if (newValue === "false")
          this.closed = false;
        if (this.closed) {
          this.arrow_el.classList.add("closed");
          this.header_el.classList.add("closed");
          this.content_el.classList.add("closed");
        } else {
          this.arrow_el.classList.remove("closed");
          this.header_el.classList.remove("closed");
          this.content_el.classList.remove("closed");
        }
        break;
      default:
        break;
    }
  }
};
customElements.define("gui-collapsible", GuiCollapsible);

// components/g2_color_picker.ts
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
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }
  return { r, g, b };
}
var GuiColorPicker = class extends HTMLElement {
  template_fragment;
  sample_el;
  dialog_el;
  _value = [];
  _hsv_values = [0, 0, 0];
  hsv_ranges;
  rgb_ranges;
  hue_range;
  sat_range;
  val_range;
  red_range;
  green_range;
  blue_range;
  mode_btn;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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
    this.hsv_ranges = this.shadowRoot?.querySelector("#hsv_ranges");
    this.hue_range = this.shadowRoot?.querySelector("#hue_range");
    this.sat_range = this.shadowRoot?.querySelector("#sat_range");
    this.val_range = this.shadowRoot?.querySelector("#val_range");
    this.hue_range.addEventListener("input", (event) => {
      let rgb = hsvToRgb(parseFloat(this.hue_range.value), parseFloat(this.sat_range.value), parseFloat(this.val_range.value));
      this.value = [rgb.r, rgb.g, rgb.b];
    });
    this.sat_range.addEventListener("input", (event) => {
      let rgb = hsvToRgb(parseFloat(this.hue_range.value), parseFloat(this.sat_range.value), parseFloat(this.val_range.value));
      this.value = [rgb.r, rgb.g, rgb.b];
    });
    this.val_range.addEventListener("input", (event) => {
      let rgb = hsvToRgb(parseFloat(this.hue_range.value), parseFloat(this.sat_range.value), parseFloat(this.val_range.value));
      this.value = [rgb.r, rgb.g, rgb.b];
    });
    this.rgb_ranges = this.shadowRoot?.querySelector("#rgb_ranges");
    this.red_range = this.shadowRoot?.querySelector("#red_range");
    this.green_range = this.shadowRoot?.querySelector("#green_range");
    this.blue_range = this.shadowRoot?.querySelector("#blue_range");
    this.red_range.addEventListener("input", (event) => {
      let r = parseFloat(this.red_range.value);
      let g = parseFloat(this.green_range.value);
      let b = parseFloat(this.blue_range.value);
      this.value = [r, g, b];
    });
    this.green_range.addEventListener("input", (event) => {
      let r = parseFloat(this.red_range.value);
      let g = parseFloat(this.green_range.value);
      let b = parseFloat(this.blue_range.value);
      this.value = [r, g, b];
    });
    this.blue_range.addEventListener("input", (event) => {
      let r = parseFloat(this.red_range.value);
      let g = parseFloat(this.green_range.value);
      let b = parseFloat(this.blue_range.value);
      this.value = [r, g, b];
    });
    this.mode_btn = this.shadowRoot?.querySelector("#mode_btn");
    this.sample_el = this.shadowRoot?.querySelector(".clr_sample");
    this.dialog_el = this.shadowRoot?.querySelector("#clr_dialog");
    this.sample_el.addEventListener("click", () => {
      let hsv = rgbToHsv(this.value[0], this.value[1], this.value[2]);
      this.hue_range.value = hsv.h.toString();
      this.sat_range.value = hsv.s.toString();
      this.val_range.value = hsv.v.toString();
      this.red_range.value = this.value[0].toString();
      this.green_range.value = this.value[1].toString();
      this.blue_range.value = this.value[2].toString();
      this.dialog_el.showModal();
    });
    this.dialog_el.addEventListener("click", (event) => {
      var rect = this.dialog_el.getBoundingClientRect();
      var isInDialog = rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        this.dialog_el.close();
      }
    });
    this.mode_btn.addEventListener("click", () => {
      this.toggleMode();
    });
  }
  toggleMode() {
    let hsv = rgbToHsv(this.value[0], this.value[1], this.value[2]);
    this.hue_range.value = hsv.h.toString();
    this.sat_range.value = hsv.s.toString();
    this.val_range.value = hsv.v.toString();
    this.red_range.value = this.value[0].toString();
    this.green_range.value = this.value[1].toString();
    this.blue_range.value = this.value[2].toString();
    this.hsv_ranges.classList.toggle("hidden");
    this.rgb_ranges.classList.toggle("hidden");
  }
  connectedCallback() {
  }
  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, oldValue, newValue) {
  }
  get value() {
    return this._value;
  }
  set value(values) {
    this._value = values;
    this.sample_el.style.backgroundColor = `rgb(${values[0] * 255},${values[1] * 255},${values[2] * 255})`;
  }
};
customElements.define("gui-color-picker", GuiColorPicker);

// components/g2_combobox.ts
var GuiCombobox = class extends HTMLElement {
  template_fragment;
  _label = "Label";
  label_el;
  wrapper;
  _value = "";
  _selectedIndex = 0;
  options = [];
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const styles = String.raw`<style>
            .wrapper{
                /* padding : 0.5em; */
                display : flex;
                flex-direction : row;
                align-items :center;
                justify-content : center;
                height : 30px;
            }

            label{
                display : flex;
                align-items : center;
                justify-content : center;
                position : relative;
                outline : 1px solid rgba(255,255,255,0.1);
                height : 100%;
                flex : 1.0;

                border-radius : 3px 0 0 3px;
            }

            select{
                border : 0;
                height : 31px;
                line-height : 30px;
                flex : 1;
                position : relative;
                display : block;
                color : #222;
                background-color : white;
                border-radius : 0 3px 3px 0;
            }
        </style>`;
    const template = String.raw`
            ${styles}

            <div class="wrapper">
            <label for="list">${this._label}</label>
            <slot></slot>

            </div>

            
        `;
    this.template_fragment = document.createRange().createContextualFragment(template);
    this.shadowRoot.appendChild(this.template_fragment.cloneNode(true));
    this.wrapper = this.shadowRoot.querySelector(".wrapper");
    this.label_el = this.shadowRoot.querySelector("label");
  }
  set label(str) {
    if (this.label_el) {
      this._label = str;
      this.label_el.innerText = str;
    }
  }
  set selectedIndex(index) {
    this._selectedIndex = index;
  }
  get selectedIndex() {
    return this._selectedIndex;
  }
  get value() {
    return this._value;
  }
  set value(str) {
    this._value = str;
  }
  connectedCallback() {
    const slot = this.shadowRoot?.querySelector("slot");
    this.options = [];
    slot?.addEventListener("slotchange", () => {
      for (let node of slot?.assignedNodes()) {
        if (node.nodeName === "OPTION") {
          let opt = node;
          this.options.push(opt);
          this.removeChild(opt);
        }
      }
      this.updateOptions();
    });
  }
  updateOptions() {
    let old_select = this.shadowRoot.querySelector(".wrapper>select");
    if (old_select !== null) {
      this.wrapper.removeChild(old_select);
    }
    let select = document.createElement("select");
    select.id = "list";
    select.addEventListener("change", (event) => {
      let sel = event.target;
      this.value = sel.value;
      this.selectedIndex = sel.selectedIndex;
      let ev = new Event("change", {});
      this.dispatchEvent(ev);
    });
    for (let option of this.options) {
      let opt = document.createElement("option");
      opt.innerText = option.value;
      select.appendChild(opt);
    }
    this.wrapper.appendChild(select);
  }
  addOption(name) {
    let opt = document.createElement("option");
    opt.innerText = name;
    this.options.push(opt);
    this.updateOptions();
  }
  resetOptions() {
    this.options = [];
    this.updateOptions();
  }
  static get observedAttributes() {
    return ["label"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "label":
        if (this.label_el) {
          this.label_el.innerText = newValue;
        }
      default:
        break;
    }
  }
};
customElements.define("gui-combobox", GuiCombobox);

// components/g2_group.ts
var GuiGroup = class extends HTMLElement {
  template_fragment;
  _label = "";
  label_el;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const styles = String.raw`<style>

            .wrapper{
                position : relative;
                border-radius : 3px;
                outline : 2px solid #ffffff10;
                padding : 0.2em;
                padding-top : 1.0em;
                margin : 2px;
                margin-top : 1.0em;
                display : flex;
                flex-direction : column;
                gap : 0.5em;
            }
            
            .label{
                font-size : 0.8em;
                position : absolute;

                top : 0;
                line-height : 1em;
                background-color : #222222;
                margin-top : -0.5em;
            }

            .hidden{
                visibility : hidden;
                display : none;
            }
        </style>`;
    const template = String.raw`
            ${styles}


            <div class="wrapper">
            <div class="label">${this._label}</div>
            <slot></slot>

            </div>

        `;
    this.template_fragment = document.createRange().createContextualFragment(template);
    this.shadowRoot?.appendChild(this.template_fragment.cloneNode(true));
    this.label_el = this.shadowRoot.querySelector(".label");
  }
  connectedCallback() {
  }
  static get observedAttributes() {
    return ["label"];
  }
  set label(str) {
    if (this.label_el) {
      this._label = str;
      this.label_el.innerText = str;
    }
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "label":
        this.label = newValue;
        break;
      default:
        break;
    }
  }
};
customElements.define("gui-group", GuiGroup);

// components/g2_input_color.ts
var GuiInputColor = class extends HTMLElement {
  template_fragment;
  label_el;
  default_scalar = 0;
  _label = "Color";
  _value = [0, 0, 0];
  _default_value = [0, 0, 0];
  picker_el;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const styles = String.raw`
            <style>

                .wrapper{
                    display : grid;
                    grid-template-columns : var(--label-width) 1fr;
                    font-size : 0.9em;
                }

                .label{
                    font-family : sans-serif;
                }

                .floats{
                    /* position : relative; */
                    /* width : auto; */
                }
            </style>
        `;
    const template_str = String.raw`

            ${styles}
            <div class="wrapper">
                <div class="label">${this._label}</div>
                <div class="floats" >
                    <gui-color-picker></gui-color-picker>
                </div>
            </div>
        `;
    this.template_fragment = document.createRange().createContextualFragment(template_str);
    this.shadowRoot.appendChild(this.template_fragment.cloneNode(true));
    this.label_el = this.shadowRoot.querySelector(".label");
    this.picker_el = this.shadowRoot.querySelector("gui-color-picker");
    this.picker_el.addEventListener("change", (event) => {
      this.value = this.picker_el.value;
    });
    Promise.all([
      customElements.whenDefined("gui-color-picker")
    ]).then(() => {
      this.picker_el.value = this.value;
    });
  }
  connectedCallback() {
  }
  static get observedAttributes() {
    return ["default_scalar", "label"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "default_scalar":
        this.default_scalar = parseFloat(newValue);
        this.value = [this.default_scalar, this.default_scalar, this.default_scalar];
        break;
      case "label":
        this.label = newValue;
        this.label_el.innerText = newValue;
        break;
      default:
        break;
    }
  }
  get value() {
    return this._value;
  }
  set value(val) {
    this._value = val;
  }
  set default_value(val) {
    this._default_value = val;
  }
  set label(str) {
    this._label = str;
    this.label_el.innerText = str;
  }
};
customElements.define("gui-input-color", GuiInputColor);

// components/g2_input_float.ts
var GuiInputFloat = class extends HTMLElement {
  _value;
  value_preview = 0;
  value_offset = 0;
  _default_value = 0;
  old_value = 0;
  new_value = 0;
  _label = "";
  label_el;
  _color = "";
  styles;
  value_input;
  number_input;
  template_fragment;
  is_mouse_down;
  is_dragging;
  drag_start_pos = 0;
  ctrl_pressed = false;
  shift_pressed = false;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._value = 0;
    this.label = "X";
    this.color = "grey";
    this.is_mouse_down = false;
    this.is_dragging = false;
    this._label = "wtf ?";
    this.styles = String.raw`
            <style>

            :host{
                --padding-top : 0.3em;
                --padding-bottom : 0.3em;
                --padding-left : 0.15em;
                --padding-right : 0.15em;

                display : flex;
                flex : 1.0;
                box-sizing : border-box;
            }

            .wrapper{
                position : relative;
                display : grid;
                grid-template-columns : var(--label-width) 1fr;
                align-items: stretch;
                justify-items: stretch;
                width : max-content;
                font-size : 0.9rem;
                flex : 1.0;
            }

            .label{
                color : white;
                position : relative;
                padding-left : 0.5em;
                padding-right : 0.5em;
                background-color : ${this._color};
                border-radius : 2px 0 0 2px;
                vertical-align : middle;
                padding-top : var(--padding-top);
                padding-bottom : var(--padding-bottom);
                user-select : none;

                cursor : e-resize;   

                display : flex;
                align-items : center;
                justify-content : center;

                

            }

            .label span{
                opacity : 0.8;     
                display : block;
                align-items : center;
                justify-content : center;

                overflow : hidden;
                text-overflow : ellipsis;    
                white-space: nowrap;                       
            }

            .value_div{
                flex : 1.0;
                
                position : relative;
                /* overflow : hidden; */
                border-radius : 0 2px 2px 0;
                background-color : #eee;
                padding-top : var(--padding-top);
                padding-bottom : var(--padding-bottom);
                /* padding-left : var(--padding-left); */
                /* width : 100%; */
                
            }

            input{
                display : block;
                color : #222;
                font-weight : bold;
                height : calc(100% - 2px );
                max-width : 9ch;
                /* min-width : 5ch; */
                border : none;
                height: max-content;
                background-color : transparent;
            }

            .number_div{
                min-width : 6ch;
            }

            </style>        
        `;
    const template = String.raw`

            ${this.styles}

            <div class="wrapper" oncontextmenu="return false;">
                <div class="label" title="${this._label}"><span>${this._label}</span></div>
                <div class="value_div">
                    <input type=number step="0.1" value=${this.value} />
                    <!-- <div class="number_div" contenteditable> -->
                </div>
            <div>
        `;
    this.template_fragment = document.createRange().createContextualFragment(template);
    this.shadowRoot?.appendChild(this.template_fragment.cloneNode(true));
    this.label_el = this.shadowRoot.querySelector(".label");
    this.value_input = this.shadowRoot.querySelector("input");
  }
  connectedCallback() {
    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey) {
        this.ctrl_pressed = true;
      }
      if (event.shiftKey) {
        this.shift_pressed = true;
      }
    });
    document.addEventListener("keyup", (event) => {
      if (event.key == "Control") {
        this.ctrl_pressed = false;
      }
      if (event.key == "Shift") {
        this.shift_pressed = false;
      }
    });
    this.value_input.addEventListener("input", (event) => {
      this._value = parseFloat(this.value_input.value);
      this.triggerChange();
    });
    this.value_input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.value_input.blur();
        this.triggerChange();
      }
    });
    this.value_input.addEventListener("blur", (event) => {
      this.triggerChange();
    });
    this.label_el.addEventListener("mousedown", (event) => {
      this.value_offset = 0;
      if (event.button === 0) {
        this.is_mouse_down = true;
        this.drag_start_pos = event.clientX;
      } else if (event.button === 2) {
        this.value_input.value = this._default_value.toString();
        this.value = this._default_value;
      }
    });
    document.addEventListener("mouseup", (event) => {
      this.is_mouse_down = false;
      if (event.button === 0) {
        if (this.value_preview !== 0) {
          this.value = this.value_preview;
          this.value_preview = 0;
        }
      }
    });
    document.addEventListener("mousemove", (event) => {
      if (this.is_mouse_down) {
        let diff = event.pageX - this.drag_start_pos;
        let mult = 0.1;
        if (this.ctrl_pressed)
          mult *= 0.1;
        else if (this.shift_pressed)
          mult *= 5;
        diff *= mult;
        this.value_input.value = (this.value + diff).toString();
        this.value_preview = this.value + diff;
        this.value_offset = diff;
        this.value += diff;
        this.triggerChange();
        this.drag_start_pos = event.pageX;
      }
    });
  }
  static get observedAttributes() {
    return ["label", "color", "default_value"];
  }
  triggerChange() {
    let ev = new Event("change", {
      // bubbles : true,
      // composed : false,
    });
    this.dispatchEvent(ev);
  }
  set value(val) {
    this._value = val;
    this.value_input.value = val.toString();
    this.triggerChange();
  }
  get value() {
    return this._value;
  }
  set default_value(val) {
    this._default_value = val;
  }
  set color(clr) {
    this._color = clr;
  }
  set label(str) {
    this._label = str;
    if (this.label_el) {
      this.label_el.innerHTML = `<span>${str}</span>`;
      this.label_el.setAttribute("title", str);
    }
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "color":
        this.label_el.style.backgroundColor = newValue;
        break;
      case "label":
        this.label = newValue;
        break;
      case "default_value":
        this._default_value = parseFloat(newValue);
        this.value = this._default_value;
        break;
      default:
        break;
    }
  }
};
customElements.define("gui-input-float", GuiInputFloat);

// components/g2_input_vector.ts
var GuiInputVector = class extends HTMLElement {
  template_fragment;
  label_el;
  input_x;
  input_y;
  input_z;
  default_scalar = 0;
  _label = "Vector";
  _value = [0, 0, 0];
  _default_value = [0, 0, 0];
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const styles = String.raw`
            <style>

                :host{
                    /* --label-width : 200px;  */
                }
                .wrapper{
                    /* margin-top : 3px; */
                    font-size : 0.9em;
                    display : grid;
                    grid-template-columns : var(--label-width) 1fr;
                    align-items: center;

                }

                .label{
                    font-family : sans-serif;
                }


                .floats{
                    display : flex; 
                    gap:3px;
                }
/* 
                .floats ~ .wrapper{
                    flex : 1.0;
                } */
            </style>
        `;
    const template_str = String.raw`

            ${styles}
            <div class="wrapper">
                <div class="label">${this._label}</div>
                <div class="floats" style="">
                    <gui-input-float id="input_x" color="red"   label="x" default_value="${this.default_scalar}" style="--label-width : 20px;"> </gui-input-float>
                    <gui-input-float id="input_y" color="green" label="y" default_value="${this.default_scalar}" style="--label-width : 20px;"></gui-input-float>
                    <gui-input-float id="input_z" color="blue"  label="z" default_value="${this.default_scalar}" style="--label-width : 20px;"></gui-input-float>
                </div>
            </div>
        `;
    this.template_fragment = document.createRange().createContextualFragment(template_str);
    this.shadowRoot.appendChild(this.template_fragment.cloneNode(true));
    this.label_el = this.shadowRoot.querySelector(".label");
    this.input_x = this.shadowRoot.querySelector("#input_x");
    this.input_y = this.shadowRoot.querySelector("#input_y");
    this.input_z = this.shadowRoot.querySelector("#input_z");
    Promise.all([
      customElements.whenDefined("gui-input-float")
    ]).then(() => {
      let label_x = this.input_x.shadowRoot.querySelector(".wrapper .label span");
      let label_y = this.input_y.shadowRoot.querySelector(".wrapper .label span");
      let label_z = this.input_z.shadowRoot.querySelector(".wrapper .label span");
      label_x.style.overflow = "unset";
      label_y.style.overflow = "unset";
      label_z.style.overflow = "unset";
    });
    this.input_x.addEventListener("change", (event) => {
      let val = event.target.value;
      this.value[0] = val;
      this.dispatchEvent(new Event("change"));
    });
    this.input_y.addEventListener("change", (event) => {
      let val = event.target.value;
      this.value[1] = val;
      this.dispatchEvent(new Event("change"));
    });
    this.input_z.addEventListener("change", (event) => {
      let val = event.target.value;
      this.value[2] = val;
      this.dispatchEvent(new Event("change"));
    });
  }
  connectedCallback() {
    this.input_x._default_value = this.default_scalar;
    this.input_y._default_value = this.default_scalar;
    this.input_z._default_value = this.default_scalar;
  }
  static get observedAttributes() {
    return ["default_scalar", "label"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "default_scalar":
        this.default_scalar = parseFloat(newValue);
        this.input_x.value = this.default_scalar;
        this.input_y.value = this.default_scalar;
        this.input_z.value = this.default_scalar;
        break;
      case "label":
        this.label = newValue;
        this.label_el.innerText = newValue;
        break;
      default:
        break;
    }
  }
  get value() {
    return [this.input_x.value, this.input_y.value, this.input_z.value];
  }
  set value(val) {
    console.log("setting values : ", val);
    this.input_x.value = val[0];
    this.input_y.value = val[1];
    this.input_z.value = val[2];
    this._value = val;
  }
  set default_value(val) {
    this._default_value = val;
    this.input_x.default_value = val[0];
    this.input_y.default_value = val[1];
    this.input_z.default_value = val[2];
  }
  set label(str) {
    this._label = str;
    this.label_el.innerText = str;
  }
};
customElements.define("gui-input-vector", GuiInputVector);

// components/g2_panel.ts
var GuiPanel = class extends HTMLElement {
  template_fragment;
  wrapper_el;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const styles = String.raw`
            <style>
                .panel{
                    --scrollbar-width : 8px;
                    --scrollbar-track-color : transparent;
                    --scrollbar-thumb-color : gray;

                    
                }
                
                        /* For WebKit browsers (Chrome, Safari) */
                        ::-webkit-scrollbar {
                            width: var(--scrollbar-width);
                        }

                        ::-webkit-scrollbar-thumb {
                            background-color: var(--scrollbar-thumb-color);
                            border-radius: 6px;
                        }

                        ::-webkit-scrollbar-track {
                            background-color: var(--scrollbar-track-color);
                        }

                        /* For Firefox */
                        * {
                            scrollbar-color: var(--scrollbar-thumb-color) var(--scrollbar-track-color);
                        }

                        *::-webkit-scrollbar {
                            width: var(--scrollbar-width);
                        }

                        *::-webkit-scrollbar-thumb {
                            background-color: var(--scrollbar-thumb-color);
                            border-radius: 6px;
                        }

                        *::-webkit-scrollbar-track {
                            background-color: var(--scrollbar-track-color);
                        }                
                #wrapper{
                    position : fixed;
                    top : 0px;
                    right : 0px;
                    padding : 0.5em;
                    padding-bottom : 0;
                    padding-top : 0;

                    box-shadow : -2px 2px 8px #0001;
                    border-radius : 0 0 0 3px;
                    height : 100%;
                    max-height : 100%;
                    color : white;
                    background-color : #111;

                    transition : transform;
                    transition-duration : 0.1s;

                    cursor: default;
                    user-select : none;
                }

                #wrapper.left{
                    left : 0px;
                    right : unset;
                }

                #wrapper.hidden{
                    transform : translate3d(100%,0,0 );
                }
                
                #wrapper.left.hidden{
                    
                    transform : translate3d(-100%,0,0 );
                }

                .panel{
                    position : relative;
                    overflow-y : scroll;
                    height : calc(100% - 50px - 2em);
                    width : 100%;
                    padding-top : 2em;
                }
                .panel:after{
                    content : " ";
                    position : absolute;
                    width : 100%;
                    height : 30px;
                }

                #wrapper .close_btn{
                    position : relative;
                    top : 0;
                    cursor : pointer;
                    height : calc(50px);
                    margin-top : 2px;
                    margin-left : 0px;
                    opacity : 0.5;
                    /* outline : 1px solid white; */
                    width : 100%;
                }

                #wrapper.left .close_btn{
                    right : 0px;
                    width : 100%;
                    margin-left : auto;
                    margin-right : 1em;
                }

                #wrapper .close_btn:hover{
                    opacity : 1.0;
                }

                #wrapper .close_btn::before{
                    content : '';
                    position : absolute;
                    top : 0; 
                    left : 0;
                    width : 4px;
                    height : 100%;
                    border-radius : 5px;
                    background-color : #eee;
                    transform-origin : 50% 50%;
                    transform :  translateX(20px) rotate(45deg);
                }
                #wrapper .close_btn::after{
                    content : '';
                    position : absolute;
                    top : 0; 
                    left : 0;
                    width : 4px;
                    height : 100%;
                    border-radius : 5px;
                    background-color : #eee;
                    transform-origin : 50% 50%;
                    transform : translateX(20px) rotate(-45deg);
                }

                #wrapper .open_btn{
                    display : flex;
                    align-items : center;
                    justify-content : center;
                    font-weight : bold;
                    font-size : 2em;
                    position : absolute;
                    width : 25px;
                    height : 25px;
                    background-color : transparent; 
                    opacity : 0.5;
                    filter : drop-shadow(2px 2px 2px pink);
                    top : 0;
                    left : 0;  
                    z-index : 2;
                    margin-left : -25px;
                    visibility : hidden;
                }
                #wrapper .open_btn:hover{
                    opacity : 0.9;
                }

                #wrapper.left .open_btn{
                    left : unset;
                    right : -25px;
                }
                #wrapper.hidden>.open_btn{
                    visibility : visible;
                }
            </style>
        `;
    const template = String.raw`
            
            ${styles}
            <!-- <div id="wrapper" oncontextmenu="return false;"> -->
            <div id="wrapper" >
                <div class="open_btn">&lt;</div>
                <div class="close_btn"></div>
                <div class="panel">
                    <slot></slot>
                </div>
            </div>
        `;
    this.template_fragment = document.createRange().createContextualFragment(template);
    this.shadowRoot?.appendChild(this.template_fragment.cloneNode(true));
    let close_btn = this.shadowRoot?.querySelector(".close_btn");
    let open_btn = this.shadowRoot?.querySelector(".open_btn");
    this.wrapper_el = this.shadowRoot?.querySelector("#wrapper");
    close_btn?.addEventListener("click", (event) => {
      this.wrapper_el.classList.add("hidden");
    });
    open_btn?.addEventListener("click", (event) => {
      this.wrapper_el.classList.remove("hidden");
    });
    document.addEventListener("keypress", (event) => {
      if (event.key === "h") {
        this.wrapper_el.classList.toggle("hidden");
      }
    });
  }
  connectedCallback() {
  }
  static get observedAttributes() {
    return ["side", "closed"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "side":
        this.wrapper_el.classList.add(newValue);
        break;
      case "closed":
        if (newValue === "true" || newValue === "") {
          this.wrapper_el.classList.add("hidden");
        }
        break;
    }
  }
};
customElements.define("gui-panel", GuiPanel);

// components/g2_separator.ts
var GuiSeparator = class extends HTMLElement {
  template_fragment;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const styles = String.raw`<style>

            hr{
                opacity : 0.1;
            }
        </style>`;
    const template = String.raw`
            ${styles}
            <hr>
        `;
    this.template_fragment = document.createRange().createContextualFragment(template);
    this.shadowRoot?.appendChild(this.template_fragment.cloneNode(true));
  }
  connectedCallback() {
  }
  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, oldValue, newValue) {
  }
};
customElements.define("gui-separator", GuiSeparator);

// components/g2_title.ts
var GuiTitle = class extends HTMLElement {
  title = "Hello, World!";
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.shadowRoot.innerHTML = String.raw`
      <style>
        :host {
          display: block;
        }

      </style>
      <h2><slot></slot></h2>
    `;
  }
};
customElements.define("gui-title", GuiTitle);

// components/index.ts
var components_default = {};
window["GuiAccordion"] = GuiAccordion;
window["GuiCheckbox"] = GuiCheckbox;
window["GuiCollapsible"] = GuiCollapsible;
window["GuiColorPicker"] = GuiColorPicker;
window["GuiCombobox"] = GuiCombobox;
window["GuiGroup"] = GuiGroup;
window["GuiInputColor"] = GuiInputColor;
window["GuiInputFloat"] = GuiInputFloat;
window["GuiInputVector"] = GuiInputVector;
window["GuiPanel"] = GuiPanel;
window["GuiSeparator"] = GuiSeparator;
window["GuiTitle"] = GuiTitle;
export {
  GuiAccordion,
  GuiCheckbox,
  GuiCollapsible,
  GuiColorPicker,
  GuiCombobox,
  GuiGroup,
  GuiInputColor,
  GuiInputFloat,
  GuiInputVector,
  GuiPanel,
  GuiSeparator,
  GuiTitle,
  components_default as default
};
//# sourceMappingURL=index.js.map
