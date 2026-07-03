// =====================================================
// TWIBBON MPLS SMPN 27 BALIKPAPAN 2026
// Version 2.1
// By ChatGPT
// =====================================================

// ======================
// ELEMENT
// ======================

const upload = document.getElementById("upload");
const uploadBtn = document.getElementById("uploadBtn");
const downloadBtn=document.getElementById("downloadBtn");
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");
const waBtn = document.getElementById("waBtn");
const copyBtn=document.getElementById("copyBtn");

const photo = document.getElementById("photo");
const frame = document.getElementById("frame");

const exportCanvas = document.getElementById("exportCanvas");
const ctx = exportCanvas.getContext("2d");

const editor = document.querySelector(".editor");
const zoomIn = document.getElementById("zoomIn");
const zoomOut = document.getElementById("zoomOut");

const rotateLeft = document.getElementById("rotateLeft");
const rotateRight = document.getElementById("rotateRight");

// ======================
// PHOTO STATE
// ======================

let scale = 1;
let rotation = 0;

let posX = 0;

let posY = 0;

let startX = 0;

let startY = 0;

let dragging = false;


// ukuran asli foto

let photoWidth = 0;

let photoHeight = 0;


// ======================
// UPDATE PREVIEW
// ======================

function updateTransform(){

photo.style.transform = `
translate(calc(-50% + ${posX}px), calc(-50% + ${posY}px))
scale(${scale})
rotate(${rotation}deg)
`;

}


// ======================
// AUTO FIT
// ======================

function autoFit(){

    // ukuran area foto pada twibbon
    const frameWidth = editor.clientWidth * 0.495;
    const frameHeight = editor.clientHeight * 0.495;

    // posisi tengah area foto
    const frameCenterX = editor.clientWidth * 0.375;
    const frameCenterY = editor.clientHeight * 0.505;

    // hitung skala supaya foto memenuhi area
    scale = Math.max(
        frameWidth / photoWidth,
        frameHeight / photoHeight
    );

    // geser otomatis ke tengah area foto
    posX = frameCenterX - (editor.clientWidth / 2);
    posY = frameCenterY - (editor.clientHeight / 2);

    updateTransform();

}
// ======================
// UPLOAD FOTO
// ======================

uploadBtn.addEventListener("click", () => {

    upload.click();

});


upload.addEventListener("change", function(e){

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(ev){

        photo.onload = function(){

            photoWidth = photo.naturalWidth;

            photoHeight = photo.naturalHeight;

            photo.style.display = "block";

            autoFit();

        }

        photo.src = ev.target.result;

    }

    reader.readAsDataURL(file);

});


// ======================
// DRAG FOTO
// ======================

photo.addEventListener("mousedown", function(e){

    dragging = true;

    startX = e.clientX - posX;

    startY = e.clientY - posY;

    photo.style.cursor = "grabbing";

});


window.addEventListener("mouseup", function(){

    dragging = false;

    photo.style.cursor = "grab";

});


window.addEventListener("mousemove", function(e){

    if(!dragging) return;

    posX = e.clientX - startX;

    posY = e.clientY - startY;

    updateTransform();

});


// ======================
// ZOOM MOUSE
// ======================

editor.addEventListener("wheel", function(e){

    e.preventDefault();

    if(photo.style.display=="none") return;

    const zoomSpeed = 0.08;

    if(e.deltaY<0){

        scale += zoomSpeed;

    }else{

        scale -= zoomSpeed;

    }

    if(scale<0.15) scale=0.15;

    if(scale>8) scale=8;

    updateTransform();

});
zoomIn.addEventListener("click",()=>{

scale += 0.05;

if(scale>8) scale=8;

updateTransform();

});

zoomOut.addEventListener("click",()=>{

scale -= 0.05;

if(scale<0.15) scale=0.15;

updateTransform();

});
rotateLeft.addEventListener("click",()=>{

rotation -= 1;

updateTransform();

});

rotateRight.addEventListener("click",()=>{

rotation += 1;

updateTransform();

});
// ======================
// DOWNLOAD PNG
// ======================

downloadBtn.addEventListener("click", function(){

    if(photo.style.display=="none"){

        alert("Silakan upload foto terlebih dahulu.");

        return;

    }

    // Bersihkan canvas
    ctx.clearRect(0,0,1280,1280);

    // Ukuran editor yang tampil di browser
    const editorWidth = editor.clientWidth;
    const editorHeight = editor.clientHeight;

    // Rasio editor ke canvas export
    const ratioX = 1280 / editorWidth;
    const ratioY = 1280 / editorHeight;

    // Hitung ukuran foto sesuai preview
    const drawWidth = photoWidth * scale * ratioX;
    const drawHeight = photoHeight * scale * ratioY;

    // Hitung posisi tengah editor
    const centerX = editorWidth / 2;
    const centerY = editorHeight / 2;

    // Posisi foto pada canvas export
    const drawX = (centerX + posX - (photoWidth * scale)/2) * ratioX;
    const drawY = (centerY + posY - (photoHeight * scale)/2) * ratioY;

    // Gambar foto
    const exportPhoto = new Image();

    exportPhoto.onload = function(){


    ctx.save();

    // Pindahkan titik putar ke tengah foto
    ctx.translate(
        drawX + drawWidth / 2,
        drawY + drawHeight / 2
    );

    // Rotasi sesuai preview
    ctx.rotate(rotation * Math.PI / 180);

    // Gambar foto
    ctx.drawImage(
        exportPhoto,
        -drawWidth / 2,
        -drawHeight / 2,
        drawWidth,
        drawHeight
    );

    ctx.restore();

    // Gambar frame di atas foto
    const exportFrame = new Image();

        exportFrame.onload = function(){

            ctx.drawImage(

                exportFrame,

                0,

                0,

                1280,

                1280

            );

            // Download
            const link = document.createElement("a");

            link.download = "Twibbon_MPLS_SMPN27_2026.png";

            link.href = exportCanvas.toDataURL("image/png");

            link.click();

        }

        exportFrame.src = "assets/twibbon.png";

    }

    exportPhoto.src = photo.src;

});
// ======================
// COPY CAPTION
// ======================

copyBtn.addEventListener("click", async function () {

const caption = `🎉 HALO, TEMAN BARU! 🎉

Perkenalkan Nama Saya ___________

Dengan bangga saya siap menjadi bagian dari keluarga besar SMP Negeri 27.

📚 Siap belajar.
🤝 Siap berteman.
🌟 Siap berprestasi.
💙 Siap mengikuti MPLS Ramah 2026 dengan semangat, disiplin, dan saling menghargai.

Mari memulai perjalanan baru di sekolah yang Unggul dalam Adab dan Ilmu.

.

.

#MPLSRamah2026
#MPLS
#SMPNegeri27Bpn
#SiswaBaru
#SekolahRamah
#SekolahAntiPerundungan
#GenerasiBerkarakter
#SpandujuUnggulDalamAdabDanIlmu`;

try {

    await navigator.clipboard.writeText(caption);

    alert("✅ Caption berhasil disalin.\n\nSilakan paste ke Instagram.");

} catch (e) {

    alert("Browser tidak mengizinkan menyalin otomatis.");

}

});
// ======================
// BACKGROUND MUSIC
// ======================

let playing = false;

musicBtn.addEventListener("click", function(){

    if(!playing){

        bgMusic.play();

        musicBtn.innerHTML = "⏸ Hentikan Musik";

        playing = true;

    }else{

        bgMusic.pause();

        musicBtn.innerHTML = "🎵 Putar Musik";

        playing = false;

    }

});
// ======================
// JOIN WHATSAPP
// ======================

waBtn.addEventListener("click", function(){

    window.open(

        "https://chat.whatsapp.com/KFSiapywGf119iNbeWLWUc",

        "_blank"

    );

});