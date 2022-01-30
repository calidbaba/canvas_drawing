const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
//void ctx.fillRect(x, y, width, height);

class Rect{
    constructor(x, y, width,height) {
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.toX = 0
        this.toY = 0
    }
    draw(color){
        ctx.fillStyle = color
        ctx.fillRect(this.x, this.y,this.width , this.height)
    }
    moveTo(){
        ctx.clearRect(this.x, this.y,this.width , this.height)
        let largestDist = largest(Math.abs(this.toX - this.x), Math.abs(this.toY-this.y))
        this.x += (this.toX - this.x)/largestDist
        this.y += (this.toY - this.y)/largestDist
        this.draw("red")
        //this.might be buggy
        if (this.toY == this.y){
            return
        }
        window.requestAnimationFrame(this.moveTo.bind(this));
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
ship = new Rect(10,10,10,10)
ship.draw("red")
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
    console.log("click")
    ship.toX = pos.x
    ship.toY = pos.y
    window.requestAnimationFrame(ship.moveTo.bind(ship))
}

