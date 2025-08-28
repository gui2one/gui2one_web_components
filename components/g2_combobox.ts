export class GuiCombobox extends HTMLElement {
  template_fragment: DocumentFragment;

  _label: string = "";
  label_el: HTMLLabelElement;
  wrapper: HTMLDivElement;

  _value: string = "";
  _selectedIndex: number = 0;

  options: Array<HTMLOptionElement> = [];
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const styles = String.raw`<style>
            .wrapper{
              display : grid;
              grid-template-columns : var(--label-width) 1fr;
              height : 30px;
            }

            label{
              display : flex;
              align-items : center;
              
              position : relative;
              outline : 1px solid rgba(255,255,255,0.1);
              height : 100%;
              flex : 0.5;

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
    this.template_fragment = document
      .createRange()
      .createContextualFragment(template);
    this.shadowRoot!.appendChild(this.template_fragment.cloneNode(true));
    this.wrapper = this.shadowRoot!.querySelector(".wrapper") as HTMLDivElement;
    this.label_el = this.shadowRoot!.querySelector("label") as HTMLLabelElement;
  }

  set label(str: string) {
    if (this.label_el) {
      this._label = str;
      this.label_el.innerText = str;
    }

    if (str === "") {
      this.style.setProperty("--label-width", "0");
      // console.log("no label");
    }
  }

  set selectedIndex(index: number) {
    this._selectedIndex = index;

    if (index < this.options.length && index >= 0) {
      if (this.options.length) {
        this.value = this.options[index].innerText;
      }
    }
    // this.dispatchEvent(new Event("change"));
  }

  get selectedIndex(): number {
    return this._selectedIndex;
  }

  get value() {
    return this._value;
  }

  set value(str: string) {
    this._value = str;
  }

  connectedCallback() {
    const slot = this.shadowRoot?.querySelector("slot") as HTMLSlotElement;

    // this.options = [];
    slot?.addEventListener("slotchange", () => {
      for (let node of slot?.assignedNodes()) {
        if (node.nodeName === "OPTION") {
          let opt = node as HTMLOptionElement;

          this.options.push(opt);

          this.removeChild(opt);
        }
      }

      this.updateOptions();
    });
  }

  updateOptions() {
    let old_select = this.shadowRoot!.querySelector(".wrapper>select");
    if (old_select !== null) {
      this.wrapper.removeChild(old_select);
    }
    let select: HTMLSelectElement = document.createElement(
      "select"
    ) as HTMLSelectElement;
    select.id = "list";
    select.addEventListener("change", (event: any) => {
      let sel = event.target as HTMLSelectElement;

      this.value = sel.value;
      this.selectedIndex = sel.selectedIndex;
      let ev = new Event("change", {});

      this.dispatchEvent(ev);
    });
    for (let option of this.options) {
      let opt = document.createElement("option");
      opt.innerText = option.innerText;

      select.appendChild(opt);
    }
    this.wrapper.appendChild(select);

    select.dispatchEvent(new Event("change"));
  }

  addOption(label: string, value: string) {
    let opt = document.createElement("option");
    opt.innerText = label;
    if (value !== undefined) {
      opt.value = value;
    } else {
      opt.value = label;
    }
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

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    switch (name) {
      case "label":
        if (this.label_el) {
          this.label_el.innerText = newValue;
        }
      default:
        break;
    }
  }
}
customElements.define("gui-combobox", GuiCombobox);
