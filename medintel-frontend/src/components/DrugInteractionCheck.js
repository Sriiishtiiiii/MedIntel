// filepath: /d:/OneDrive/Desktop/medintel/medintel-frontend/src/components/DrugInteractionCheck.js
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const DrugInteractionCheck = () => {
  const [medications, setMedications] = useState('');
  const [interaction, setInteraction] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const medicationsArray = medications.split(',').map(med => med.trim());

    try {
      const res = await axios.post('http://localhost:5000/check_interaction', { medications: medicationsArray });
      setInteraction(res.data.interaction);
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
      <h2 className="text-2xl font-bold text-red-600 mb-4">Check Drug Interaction</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={medications}
          onChange={(e) => setMedications(e.target.value)}
          placeholder="Enter medications separated by commas"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
        >
          Check Interaction
        </button>
      </form>
      {interaction && <p className="mt-4 text-red-600">Interaction: {interaction}</p>}
    </motion.div>
  );
};

export default DrugInteractionCheck;