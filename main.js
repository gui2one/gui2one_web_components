import { GuiPanel, GuiInputVector, GuiCombobox } from "./build/index.js"

// const { GuiInputVector } = require("./components/g2_input_vector");

let panel = new GuiPanel();
document.body.appendChild(panel);
panel.setAttribute("side", "left");
// console.log(panel);
let vector = new GuiInputVector();
vector.label = "Position";
panel.append(vector);

let combo = new GuiCombobox();
combo.label = "combo test"
combo.addOption("hello");
combo.addOption("GoodBye");
panel.append(combo)
combo.addEventListener("change", ()=>{
    console.log(combo.value);
    console.log(combo.selectedIndex);
})

combo.selectedIndex = 1;