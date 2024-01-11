export class GuiCollaspible extends HTMLElement{
    template_fragment : DocumentFragment;

    closed : boolean = true;
    _title : string = "collaspible";
    header_el : HTMLDivElement;
    arrow_el : HTMLDivElement;
    content_el : HTMLDivElement;
    constructor(){
        super();
        this.attachShadow({mode : "open"});
        const styles = String.raw`
        <style>

            .header{
                display : flex;
                align-items : center;
                cursor : pointer;
                background-color : #222;
                margin : 0;
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
                padding : 0.5em;
                padding-left : 0.5em;
                padding-right : 0.5em;
                overflow-y : hidden;
                /* height : auto; */
                opacity : 1;
                transform-origin : center top;
                transform : scale3d(1.0, 1.0, 1.0);
                transition : all .2s;
            }
            .content.closed{
                /* transform : scale3d(1.0, 0.0, 1.0); */
                height : 0;
                padding-top : 0;
                padding-bottom : 0;
                opacity : 0;
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
            
        
        </style>`;

        this.closed = true;
        const template = String.raw`
            
            ${styles}

            <div class="wrapper">
                <div class="header"><div class="arrow" id="arrow"></div><span>${this.title}</span></div>
                <div class="content">
                    <slot></slot>
                </div>
            </div>
        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        this.shadowRoot?.appendChild(this.template_fragment.cloneNode(true));

        this.header_el = this.shadowRoot!.querySelector(".header") as HTMLDivElement;
        this.arrow_el = this.shadowRoot!.querySelector(".header>.arrow") as HTMLDivElement;
        // console.log(this.arrow_el);
        
        this.content_el = this.shadowRoot!.querySelector(".content") as HTMLDivElement;


    }


    connectedCallback(){

        if(this.closed)
        {
            this.header_el.setAttribute("closed", "true");
            this.content_el.setAttribute("closed", "true");
            this.arrow_el.classList.add("closed");
            this.header_el.classList.add("closed");
            this.content_el.classList.add("closed");

        }
        this.header_el.addEventListener("click", (event : MouseEvent)=>{
            this.arrow_el.classList.toggle("closed");
            this.header_el.classList.toggle("closed");
            this.content_el.classList.toggle("closed");

            if(this.header_el.classList.contains("closed"))
            {
                this.closed = true;
            }else{
                this.closed = false;
                let ev = new Event("open");
                this.dispatchEvent(ev);
            }
        });
    }

    static get observedAttributes()
    {
        return ['title', 'closed'];
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
            case 'closed' :
                if(newValue === "") this.closed = true;
                else if(newValue === "true") this.closed = true;
                else if(newValue === "false") this.closed = false;

                if(this.closed)
                {
                    this.arrow_el.classList.add("closed");
                    this.header_el.classList.add("closed");
                    this.content_el.classList.add("closed");
                }else{
                    this.arrow_el.classList.remove("closed");
                    this.header_el.classList.remove("closed");
                    this.content_el.classList.remove("closed");
                }
                
                break;
            default : break;
        }

    }
}
customElements.define("gui-collapsible", GuiCollaspible);