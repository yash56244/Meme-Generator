var random = Math.floor(Math.random() * 99)

var meme = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.imgflip.com/get_memes",
    "method": "GET"
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var imgsrc;
var texts = [];

$.ajax(meme).done(function (response) {
    var data = JSON.parse(JSON.stringify(response.data.memes[random]));
    document.getElementsByName("topText")[0].value = "Top";
    document.getElementsByName("bottomText")[0].value = "Bottom";
    imgsrc = data.url;
    init();
});

function init(){
    var text = {
        x : 100,
        y : 50,
        selected : false,
        text : "Top"
    }
    texts.push(text);
    var text = {
        x : 100,
        y : 100,
        selected : false,
        text : "Bottom"
    }
    texts.push(text);
    draw();
}

function draw(){
    texts[0].width = ctx.measureText(texts[0].text).width;
    texts[1].width = ctx.measureText(texts[1].text).width;
    var img = new Image();
    img.onload = function () {
        ctx.drawImage(img, 0, 0, 500, 500);
        ctx.font = "40px Times New Roman";
        ctx.fillStyle = "black";
        if (texts[0].text) {
            ctx.textAlign = "center";
            ctx.fillText(texts[0].text, texts[0].x, texts[0].y);
        }
        if (texts[1].text) {
            ctx.textAlign = "center";
            ctx.fillText(texts[1].text, texts[1].x, texts[1].y);
        }
    }
    img.crossOrigin = "anonymous";
    img.src = imgsrc;
}

function topText() {
    var text = document.getElementsByName('topText')[0].value;
    texts[0].text = text;
    draw();
}

function bottomText() {
    var text = document.getElementsByName('bottomText')[0].value;
    texts[1].text = text;
    draw();
}

function generateMeme(){
    var imgURL = canvas.toDataURL();
    var finalMeme = document.getElementById("finalMeme");
    finalMeme.style.visibility = "visible";
    finalMeme.src = imgURL;
}

var startX;
var startY;

function handleMouseDown(e){
    e.preventDefault();
    startX = parseInt(e.clientX - canvas.offsetLeft);
    startY = parseInt(e.clientY - canvas.offsetTop);
    console.log(startX, canvas.offsetLeft, texts[0].x);
    for(let i = 0; i < texts.length; i++){
        if(startX >= texts[i].x - texts[i].width/2 && startX <= texts[i].x + texts[i].width/2 && startY >= texts[i].y - 40 && startY <= texts[i].y){
            texts[i].selected = true;
        }
    }
}

function handleMouseMove(e){
    e.preventDefault();
    if(texts[0].selected || texts[1].selected){
        var dx = parseInt(e.clientX - canvas.offsetLeft) - startX;
        var dy = parseInt(e.clientY - canvas.offsetTop) - startY;
        startX = parseInt(e.clientX - canvas.offsetLeft);
        startY = parseInt(e.clientY - canvas.offsetTop);
        for(let i = 0; i < texts.length; i++){
            if(texts[i].selected){
                texts[i].x += dx;
                texts[i].y += dy;
            }
        }
        draw();
    }
}

function handleMouseUp(e){
    e.preventDefault();
    for(let i = 0; i < texts.length; i++){
        if(texts[i].selected){
            texts[i].selected = false;
        }
    }
}

function handleMouseOut(e){
    e.preventDefault();
    for(let i = 0; i < texts.length; i++){
        if(texts[i].selected){
            texts[i].selected = false;
        }
    }
}

document.getElementById("canvas").addEventListener("mousedown", function(e){
    handleMouseDown(e);
})

document.getElementById("canvas").addEventListener("mousemove", function(e){
    handleMouseMove(e);
})

document.getElementById("canvas").addEventListener("mouseup", function(e){
    handleMouseUp(e);
})

document.getElementById("canvas").addEventListener("mouseout", function(e){
    handleMouseOut(e);
})