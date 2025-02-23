from flask import request, jsonify
from flask import Blueprint
from app.models import Prescription, Diagnosis
from app import db  # Import the db object
import pytesseract
from PIL import Image
import torch

# Create a Blueprint
bp = Blueprint('app', __name__)

# Test route
@bp.route('/test', methods=['GET'])
def test_route():
    return jsonify({"message": "Test route is working!"})

# Route for processing prescription images
@bp.route('/upload_prescription', methods=['POST'])
def upload_prescription():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    image = Image.open(file)
    extracted_text = pytesseract.image_to_string(image)
    
    new_prescription = Prescription(text=extracted_text)
    db.session.add(new_prescription)
    db.session.commit()

    return jsonify({"extracted_text": extracted_text})

# Route for AI-based diagnosis
@bp.route('/diagnose', methods=['POST'])
def diagnose():
    data = request.json
    if not data or 'symptoms' not in data:
        return jsonify({"error": "No symptoms provided"}), 400

    symptoms = data['symptoms']
    model = torch.load("models/diagnostic_model.pth")  # Ensure model is loaded correctly
    prediction = model.predict(symptoms)  # Implement `predict` in your model

    new_diagnosis = Diagnosis(symptoms=symptoms, result=prediction)
    db.session.add(new_diagnosis)
    db.session.commit()

    return jsonify({"diagnosis": prediction})

# Route for fetching past records
@bp.route('/records', methods=['GET'])
def get_records():
    prescriptions = Prescription.query.all()
    diagnoses = Diagnosis.query.all()
    
    prescription_data = [{"id": p.id, "text": p.text} for p in prescriptions]
    diagnosis_data = [{"id": d.id, "symptoms": d.symptoms, "result": d.result} for d in diagnoses]

    return jsonify({"prescriptions": prescription_data, "diagnoses": diagnosis_data})

# Function to register routes
def register_routes(app):
    app.register_blueprint(bp)