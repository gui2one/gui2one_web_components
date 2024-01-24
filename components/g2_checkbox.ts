export class GuiCheckbox extends HTMLElement{
    template_fragment : DocumentFragment;

    _label : string = "toggle";
    label_el : HTMLLabelElement;
    pretty_el : HTMLDivElement;
    value : boolean = true;
    constructor(){
        super();
        this.attachShadow({mode : "open"});
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
            <label for="checkbox" class=" ${this.value ? 'checked': ''}">${this._label}</label>
            <div class="pretty ${this.value ? 'checked': ''}">
            </div>
            <input id="checkbox" type="checkbox" ${this.value ? 'checked': ''} />
            </div>
        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        this.shadowRoot?.appendChild(this.template_fragment.cloneNode(true));

        this.label_el = this.shadowRoot!.querySelector("label") as HTMLLabelElement;
        this.pretty_el = this.shadowRoot!.querySelector(".pretty") as HTMLDivElement;

        let checkbox = this.shadowRoot!.querySelector("#checkbox") as HTMLInputElement;
        checkbox.addEventListener("change", (event : Event)=>{
            let checkbox = (event.target as HTMLInputElement);
            // console.log(event);
            this.value = checkbox.toggleAttribute("checked");
            this.pretty_el.classList.toggle("checked");
            this.label_el.classList.toggle("checked");
            let ev = new Event("change");
            this.dispatchEvent(ev);
        })
    }


    connectedCallback(){
    }


    static get observedAttributes(){
        return ["label"];
    }


    set label(str : string)
    {
        if(this.label_el)
        {
            this.label_el.innerHTML = `<span>${str}</span>`
        }
    }
    attributeChangedCallback(name : string, oldValue : any, newValue : any) {
        switch(name)
        {
            case 'value':
                this.value = newValue
                break;
            case 'label':
                this.label = newValue
                // this.label_el.innerText = newValue;
                break;
            default : break
        }
    }
}
customElements.define("gui-checkbox", GuiCheckbox);