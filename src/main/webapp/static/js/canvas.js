var c = document.getElementById('myCanvas');
console.log('my canvas: ' + c);
var ctx=c.getContext("2d");
ctx.fillStyle="#FF0000";
ctx.fillRect(0,0,150,75);