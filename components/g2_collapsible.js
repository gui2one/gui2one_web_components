"use strict";
class GuiCollaspible extends HTMLElement {
    constructor() {
        var _a;
        super();
        this.closed = true;
        this._title = "collaspible";
        this.attachShadow({ mode: "open" });
        const styles = String.raw `
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
            
        
        </style>`;
        this.closed = true;
        const template = String.raw `
            
            ${styles}

            <div class="wrapper">
                <div class="header"><span>${this.title}</span></div>
                <div class="content">
                    <slot></slot>
                </div>
            </div>
        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(this.template_fragment.cloneNode(true));
        this.header_el = this.shadowRoot.querySelector(".header");
        this.content_el = this.shadowRoot.querySelector(".content");
    }
    connectedCallback() {
        if (this.closed) {
            this.header_el.setAttribute("closed", "true");
            this.content_el.setAttribute("closed", "true");
            this.header_el.classList.add("closed");
            this.content_el.classList.add("closed");
        }
        this.header_el.addEventListener("click", (event) => {
            this.header_el.classList.toggle("closed");
            this.content_el.classList.toggle("closed");
            if (this.header_el.classList.contains("closed")) {
                this.closed = true;
            }
            else {
                this.closed = false;
                let ev = new Event("open");
                this.dispatchEvent(ev);
            }
        });
    }
    static get observedAttributes() {
        return ['title', 'closed'];
    }
    set title(val) {
        this._title = val;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        var _a;
        switch (name) {
            case 'title':
                this.title = newValue;
                let span = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(".header>span");
                span.innerText = newValue;
                break;
            case 'closed':
                if (newValue === "")
                    this.closed = true;
                else if (newValue === "true")
                    this.closed = true;
                else if (newValue === "false")
                    this.closed = false;
                if (this.closed) {
                    this.header_el.classList.add("closed");
                    this.content_el.classList.add("closed");
                }
                else {
                    this.header_el.classList.remove("closed");
                    this.content_el.classList.remove("closed");
                }
                break;
            default: break;
        }
    }
}
customElements.define("gui-collapsible", GuiCollaspible);
