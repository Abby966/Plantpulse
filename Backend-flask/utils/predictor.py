from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image

# Load model once to avoid reloading on every request
model = load_model("model/plant_disease_model.h5")
CLASS_NAMES = ['Healthy', 'Blight', 'Rust']

def predict_disease(file):
    img = Image.open(file).convert('RGB').resize((128, 128))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    preds = model.predict(img_array)
    pred_index = np.argmax(preds)
    pred_class = CLASS_NAMES[pred_index]
    confidence = float(np.max(preds))

    # Example tip system — expand this later!
    tips = {
        "Healthy": "Keep monitoring your plant regularly.",
        "Blight": "Remove infected leaves and avoid overhead watering.",
        "Rust": "Use fungicide and avoid wetting the foliage."
    }

    return {
        "disease": pred_class,
        "confidence": confidence,
        "tips": tips.get(pred_class, "No tips available.")
    }
