"use strict";
class GuiPanel extends HTMLElement {
    constructor() {
        var _a;
        super();
        this.attachShadow({ mode: "open" });
        const styles = String.raw `
            <style>

                #wrapper{
                    position : absolute;
                    top : 0px;
                    right : 0px;
                    padding : 0.5em;
                    overflow-y : scroll;
                    /* outline : 1px solid red; */
                    box-shadow : -2px 2px 8px #0001;
                    max-height : 100vh;
                }
            </style>
        `;
        const template = String.raw `
            
            ${styles}

            <div id="wrapper">
                <slot></slot>
            </div>
        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(this.template_fragment.cloneNode(true));
    }
}
customElements.define("gui-panel", GuiPanel);
