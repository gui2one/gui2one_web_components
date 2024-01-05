"use strict";
class GuiCollaspible extends HTMLElement {
    constructor() {
        var _a;
        super();
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

        .content{
            padding : 0.5em;
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
    }
    connectedCallback() {
    }
    static get observedAttributes() {
        return ['title'];
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
            default: break;
        }
    }
}
customElements.define("gui-collapsible", GuiCollaspible);
