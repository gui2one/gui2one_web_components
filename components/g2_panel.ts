export class GuiPanel extends HTMLElement{
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
                    transition-duration : 0.1s;

                    cursor: default;
                    user-select : none;
                }

                #wrapper.hidden{
                    transform : translate3d(100%,0,0 );
                }

                .panel{
                    position : relative;
                    overflow-y : scroll;
                    height : calc(100% - 50px);
                    width : 100%;
                }
                .panel:after{
                    content : " ";
                    position : absolute;
                    width : 100%;
                    height : 30px;
                }

                .close_btn{
                    position : relative;
                    top : 0;
                    cursor : pointer;
                    height : calc(50px);
                    margin-top : 2px;
                    margin-left : 0px;
                    opacity : 0.5;
                    /* outline : 1px solid white; */
                    width : 100%;
                }

                .close_btn:hover{
                    opacity : 0.25;
                }

                .close_btn::before{
                    content : '';
                    position : absolute;
                    top : 0; 
                    left : 0;
                    width : 4px;
                    height : 100%;
                    border-radius : 5px;
                    background-color : #eee;
                    transform-origin : 50% 50%;
                    transform :  translateX(20px) rotate(45deg);
                }
                .close_btn::after{
                    content : '';
                    position : absolute;
                    top : 0; 
                    left : 0;
                    width : 4px;
                    height : 100%;
                    border-radius : 5px;
                    background-color : #eee;
                    transform-origin : 50% 50%;
                    transform : translateX(20px) rotate(-45deg);
                }

                .open_btn{
                    display : flex;
                    align-items : center;
                    justify-content : center;
                    font-weight : bold;
                    font-size : 2em;
                    position : absolute;
                    width : 25px;
                    height : 25px;
                    background-color : transparent; 
                    opacity : 0.5;
                    filter : drop-shadow(2px 2px 2px pink);
                    top : 0;
                    left : 0;  
                    z-index : 2;
                    margin-left : -25px;
                    visibility : hidden;
                }

                #wrapper.hidden>.open_btn{
                    visibility : visible;
                }
            </style>
        `;
        
        const template = String.raw`
            
            ${styles}
            <!-- <div id="wrapper" oncontextmenu="return false;"> -->
            <div id="wrapper" >
                <div class="open_btn">&lt;</div>
                <div class="close_btn"></div>
                <div class="panel">
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