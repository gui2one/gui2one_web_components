class GuiCollaspible extends HTMLElement{
    template_fragment : DocumentFragment;

    _title : string = "collaspible";
    constructor(){
        super();
        this.attachShadow({mode : "open"});
        const styles = String.raw`
        <style>

        .header{
            cursor : pointer;
            background-color : #222;
            margin : 0;
            margin-top : 0.25em;
            padding-left : 0.5em; 
        }

        .header:hover{
            filter: brightness(1.2);
        }

        .content{
            padding : 0.5em;
        }
        </style>`;

        const template = String.raw`
            
            ${styles}

            <div class="wrapper">
                <div class="header"><span>${this.title}</span></div>
                <div class="content">
                    <slot></slot>
                </div>
            </div>
        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        this.shadowRoot?.appendChild(this.template_fragment.cloneNode(true));


    }


    connectedCallback(){
    }

    static get observedAttributes()
    {
        return ['title'];
    }

    set title(val : string)
    {
        this._title = val;
    }
    attributeChangedCallback(name : string, oldValue : any, newValue : any) {
        switch(name)
        {
            case 'title' :
                this.title = newValue;
                let span = this.shadowRoot?.querySelector(".header>span") as HTMLSpanElement;
                span.innerText = newValue;
                break;
            default : break;
        }

    }
}
customElements.define("gui-collapsible", GuiCollaspible);