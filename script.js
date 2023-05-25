const panel = document.querySelector('#panel');
let param = window.location.search;
var slider = document.getElementById("myRange");
var tooltip = document.getElementsByClassName("tooltip");
var form = document.getElementsByClassName("form");
let number = [0, 1, 2, 9];

const equalsCheck = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
}

slider.onmousemove = e => {
    tooltip[0].style.paddingLeft = `${slider.value * 9.4}%`;
    tooltip[0].innerText = slider.value;
    tooltip[0].style.opacity = 1;
}
slider.onmouseleave = e => {
    tooltip[0].style.opacity = 0;
}

if (param.includes("success=true")) {
    form[0].style.display = 'none';
    panel.style.display = 'block';
    console.log(slider.value);
}

if(param.includes("something=true")){
    console.log("something")
}

for (let index = 0; index < 10; index++) {
    const button = document.createElement("div");
    button.innerText = index + 1;
    button.className = "buttons number-" + index;
    panel.appendChild(button);
}
const buttons = document.getElementsByClassName("buttons");
for (let index = 0; index < buttons.length; index++) {
    const button = document.getElementsByClassName("number-" + (index))[0];
    buttons[index].onmousedown = function () {
        button.classList.toggle("active");
    }
}

for (let index = 0; index < buttons.length; index++) {
    const button = document.getElementsByClassName("number-" + (index))[0];
    // console.log(button.classList[1])
    button.classList.forEach(element => {
        number.forEach(el => {
            if (element[7] == el) {
                button.classList.toggle("available");
            }
        })
    });
}