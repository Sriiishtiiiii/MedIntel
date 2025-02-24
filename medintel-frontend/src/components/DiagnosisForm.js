// filepath: /d:/OneDrive/Desktop/medintel/medintel-frontend/src/components/DiagnosisForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const DiagnosisForm = () => {
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const symptomsArray = symptoms.split(',').map(Number);

    try {
      const res = await axios.post('http://localhost:5000/diagnose', { symptoms: symptomsArray });
      setDiagnosis(res.data.diagnosis);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      className="p-6 bg-white rounded-lg shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-green-600 mb-4">Diagnose Symptoms</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Enter symptoms separated by commas"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300"
        >
          Diagnose
        </button>
      </form>
      {diagnosis && <p className="mt-4 text-green-600">Diagnosis: {diagnosis}</p>}
    </motion.div>
  );
};

export default DiagnosisForm;