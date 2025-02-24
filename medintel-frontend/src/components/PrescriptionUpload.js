// filepath: /d:/OneDrive/Desktop/medintel/medintel-frontend/src/components/PrescriptionUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const PrescriptionUpload = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/upload_prescription', formData);
      setResponse(res.data.extracted_text);
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
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Upload Prescription</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          Upload
        </button>
      </form>
      {response && <p className="mt-4 text-blue-600">Extracted Text: {response}</p>}
    </motion.div>
  );
};

export default PrescriptionUpload;