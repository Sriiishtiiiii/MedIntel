import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const DiagnosisForm = () => {
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  
  // Common symptoms checklist
  const symptoms = [
    'fever', 'cough', 'fatigue', 'shortness_of_breath', 'headache',
    'sore_throat', 'body_ache', 'nausea', 'diarrhea', 'loss_of_taste'
  ];
  
  // State to track selected symptoms
  const [selectedSymptoms, setSelectedSymptoms] = useState({
    fever: false,
    cough: false,
    fatigue: false,
    shortness_of_breath: false,
    headache: false,
    sore_throat: false,
    body_ache: false,
    nausea: false,
    diarrhea: false,
    loss_of_taste: false
  });

  const handleSymptomChange = (symptom) => {
    setSelectedSymptoms({
      ...selectedSymptoms,
      [symptom]: !selectedSymptoms[symptom]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post('http://localhost:5000/diagnose', { 
        symptoms: selectedSymptoms,
        // In a real app, you would get these from authentication
        patient_id: 1,
        doctor_id: 2
      });
      
      setDiagnosis(res.data);
    } catch (err) {
      console.error(err);
      alert('Error diagnosing symptoms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="p-6 bg-white rounded-lg shadow-lg my-6"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-green-600 mb-4">AI Diagnostic Assistant</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col">
        <h3 className="text-lg font-semibold mb-2">Select Your Symptoms:</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {symptoms.map((symptom) => (
            <div key={symptom} className="flex items-center">
              <input
                type="checkbox"
                id={symptom}
                checked={selectedSymptoms[symptom]}
                onChange={() => handleSymptomChange(symptom)}
                className="mr-2 h-5 w-5"
              />
              <label htmlFor={symptom} className="capitalize cursor-pointer">
                {symptom.replace('_', ' ')}
              </label>
            </div>
          ))}
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 self-center disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Diagnose Symptoms'}
        </button>
      </form>
      
      {diagnosis && (
        <div className="mt-6 p-4 border border-green-200 rounded-lg bg-green-50">
          <h3 className="text-xl font-bold text-green-800 mb-2">Diagnosis Results:</h3>
          <p className="text-green-700 font-semibold">Disease: {diagnosis.disease}</p>
          <p className="text-green-700">Confidence: {diagnosis.confidence}%</p>
          <div className="mt-2">
            <p className="text-sm text-green-600 font-semibold">Symptoms Detected:</p>
            <ul className="list-disc pl-5">
              {diagnosis.symptoms_detected.map(symptom => (
                <li key={symptom} className="text-sm text-green-600 capitalize">
                  {symptom.replace('_', ' ')}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-xs text-gray-500">Note: This is an AI-assisted diagnosis. Always consult with a healthcare professional for accurate medical advice.</p>
        </div>
      )}
    </motion.div>
  );
};

export default DiagnosisForm;