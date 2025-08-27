import {
  GuiPanel,
  GuiInputVector,
  GuiCombobox,
  GuiSpacer,
  GuiGroup,
  GuiButton,
  GuiRow,
  GuiInputRange,
} from "./build/index.js";

// const { GuiInputVector } = require("./components/g2_input_vector");

let panel = new GuiPanel();
document.body.appendChild(panel);
panel.setAttribute("side", "left");
// console.log(panel);
let vector = new GuiInputVector();
vector.label = "Position";
panel.append(vector);

let range = new GuiInputRange();
range.label = "Range";
panel.append(range);
let spacer = new GuiSpacer();
spacer.height = 100;
panel.append(spacer);

let row = new GuiRow();
panel.append(row);
let btn = new GuiButton();
btn.label = "Press me";
btn.callback = () => console.log("pressed");
row.append(btn);
let btn2 = new GuiButton();
btn2.label = "Press me";
row.append(btn2);
let grp = new GuiGroup();
grp.label = "Group";
panel.append(grp);
let combo = new GuiCombobox();
combo.label = "combo test";
combo.addOption("hello", "world");
combo.addOption("GoodBye");
grp.append(combo);
combo.addEventListener("change", () => {
  let opt = combo.options[combo.selectedIndex];
  console.log(opt.value);
  // console.log(combo);
  // console.log(combo.selectedIndex);
});

combo.selectedIndex = 1;
