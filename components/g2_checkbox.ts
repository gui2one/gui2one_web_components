class GuiCheckbox extends HTMLElement{
    template_fragment : DocumentFragment;

    label : string = "toggle";
    label_el : HTMLLabelElement;
    value : boolean = true;
    constructor(){
        super();
        this.attachShadow({mode : "open"});
        const styles = String.raw`<style></style>`;
        const template = String.raw`
            ${styles}

            <div id="wrapper">
            <label for="checkbox">${this.label}</label>
            <input id="checkbox" type="checkbox" ${this.value ? 'checked': ''} />
            </div>
        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        this.shadowRoot?.appendChild(this.template_fragment.cloneNode(true));

        this.label_el = this.shadowRoot!.querySelector("label") as HTMLLabelElement;
        let checkbox = this.shadowRoot!.querySelector("#checkbox") as HTMLInputElement;
        checkbox.addEventListener("change", (event : Event)=>{
            let checkbox = (event.target as HTMLInputElement);
            // console.log(event);
            this.value = checkbox.toggleAttribute("checked");

            let ev = new Event("change");
            this.dispatchEvent(ev);
        })
    }


    connectedCallback(){
    }


    static get observedAttributes(){
        return ["label"];
    }


    attributeChangedCallback(name : string, oldValue : any, newValue : any) {
        switch(name)
        {
            case 'value':
                this.value = newValue
                break;
            case 'label':
                this.label = newValue
                this.label_el.innerText = newValue;
                break;
            default : break
        }
    }
}
customElements.define("gui-checkbox", GuiCheckbox);