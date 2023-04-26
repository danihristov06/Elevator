const panel = document.querySelector('#panel');
var slider = document.getElementById("myRange");
var tooltip = document.getElementsByClassName("tooltip");

slider.onmousemove = e => {
        tooltip[0].style.paddingLeft = `${slider.value*9.4}%`;
        tooltip[0].innerText = slider.value;
        tooltip[0].style.opacity = 1;
    }
    slider.onmouseleave = e => {
        tooltip[0].style.opacity = 0;
}


for (let index = 1; index <= 10; index++) {
    const button = document.createElement("div");
    button.innerText = index;
    button.className = "buttons number-" + index;
    panel.appendChild(button);
}
const buttons = document.getElementsByClassName("buttons");
for (let index = 0; index < buttons.length; index++) {
    const button = document.getElementsByClassName("number-" + (index + 1))[0];
    buttons[index].onmousedown = function() {
        button.classList.toggle("active");
    }
}

for (let index = 0; index < buttons.length; index++) {
    const button = document.getElementsByClassName("number-" + (index + 1))[0];
    console.log(button.className);
    if(button.className <= "buttons number-1"){ // if user has access add available tag
        button.classList.toggle("available");
    }
}