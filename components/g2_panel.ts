import { defineComponent } from "./utils";

export class GuiPanel extends HTMLElement {
  template_fragment: DocumentFragment;
  wrapper_el: HTMLDivElement;
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    const styles = String.raw`
            
            <style>
                :host{
                    position : absolute;
                    z-index : 2;
                    
                    color : green;
                }
                .panel{
                    --scrollbar-width : 8px;
                    --scrollbar-track-color : transparent;
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
                    min-width : 300px;
                    color : white;
                    background-color : #111;

                    transition : transform;
                    transition-duration : 0.1s;

                    cursor: default;
                    user-select : none;
                }

                #wrapper.left{
                    left : 0px;
                    right : unset;
                }

                #wrapper.hidden{
                    transform : translate3d(100%,0,0 );
                }
                
                #wrapper.left.hidden{
                    
                    transform : translate3d(-100%,0,0 );
                }

                .panel{
                    position : relative;
                    overflow-y : auto;
                    height : calc(100% - 50px - 2em);
                    width : 100%;
                    padding-top : 2em;
                }
                .panel:after{
                    content : " ";
                    position : absolute;
                    width : 100%;
                    height : 30px;
                }

                #wrapper .close_btn{
                    position : relative;
                    top : 0;
                    cursor : pointer;
                    height : calc(30px);
                    margin-top : 5px;
                    opacity : 0.5;
                }

                #wrapper.left .close_btn{
                    right : 0px;
                    width : 25px;
                    margin-left : auto;
                }
    
                #wrapper .close_btn:hover{
                    opacity : 1.0;
                }

                #wrapper .close_btn::before{
                    content : '';
                    position : absolute;
                    top : 0; 
                    left : 0;
                    width : 4px;
                    height : 100%;
                    border-radius : 5px;
                    background-color : #eee;
                    transform-origin : 50% 50%;
                    transform :  translateX(10px) rotate(45deg);
                }
                #wrapper .close_btn::after{
                    content : '';
                    position : absolute;
                    top : 0; 
                    left : 0;
                    width : 4px;
                    height : 100%;
                    border-radius : 5px;
                    background-color : #eee;
                    transform-origin : 50% 50%;
                    transform : translateX(10px) rotate(-45deg);
                }



                #wrapper .open_btn{
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
                    cursor : pointer;
                }
                #wrapper .open_btn:hover{
                    opacity : 0.9;
                    color : red;
                }

                #wrapper.left .open_btn{
                    left : unset;
                    right : -25px;
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
    this.template_fragment = document
      .createRange()
      .createContextualFragment(template);
    this.shadowRoot?.appendChild(this.template_fragment.cloneNode(true));

    let close_btn = this.shadowRoot?.querySelector(".close_btn");
    let open_btn = this.shadowRoot?.querySelector(".open_btn");
    this.wrapper_el = this.shadowRoot?.querySelector(
      "#wrapper"
    ) as HTMLDivElement;
    close_btn?.addEventListener("click", (event: Event) => {
      this.closed = true;
    });
    open_btn?.addEventListener("click", (event: Event) => {
      this.closed = false;
    });

    document.addEventListener("keypress", (event) => {
      if (event.key === "h") {
        this.wrapper_el!.classList.toggle("hidden");
      }
    });
  }

  connectedCallback() {}

  static get observedAttributes() {
    return ["side", "closed"];
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    switch (name) {
      case "side":
        this.side = newValue;
        break;
      case "closed":
        if (newValue === "true" || newValue === "") {
          this.closed = true;
        } else {
          this.closed = false;
        }
        break;
    }
  }

  set side(val: string) {
    if (val === "left") {
      this.wrapper_el.classList.remove("right");
      this.wrapper_el.classList.add("left");
    } else if (val === "right") {
      this.wrapper_el.classList.remove("left");
      this.wrapper_el.classList.add("right");
    }
  }

  get closed() {
    return this.wrapper_el.classList.contains("hidden");
  }
  set closed(val: boolean) {
    if (val) {
      this.wrapper_el.classList.add("hidden");
      this.dispatchEvent(new Event("close"));
    } else {
      this.wrapper_el.classList.remove("hidden");
      this.dispatchEvent(new Event("open"));
    }
  }
}

defineComponent("gui-panel", GuiPanel);
