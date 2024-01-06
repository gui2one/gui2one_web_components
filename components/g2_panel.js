"use strict";
class GuiPanel extends HTMLElement {
    constructor() {
        var _a, _b, _c, _d;
        super();
        this.attachShadow({ mode: "open" });
        const styles = String.raw `
            <style>
                .panel{
                    --scrollbar-width : 8px;
                    --scrollbar-track-color : darkgray;
                    --scrollbar-thumb-color : gray;
                }
                        /* For WebKit browsers (Chrome, Safari) */
                        ::-webkit-scrollbar {
                            width: var(--scrollbar-width);
                        }

                        ::-webkit-scrollbar-thumb {
                            background-color: var(--scrollbar-thumb-color);
                            border-radius: 6px;
                        }

                        ::-webkit-scrollbar-track {
                            background-color: var(--scrollbar-track-color);
                        }

                        /* For Firefox */
                        * {
                            scrollbar-color: var(--scrollbar-thumb-color) var(--scrollbar-track-color);
                        }

                        *::-webkit-scrollbar {
                            width: var(--scrollbar-width);
                        }

                        *::-webkit-scrollbar-thumb {
                            background-color: var(--scrollbar-thumb-color);
                            border-radius: 6px;
                        }

                        *::-webkit-scrollbar-track {
                            background-color: var(--scrollbar-track-color);
                        }                
                #wrapper{
                    position : fixed;
                    top : 0px;
                    right : 0px;
                    padding : 0.5em;
                    padding-bottom : 0;
                    padding-top : 0;

                    box-shadow : -2px 2px 8px #0001;
                    border-radius : 0 0 0 3px;
                    height : 100%;
                    max-height : 100%;
                    color : white;
                    background-color : #111;

                    transition : transform;
                    transition-duration : 0.2s;

                    cursor: default;
                    user-select : none;
                }

                #wrapper.hidden{
                    transform : translate3d(100%,0,0 );
                }

                .panel{
                    position : relative;
                    overflow-y : auto;
                    height : calc(100% - 20px);
                }
                .panel:after{
                    content : " ";
                    position : absolute;
                    width : 100%;
                    height : 5px;
                }

                .close_btn{
                    position : relative;
                    cursor : pointer;
                    height : 20px;
                }

                .close_btn:hover{
                    opacity : 0.5;
                }

                .open_btn{
                    position : absolute;
                    width : 25px;
                    height : 25px;
                    background-color : red; 
                    top : 0;
                    left : 0;  
                    z-index : 2;
                    margin-left : -25px;
                }
            </style>
        `;
        const template = String.raw `
            
            ${styles}
            <div id="wrapper">
                <div class="open_btn"></div>
                <div class="close_btn">X</div>
                <div class="panel">
                    <slot></slot>
                </div>
            </div>
        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(this.template_fragment.cloneNode(true));
        let close_btn = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector(".close_btn");
        let open_btn = (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector(".open_btn");
        let wrapper = (_d = this.shadowRoot) === null || _d === void 0 ? void 0 : _d.querySelector("#wrapper");
        close_btn === null || close_btn === void 0 ? void 0 : close_btn.addEventListener("click", (event) => {
            wrapper.classList.add("hidden");
        });
        open_btn === null || open_btn === void 0 ? void 0 : open_btn.addEventListener("click", (event) => {
            wrapper.classList.remove("hidden");
        });
        document.addEventListener("keypress", (event) => {
            if (event.key === "h") {
                wrapper.classList.toggle("hidden");
            }
        });
    }
}
customElements.define("gui-panel", GuiPanel);
