class GuiPanel extends HTMLElement{
    template_fragment : DocumentFragment;
    constructor()
    {
        super();
        this.attachShadow({mode : "open"});
        const styles = String.raw`
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
                    height : 100%;
                }
                .panel:after{
                    content : " ";
                    position : absolute;
                    width : 100%;
                    height : 30px;
                }
                .close_btn{
                    cursor : pointer;
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
        
        const template = String.raw`
            
            ${styles}
            <div id="wrapper">
                <div class="open_btn"></div>
                <div class="panel">
                    <div class="close_btn">X</div>
                    <slot></slot>
                </div>
            </div>
        `;
        this.template_fragment = document.createRange().createContextualFragment(template);
        this.shadowRoot?.appendChild(this.template_fragment.cloneNode(true));

        let close_btn = this.shadowRoot?.querySelector(".close_btn");
        let open_btn = this.shadowRoot?.querySelector(".open_btn");
        let wrapper = this.shadowRoot?.querySelector("#wrapper");
        close_btn?.addEventListener("click", (event : Event)=>{
            wrapper!.classList.add("hidden");
        });
        open_btn?.addEventListener("click", (event : Event)=>{
            wrapper!.classList.remove("hidden");
        });

        document.addEventListener("keypress", (event)=>{
            if(event.key === "h")
            {
                wrapper!.classList.toggle("hidden");
            }
        });
   
    }


}

customElements.define("gui-panel", GuiPanel);