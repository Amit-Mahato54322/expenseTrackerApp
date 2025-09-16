import React from 'react';
import { motion } from 'framer-motion';

function LoadingSpinner({ size = "medium" }) {
  let spinnerSize = "w-8 h-8";
  
  switch(size) {
    case "small":
      spinnerSize = "w-5 h-5";
      break;
    case "large":
      spinnerSize = "w-12 h-12";
      break;
    default:
      spinnerSize = "w-8 h-8";
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div 
        className={`${spinnerSize} border-4 border-gray-200 rounded-full`}
        style={{ 
          borderTopColor: '#5928E5'
        }}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 1, 
          ease: "linear",
          repeat: Infinity 
        }}
      />
    </div>
  );
}

export default LoadingSpinner;