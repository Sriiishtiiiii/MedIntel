import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const DrugInteractionCheck = () => {
  const [medications, setMedications] = useState('');
  const [allergies, setAllergies] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const medicationsArray = medications
      .split(',')
      .map(med => med.trim())
      .filter(med => med);
      
    const allergiesArray = allergies
      .split(',')
      .map(allergy => allergy.trim())
      .filter(allergy => allergy);

    try {
      const res = await axios.post('http://localhost:5000/check_interaction', { 
        medications: medicationsArray,
        allergies: allergiesArray
      });
      setResults(res.data);
    } catch (err) {
      console.error(err);
      alert('Error checking drug interactions. Please try again.');
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
      <h2 className="text-2xl font-bold text-red-600 mb-4">Drug Interaction & Allergy Check</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-4">
          <label htmlFor="medications" className="block text-sm font-medium text-gray-700 mb-1">
            Medications
          </label>
          <input
            id="medications"
            type="text"
            value={medications}
            onChange={(e) => setMedications(e.target.value)}
            placeholder="Enter medications separated by commas (e.g., aspirin, warfarin, metformin)"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-1">
            Known Allergies
          </label>
          <input
            id="allergies"
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            placeholder="Enter allergies separated by commas (e.g., penicillin, nsaids, sulfa)"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 self-center disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Check Interactions'}
        </button>
      </form>
      
      {results && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Results:</h3>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-700">Medications Checked:</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {results.medications_checked.map((med, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 rounded text-sm">
                  {med}
                </span>
              ))}
            </div>
          </div>
          
          {results.drug_interactions.length > 0 ? (
            <div className="mb-4">
              <h4 className="font-medium text-red-600">Potential Drug Interactions:</h4>
              <ul className="mt-1 space-y-2">
                {results.drug_interactions.map((interaction, index) => (
                  <li key={index} className="p-2 bg-red-50 border border-red-200 rounded">
                    <div className="font-medium">
                      {interaction.medication1} + {interaction.medication2}
                    </div>
                    <div className="text-sm text-red-700">{interaction.warning}</div>
                    <div className="text-xs mt-1">
                      Severity: <span className="font-medium">{interaction.severity.toUpperCase()}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="p-2 bg-green-50 border border-green-200 rounded mb-4">
              <p className="text-green-700">No drug interactions found between these medications.</p>
            </div>
          )}
          
          {results.allergy_warnings.length > 0 ? (
            <div>
              <h4 className="font-medium text-red-600">Allergy Warnings:</h4>
              <ul className="mt-1 space-y-2">
                {results.allergy_warnings.map((warning, index) => (
                  <li key={index} className="p-2 bg-red-50 border border-red-200 rounded">
                    <div className="font-medium">
                      Allergy: {warning.allergy}, Medication: {warning.medication}
                    </div>
                    <div className="text-sm text-red-700">{warning.warning}</div>
                  </li>
                ))}
              </ul>
            </div>
          ) : allergies && (
            <div className="p-2 bg-green-50 border border-green-200 rounded">
              <p className="text-green-700">No allergy conflicts found with these medications.</p>
            </div>
          )}
          
          <p className="mt-4 text-xs text-gray-500">
            Disclaimer: This tool provides information for educational purposes only. 
            Always consult with a healthcare professional before making decisions about medication.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default DrugInteractionCheck;