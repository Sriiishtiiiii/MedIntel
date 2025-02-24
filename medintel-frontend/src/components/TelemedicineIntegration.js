// filepath: /d:/OneDrive/Desktop/medintel/medintel-frontend/src/components/TelemedicineIntegration.js
import React from 'react';
import { motion } from 'framer-motion';

const TelemedicineIntegration = () => {
  return (
    <motion.div
      className="p-6 bg-white rounded-lg shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-purple-600 mb-4">Telemedicine Integration</h2>
      <p className="text-gray-700">
        MedIntel integrates seamlessly with telemedicine platforms, enabling rural and remote areas to access AI-assisted diagnostics, bridging the healthcare gap.
      </p>
    </motion.div>
  );
};

export default TelemedicineIntegration;