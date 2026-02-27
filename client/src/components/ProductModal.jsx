import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const ProductModal = ({ product, isOpen, onClose }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isRotating, setIsRotating] = useState(false);

  if (!isOpen) return null;

  const handleMouseMove = (e) => {
    if (!isRotating) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotateY = ((x / rect.width) - 0.5) * 20; // Max 20 degrees
    const rotateX = ((y / rect.height) - 0.5) * -20; // Max 20 degrees (inverted)
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    if (isRotating) {
      setRotation({ x: 0, y: 0 });
    }
  };

  const startRotation = () => {
    setIsRotating(true);
  };

  const stopRotation = () => {
    setIsRotating(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">{product.title}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div 
                  className="relative overflow-hidden rounded-xl cursor-grab"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseDown={startRotation}
                  onMouseUp={stopRotation}
                  style={{ 
                    transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transition: isRotating ? 'none' : 'transform 0.3s ease',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {product.image ? (
                    <img
                      src={product.image.startsWith('/uploads') ? `http://localhost:5000${product.image}` : product.image}
                      alt={product.title}
                      className="w-full h-80 object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-80 bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center rounded-xl">
                      <div className="text-gray-400 text-6xl">📷</div>
                    </div>
                  )}
                  
                  {isRotating && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                      3D Rotation
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {product.image && (
                    <img
                      src={product.image.startsWith('/uploads') ? `http://localhost:5000${product.image}` : product.image}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-blue-500"
                    />
                  )}
                </div>
              </div>
              
              <div>
                <div className="mb-6">
                  <p className="text-gray-600 text-lg mb-4">{product.description}</p>
                  <div className="text-4xl font-bold text-blue-600 mb-6">₹{product.price}</div>
                </div>
                
                <div className="space-y-4">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                    Buy Now
                  </button>
                  <button className="w-full bg-gray-200 text-gray-800 py-4 rounded-xl font-bold text-lg hover:bg-gray-300 transition-all duration-300">
                    Add to Cart
                  </button>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Product Details</h3>
                  <div className="space-y-2 text-gray-600">
                    <p><span className="font-medium">Seller:</span> {product.createdBy?.username || 'Unknown'}</p>
                    <p><span className="font-medium">Added:</span> {new Date(product.createdAt || Date.now()).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;