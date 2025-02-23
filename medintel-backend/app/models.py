from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Prescription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_name = db.Column(db.String(100), nullable=False)
    medication = db.Column(db.String(200), nullable=False)
    allergies = db.Column(db.String(200), nullable=True)  # Store allergy history
