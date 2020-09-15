var random = Math.floor(Math.random() * 99)

var meme = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.imgflip.com/get_memes",
    "method": "GET"
}

var canvas;
var ctx;
var imgsrc;
var topTextI;
var bottomTextI;

$.ajax(meme).done(function (response) {
    var data = JSON.parse(JSON.stringify(response.data.memes[random]));
    document.getElementsByName("topText")[0].value = "Top";
    document.getElementsByName("bottomText")[0].value = "Bottom";
    imgsrc = data.url;
    draw("Top", "Bottom");
});

function draw(t, b){
    topTextI = t;
    bottomTextI = b;
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    var img = new Image();
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        ctx.font = "40px Times New Roman";
        ctx.fillStyle = "white";
        if (t) {
            ctx.textAlign = "center";
            ctx.fillText(t, canvas.width / 2, 50);
        }
        if (b) {
            ctx.textAlign = "center";
            ctx.fillText(b, canvas.width / 2, canvas.height - 50);
        }
    }
    img.crossOrigin = "anonymous";
    img.src = imgsrc;
}

function topText() {
    var text = document.getElementsByName('topText')[0].value;
    draw(text, bottomTextI);
}

function bottomText() {
    var text = document.getElementsByName('bottomText')[0].value;
    draw(topTextI, text);
}

function generateMeme(){
    var imgURL = canvas.toDataURL();
    var finalMeme = document.getElementById("finalMeme");
    finalMeme.style.visibility = "visible";
    finalMeme.src = imgURL;
}