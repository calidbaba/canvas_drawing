const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const colorPicker = document.getElementById("color")
const sizePicker = document.getElementById("size")
let animation
let defaultSize = sizePicker.value
let defaultColor = colorPicker.value
//void ctx.fillRect(x, y, width, height);

class Rect{
    constructor(x, y, size, color) {
        this.x = x
        this.y = y
        this.color = color
        this.toX = 0
        this.toY = 0
        this.size = size
    }
    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y,this.size , this.size)
    }
    clear(){
        ctx.clearRect(this.x, this.y,this.size , this.size)
    }
    moveTo(){
        this.clear()
        let largestDist = largest(Math.abs(this.toX - this.x), Math.abs(this.toY-this.y))
        this.x += (this.toX - this.x)/largestDist
        this.y += (this.toY - this.y)/largestDist
        this.draw()
        //this.might be buggy
        if (this.toY == this.y || this.toX == this.x){
            cancelAnimationFrame(animation)
        }
        else{
            animation = requestAnimationFrame(this.moveTo.bind(this));
        }
    }
}
function largest(a, b){
    if (a > b){
        return a
    }
    else{
        return b
    }
}
ship = new Rect(canvas.width / 2 - defaultSize / 2,canvas.height/2 - defaultSize - 2,defaultSize, defaultColor)
ship.draw()
//get mouse position, canvas does not need to start in 0,0
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
canvas.onclick = (e) => {
    pos = getMousePos(canvas, e)
    ship.toX = pos.x
    ship.toY = pos.y
    // cancelAnimationFrame(animation)
    animation = requestAnimationFrame(ship.moveTo.bind(ship))
}
sizePicker.addEventListener("input", changeSize, false);
function changeSize(e){
    ship.clear()
    ship.size = e.target.value
    ship.draw()
}
colorPicker.addEventListener("input", changeColor, false);
function changeColor(e){
    ship.color = e.target.value
    ship.draw()
}
