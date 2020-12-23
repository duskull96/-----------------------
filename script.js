"use strict"

const btnDraw = document.querySelector('#draw-pic'),
    btnDeleteDef = document.querySelector('#delete-def');

const canvas = document.querySelector('canvas');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const dot = canvas.getContext("2d");
const pos = canvas.getContext("2d");

const posSize = [5,4,3,2,1]
const def = []

def.forEach(item => {
    pos.fillRect(item.x, item.y, 5, 5)
})

let x = 700, y = 300;


canvas.onclick = function (event) {
    let defPos = getCoords(event);
    pos.fillStyle = 'red'
    if (def.length < 3) {
        btnDeleteDef.classList.remove('disabled')
        if (def.length == 2) {
            btnDraw.classList.remove('disabled')
        }
        def.push(defPos);
    }

    def.forEach(item => {
        pos.fillRect(item.x, item.y, 5, 5)
    })
}

function getCoords(event) {
    let rect = event.target.getBoundingClientRect();
    let xMousePos = event.clientX - rect.left;
    let yMousePos = event.clientY - rect.top;
    return {
        x: xMousePos,
        y: yMousePos
    };
}

function deleteDef() {
    def.splice(0, def.length);
    btnDeleteDef.classList.add('disabled');
    btnDraw.classList.add('disabled');
    pos.clearRect(0, 0, canvas.width, canvas.height);
}

function startDraw() {
    let countDots = document.querySelector('.count-dots').value;
    $('select').formSelect();
    let posSizeIndex = Number($('select').formSelect('getSelectedValues').join())
    for (let i = 0; i < countDots; i++) {
        let index = rndInt(0, def.length - 1)
        
        dot.fillStyle = 'black';
        dot.fillRect(x, y, posSize[posSizeIndex-1], posSize[posSizeIndex-1])
        x < def[index].x ? x = (Math.abs(x - def[index].x) / 2) + x :
            x = (Math.abs(x - def[index].x) / 2) + def[index].x

        y < def[index].y ? y = (Math.abs(y - def[index].y) / 2) + y :
            y = (Math.abs(y - def[index].y) / 2) + def[index].y
       
    }
}

function rndInt(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}


btnDeleteDef.addEventListener('click', deleteDef);
btnDraw.addEventListener('click', startDraw);
