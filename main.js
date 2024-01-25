// import { GuiPanel } from "./build/index.js"

// const { GuiInputVector } = require("./components/g2_input_vector");

let panel = new GuiPanel();
panel.setAttribute("side", "left");
console.log(panel);
let vector = new GuiInputVector();
vector.label = "Position";
panel.appendChild(vector)
document.body.appendChild(panel);