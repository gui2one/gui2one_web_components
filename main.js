import {
  GuiPanel,
  GuiInputVector,
  GuiCombobox,
  GuiSpacer,
} from "./build/index.js";

// const { GuiInputVector } = require("./components/g2_input_vector");

let panel = new GuiPanel();
document.body.appendChild(panel);
panel.setAttribute("side", "left");
// console.log(panel);
let vector = new GuiInputVector();
vector.label = "Position";
// panel.append(vector);

let spacer = new GuiSpacer();
spacer.height = 42;
panel.append(spacer);

let combo = new GuiCombobox();
combo.label = "combo test";
combo.addOption("hello", "world");
combo.addOption("GoodBye");
panel.append(combo);
combo.addEventListener("change", () => {
  let opt = combo.options[combo.selectedIndex];
  console.log(opt.value);
  // console.log(combo);
  // console.log(combo.selectedIndex);
});

combo.selectedIndex = 1;
