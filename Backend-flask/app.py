from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

# Load your trained model
model = load_model("model/plant_disease_model.h5")

# Class names from training
CLASS_NAMES = ['Healthy', 'Blight', 'Rust']

# Disease-specific insights
DISEASE_INFO = {
    "Healthy": {
        "growth_stage": "Varies",
        "needs": "Maintain current care routine.",
        "notes": "Great job! Keep the plant well-watered and watch for early signs of disease.",
        "tips": "Keep monitoring. Use balanced fertilizer."
    },
    "Blight": {
        "growth_stage": "Flowering stage",
        "needs": "Apply copper-based fungicide, prune infected parts.",
        "notes": "Blight spreads quickly—remove infected leaves and avoid overhead watering.",
        "tips": "Ensure good airflow, apply fungicide in early morning."
    },
    "Rust": {
        "growth_stage": "Vegetative stage",
        "needs": "Use fungicide and avoid wetting the leaves.",
        "notes": "Rust thrives in humid conditions. Space out plants and water from below.",
        "tips": "Use sulfur-based fungicides early in the infection."
    }
}

@app.route("/", methods=["GET"])
def home():
    return "🌱 Flask backend is running!", 200

@app.route("/predict", methods=["POST"])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']

    # Preprocess image
    img = Image.open(file).convert('RGB').resize((128, 128))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Make prediction
    predictions = model.predict(img_array)
    confidence = float(np.max(predictions))
    predicted_index = np.argmax(predictions)
    predicted_label = CLASS_NAMES[predicted_index]

    # Get additional plant care info
    disease_data = DISEASE_INFO.get(predicted_label, {})

    response = {
        "disease": predicted_label,
        "confidence": confidence,
        "tips": disease_data.get("tips", "No tips available."),
        "growth_stage": disease_data.get("growth_stage", "Unknown"),
        "needs": disease_data.get("needs", "Unknown"),
        "notes": disease_data.get("notes", "No additional information.")
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
