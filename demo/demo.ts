import { GuiInputFloat } from "../components/g2_input_float";
import { GuiInputVector } from "../components/g2_input_vector";

let scale = document.querySelector("#scale1") as GuiInputVector;
// console.log(scale);

scale.addEventListener("change", (event : Event)=>{
    console.log((event.target as GuiInputVector).value);
});
let float_input = document.querySelector("#float_input");
float_input?.addEventListener("change", (event)=>{
    console.log((event.target as GuiInputFloat).value)
})

let checkbox1 = document.querySelector("#checkbox1");
checkbox1?.addEventListener("change", (event)=>{
    console.log((event.target as GuiCombobox).value);
});
let combo1 = document.querySelector("#combo1");
combo1?.addEventListener("change", (event)=>{
    let target = event.target as GuiCombobox;
    console.log(target.selectedIndex);
    
    
});