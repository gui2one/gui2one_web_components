export class GuiGroup extends HTMLElement{
    template_fragment : DocumentFragment;

    _label : string = "";
    label_el : HTMLDivElement;
    constructor(){
        super();
        this.attachShadow({mode : "open"});
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

        this.label_el = this.shadowRoot!.querySelector(".label") as HTMLDivElement;
    }


    connectedCallback(){
    }


    static get observedAttributes(){
        return ['label'];
    }

    set label(str : string)
    {
        if(this.label_el)
        {
            this._label = str;
            this.label_el.innerText = str;
        }
    }


    attributeChangedCallback(name : string, oldValue : any, newValue : any) {
        switch(name)
        {
            case 'label' : 
                this.label = newValue;
                break;
            default : break;
        }
    }
}
customElements.define("gui-group", GuiGroup);