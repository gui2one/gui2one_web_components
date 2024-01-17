let scale = document.querySelector("#scale1");
// console.log(scale);
scale.value = [1, 2, 3];
scale.addEventListener("change", (event) => {
    console.log(event.target.value);
});
let float_input = document.querySelector("#float_input");
float_input === null || float_input === void 0 ? void 0 : float_input.addEventListener("change", (event) => {
    console.log(event.target.value);
});
let checkbox1 = document.querySelector("#checkbox1");
checkbox1 === null || checkbox1 === void 0 ? void 0 : checkbox1.addEventListener("change", (event) => {
    console.log(event.target.value);
});
let combo1 = document.querySelector("#combo1");
combo1 === null || combo1 === void 0 ? void 0 : combo1.addEventListener("change", (event) => {
    let target = event.target;
    console.log(target.selectedIndex);
});
export {};
