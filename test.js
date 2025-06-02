let spinRadius;

document.onmousemove = function(e){
  if(isMouseDown == true){
  spinRadius = e.clientX;
    document.getElementById('body').style.transform = `rotateY(${spinRadius}deg) rotateX(25deg) translateY(-100px)`;
  }
}

var isMouseDown;
document.onmousedown = function(e){
  isMouseDown = true;
}
document.onmouseup = function(e){
  isMouseDown = false
}