import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductModal from '../components/ProductModal';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading marketplace products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Welcome to MarketPlace
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing products from sellers around the world
          </p>
        </motion.div>

        {products.length > 0 ? (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                variants={item}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
              >
                <div className="h-48 bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-5xl">📷</div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{product.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>
                    <button 
                      onClick={() => handleProductClick(product)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🛍️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Products Yet</h2>
            <p className="text-gray-600 mb-6">Be the first to add a product to our marketplace!</p>
            {localStorage.getItem('token') && (
              <a 
                href="/add" 
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Add Your Product
              </a>
            )}
          </motion.div>
        )}
      </div>
      
      {isModalOpen && selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}

export default Home;
