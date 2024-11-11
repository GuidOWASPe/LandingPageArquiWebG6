from flask import Flask, jsonify, request
from flask_cors import CORS
import cv2
import mediapipe as mp

app = Flask(__name__)
CORS(app)

mp_face_mesh = mp.solutions.face_mesh
mp_drawing = mp.solutions.drawing_utils

def calcular_aspecto_rostro(landmarks):
    # Código para calcular el aspecto del rostro
    x1 = landmarks[1][0] 
    x2 = landmarks[15][0]
    ancho_rostro = abs(x2 - x1)
    y1 = landmarks[8][1]
    y2 = landmarks[27][1]
    alto_rostro = abs(y2 - y1)
    return ancho_rostro / alto_rostro

def identificar_forma_rostro(aspecto):
    if aspecto > 1.7:
        return "Cara alargada", "La longitud de la cara es mayor que el ancho."
    elif 1.5 < aspecto <= 1.7:
        return "Cara rectangular", "La longitud de la cara es mayor que el ancho, pero no tanto como en una cara alargada."
    elif 1.3 < aspecto <= 1.5:
        return "Cara ovalada", "La longitud de la cara es mayor que el ancho, pero no tanto como en una cara rectangular."
    elif 1.1 < aspecto <= 1.3:
        return "Cara cuadrada", "La longitud de la cara es similar al ancho."
    elif 1.0 <= aspecto <= 1.1:
        return "Cara redonda", "La longitud de la cara es menor que el ancho."
    elif 0.9 <= aspecto < 1.0:
        return "Cara hexagonal o diamante", "La longitud de la cara es menor que el ancho, pero no tanto como en una cara redonda."
    elif aspecto < 0.9:
        return "Cara triangular", "La longitud de la cara es mucho menor que el ancho."
    else:
        return "Forma de cara no identificada", "No se pudo determinar la forma de la cara."

@app.route('/api/detectar-forma', methods=['POST'])
def detectar_forma():
    data = request.json
    imagen_path = data.get("imagen_path")
    frame = cv2.imread(imagen_path)
    
    if frame is None:
        return jsonify({"nombreForma": "Error", "descripcionForma": "No se pudo cargar la imagen."})
    
    with mp_face_mesh.FaceMesh(max_num_faces=1, refine_landmarks=True) as face_mesh:
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = face_mesh.process(frame_rgb)

        if results.multi_face_landmarks:
            for face_landmarks in results.multi_face_landmarks:
                landmarks = [(lm.x * frame.shape[1], lm.y * frame.shape[0]) for lm in face_landmarks.landmark]
                aspecto = calcular_aspecto_rostro(landmarks)
                forma_rostro, descripcion = identificar_forma_rostro(aspecto)

                return jsonify({"nombreForma": forma_rostro, "descripcionForma": descripcion})
    
    return jsonify({"nombreForma": "Error", "descripcionForma": "No se detectaron rostros."})

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
