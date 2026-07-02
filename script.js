const upload=document.getElementById("upload");
const uploadBtn=document.getElementById("uploadBtn");
const photo=document.getElementById("photo");

let scale=1;
let posX=0;
let posY=0;

let isDragging=false;

let startX=0;
let startY=0;


// Upload

uploadBtn.onclick=()=>upload.click();

upload.onchange=(e)=>{

const file=e.target.files[0];

if(!file)return;

photo.src=URL.createObjectURL(file);

photo.style.display="block";

scale=1;
posX=0;
posY=0;

updateTransform();

}


// Update

function updateTransform(){

photo.style.transform=
`translate(${posX}px,${posY}px)
 scale(${scale})`;

}


// Mouse Drag

photo.onmousedown=(e)=>{

isDragging=true;

startX=e.clientX-posX;

startY=e.clientY-posY;

photo.style.cursor="grabbing";

}

document.onmouseup=()=>{

isDragging=false;

photo.style.cursor="grab";

}

document.onmousemove=(e)=>{

if(!isDragging)return;

posX=e.clientX-startX;

posY=e.clientY-startY;

updateTransform();

}


// Zoom

photo.onwheel=(e)=>{

e.preventDefault();

if(e.deltaY<0){

scale+=0.05;

}else{

scale-=0.05;

}

if(scale<0.2)scale=0.2;

if(scale>5)scale=5;

updateTransform();

}
// ===============================
// DOWNLOAD
// ===============================

const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.onclick = function () {

    if (!photo.src) {
        alert("Silakan upload foto terlebih dahulu.");
        return;
    }

    const canvas = document.getElementById("exportCanvas");
    const ctx = canvas.getContext("2d");

    // Bersihkan canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gambar foto
    const imgPhoto = new Image();
    imgPhoto.crossOrigin = "anonymous";

    imgPhoto.onload = function () {

        // Ambil ukuran editor
        const editor = document.querySelector(".editor");

        const scaleX = canvas.width / editor.clientWidth;
        const scaleY = canvas.height / editor.clientHeight;

        // Hitung posisi foto
        const x = posX * scaleX;
        const y = posY * scaleY;

        const w = editor.clientWidth * scale * scaleX;
        const h = editor.clientHeight * scale * scaleY;

        ctx.drawImage(imgPhoto, x, y, w, h);

        // Gambar frame di atas foto
        const frameImg = new Image();

        frameImg.onload = function () {

            ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

            // Download
            const link = document.createElement("a");

            link.download = "Twibbon_MPLS_SMPN27_2026.png";

            link.href = canvas.toDataURL("image/png");

            link.click();

        }

        frameImg.src = "assets/twibbon.png";

    }

    imgPhoto.src = photo.src;

}