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
                cursor : pointer;
                background-color : #222;
                margin : 0;
                margin-top : 0.25em;
                padding-left : 0.5em; 
            }

            .header:hover{
                filter: brightness(1.2);
            }

            .header.closed{
                font-weight : bold;
            }
            .content{
                padding : 0.5em;
                padding-left : 0.5em;
                padding-right : 0.5em;
                overflow-y : hidden;
                height : auto;
                transition : all 0.1s;
            }
            .content.closed{
                height : 0;
                padding-top : 0;
                padding-bottom : 0;
            }
            
        
        </style>`;
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
        this.header_el.addEventListener("click", (event) => {
            this.header_el.classList.toggle("closed");
            this.content_el.classList.toggle("closed");
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
                7;
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
