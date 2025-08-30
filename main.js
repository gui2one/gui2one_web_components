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

let panel = new GuiPanel();
panel.side = "left";
panel.closed = true;
document.body.appendChild(panel);
panel.addEventListener("close", () => console.log("closed"));
panel.addEventListener("open", () => console.log("open"));
// console.log(panel);
let vector = new GuiInputVector();
vector.label = "Position";
panel.append(vector);

let range = new GuiInputRange();
range.label = "Range";
panel.append(range);
range.min = 0.0;
range.max = 10.0;
range.step = 0.01;
range.value = 5.0;

range.on_click = (event) => {
  console.log(event);
  console.log(event.target.value);
};
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
let combo2 = new GuiCombobox();
combo2.label = "";
combo2.addOption("hello", "world");
combo2.addOption("GoodBye");
grp.append(combo2);

combo2.selectedIndex = 1;
