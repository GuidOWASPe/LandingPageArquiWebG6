const video = document.getElementById('inputVideo');
const canvas = document.getElementById('overlay');
const capturePhotoBtn = document.getElementById('capturePhotoBtn');
const photoCanvas = document.getElementById('photo');
const downloadLink = document.getElementById('downloadLink');

// Función para mostrar/ocultar el menú al presionar el botón "Tomar Foto"
document.getElementById('takePhotoBtn').addEventListener('click', function () {
    const menu = document.getElementById('photoMenu');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
});

// Configuración de la cámara
async function setupCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        video.srcObject = stream;
    } catch (err) {
        console.error("Error accessing the camera: ", err);
    }
}

// Carga de modelos de face-api
async function loadModels() {
    const MODEL_URL = '../public/models'; 
    try {
        await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
        await faceapi.loadFaceLandmarkModel(MODEL_URL);
        await faceapi.loadFaceRecognitionModel(MODEL_URL);
        await faceapi.loadFaceExpressionModel(MODEL_URL);
    } catch (err) {
        console.error("Error loading models: ", err);
    }
}

// Función para detectar y dibujar caras
async function onPlay() {
    if (!video.paused && !video.ended) {
        let fullFaceDescriptions = await faceapi.detectAllFaces(video)
            .withFaceLandmarks()
            .withFaceDescriptors()
            .withFaceExpressions();

        const dims = faceapi.matchDimensions(canvas, video, true);
        const resizedResults = faceapi.resizeResults(fullFaceDescriptions, dims);

        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        faceapi.draw.drawDetections(canvas, resizedResults);
        faceapi.draw.drawFaceLandmarks(canvas, resizedResults);
        faceapi.draw.drawFaceExpressions(canvas, resizedResults, 0.05);

        requestAnimationFrame(onPlay);
    }
}

// Captura la foto al presionar "Capturar Foto"
capturePhotoBtn.addEventListener('click', function () {
    const context = photoCanvas.getContext('2d');

    // Asigna el tamaño del video al canvas
    photoCanvas.width = video.videoWidth;
    photoCanvas.height = video.videoHeight;

    // Dibuja el frame actual del video en el canvas
    context.drawImage(video, 0, 0, photoCanvas.width, photoCanvas.height);
    
    // Convertir el canvas a una imagen
    const imageURL = photoCanvas.toDataURL('image/png');
    
    // Crear un enlace de descarga
    downloadLink.href = imageURL; // Establecer la URL de la imagen
    downloadLink.download = 'captura.png'; // Nombre del archivo a descargar
    downloadLink.style.display = 'block'; // Mostrar el enlace de descarga
    downloadLink.textContent = 'Descargar Foto'; // Texto del enlace
});

// Inicialización de la aplicación
async function init() {
    await loadModels();
    await setupCamera();
    video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        onPlay();
    };
}

init();
