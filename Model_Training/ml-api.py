import io
import numpy as np
import tensorflow as tf
from PIL import Image
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "ML API is running!"}

# --- 1. CHARGEMENT DU MODÈLE ET DES CLASSES ---
print("Chargement du modèle CIFAR-10...")
model = tf.keras.models.load_model('cifar10_model.keras')
print("Modèle par défaut chargé avec succès!")

print("Chargement du modèle V1 (1st_bad)...")
model_v1 = tf.keras.models.load_model('cifar10_model_1st_bad.keras')
print("Modèle V1 chargé avec succès!")

print("Chargement du modèle Overfitted...")
model_overfit = tf.keras.models.load_model('cifar10_model_overfit.keras')
print("Modèle Overfitted chargé avec succès!")

CIFAR10_CLASSES = [
    "airplane", "automobile", "bird", "cat", "deer", 
    "dog", "frog", "horse", "ship", "truck"
]

@app.post("/predict")
async def predict_image(image: UploadFile = File(...)):
    if not image.filename:
        raise HTTPException(status_code=400, detail="Aucun fichier envoyé")

    try:
        # Lecture des octets
        image_bytes = await image.read()
        
        # --- 2. PRÉTRAITEMENT DE L'IMAGE ---
        # Ouverture avec Pillow
        img = Image.open(io.BytesIO(image_bytes))
        
        # Passage forcé en RGB (au cas où l'image soit PNG avec transparence RGBA, ou Noir&Blanc)
        if img.mode != "RGB":
            img = img.convert("RGB")
            
        # Découpe au format Carré avant de réduire à 32x32 pour ne pas écraser l'image
        # ImageOps.fit centrera l'image et la coupera proprement
        from PIL import ImageOps
        img = ImageOps.fit(img, (32, 32), Image.Resampling.LANCZOS)
        
        # Conversion du tableau et normalisation : on divise par 255.0 (cf. train.py)
        img_array = np.array(img) / 255.0
        
        # Le modèle attend un "batch" d'images. On passe de (32, 32, 3) à (1, 32, 32, 3)
        img_array = np.expand_dims(img_array, axis=0)
        
        # --- 3. PRÉDICTION ---
        predictions_logits = model.predict(img_array)
        
        # Comme on a utilisé from_logits=True à l'entraînement, on passe par un softmax
        # pour obtenir des pourcentages de confiance qui s'additionnent à 100%.
        predictions_probs = tf.nn.softmax(predictions_logits[0]).numpy()
        
        # Extraction du résultat final
        predicted_index = int(np.argmax(predictions_probs))
        predicted_label = CIFAR10_CLASSES[predicted_index]
        confidence = float(predictions_probs[predicted_index])
        
        # Dictionnaire pour toutes les probabilités (optionnel, mais sympa pour un graphe sur le web)
        all_predictions = {
            CIFAR10_CLASSES[i]: float(probs) 
            for i, probs in enumerate(predictions_probs)
        }
        
        # --- 4. RETOUR AU REACT ---
        return {
            "success": True,
            "data": {
                "label": predicted_label,
                "confidence": confidence,
                "index": predicted_index,
                "predictions": all_predictions
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur d'analyse: {str(e)}")

@app.post("/predictv1")
async def predict_image_v1(image: UploadFile = File(...)):
    if not image.filename:
        raise HTTPException(status_code=400, detail="Aucun fichier envoyé")

    try:
        image_bytes = await image.read()
        
        img = Image.open(io.BytesIO(image_bytes))
        
        if img.mode != "RGB":
            img = img.convert("RGB")
            
        from PIL import ImageOps
        img = ImageOps.fit(img, (32, 32), Image.Resampling.LANCZOS)
        
        img_array = np.array(img) / 255.0
        
        img_array = np.expand_dims(img_array, axis=0)
        
        predictions_logits = model_v1.predict(img_array)
        predictions_probs = tf.nn.softmax(predictions_logits[0]).numpy()
        
        predicted_index = int(np.argmax(predictions_probs))
        predicted_label = CIFAR10_CLASSES[predicted_index]
        confidence = float(predictions_probs[predicted_index])
        
        all_predictions = {
            CIFAR10_CLASSES[i]: float(probs) 
            for i, probs in enumerate(predictions_probs)
        }
        
        return {
            "success": True,
            "data": {
                "label": predicted_label,
                "confidence": confidence,
                "index": predicted_index,
                "predictions": all_predictions
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur d'analyse: {str(e)}")

@app.post("/predictOverfit")
async def predict_image_overfit(image: UploadFile = File(...)):
    if not image.filename:
        raise HTTPException(status_code=400, detail="Aucun fichier envoyé")

    try:
        image_bytes = await image.read()
        
        img = Image.open(io.BytesIO(image_bytes))
        if img.mode != "RGB":
            img = img.convert("RGB")
            
        from PIL import ImageOps
        img = ImageOps.fit(img, (32, 32), Image.Resampling.LANCZOS)
        
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        predictions_logits = model_overfit.predict(img_array)
        predictions_probs = tf.nn.softmax(predictions_logits[0]).numpy()
        
        predicted_index = int(np.argmax(predictions_probs))
        predicted_label = CIFAR10_CLASSES[predicted_index]
        confidence = float(predictions_probs[predicted_index])
        
        all_predictions = {
            CIFAR10_CLASSES[i]: float(probs) 
            for i, probs in enumerate(predictions_probs)
        }
        
        return {
            "success": True,
            "data": {
                "label": predicted_label,
                "confidence": confidence,
                "index": predicted_index,
                "predictions": all_predictions
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur d'analyse: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
