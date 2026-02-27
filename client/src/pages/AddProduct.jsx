import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function AddProduct() {
  const [form, setForm] = useState({ title: '', description: '', price: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to add a product');
        setLoading(false);
        return;
      }
      
      // Create FormData to send file
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('price', form.price);
      if (imageFile) {
        formData.append('image', imageFile);
      }
      
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      
      const data = await res.json();
      
      if (res.ok) {
        navigate('/');
      } else {
        setError(data.message || 'Failed to add product');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 p-4">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">📦</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Add New Product</h2>
            <p className="text-gray-600">List your product on our marketplace</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Product Title *</label>
                <input 
                  name="title" 
                  type="text"
                  onChange={handleChange} 
                  value={form.title}
                  placeholder="Enter product title" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Price (₹) *</label>
                <input 
                  name="price" 
                  type="number" 
                  onChange={handleChange} 
                  value={form.price}
                  placeholder="Enter price" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Description *</label>
              <textarea 
                name="description" 
                onChange={handleChange} 
                value={form.description}
                placeholder="Describe your product" 
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
                required
              ></textarea>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Product Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-300">
                <input 
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="text-gray-500 mb-2">📷</div>
                  <p className="text-gray-600 mb-2">Click to upload an image</p>
                  <p className="text-gray-400 text-sm">Supports JPG, PNG, GIF (Max 5MB)</p>
                </label>
                
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-gray-600 mb-2">Preview:</p>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-40 mx-auto rounded-lg border"
                    />
                  </div>
                )}
              </div>
            </div>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-200"
              >
                {error}
              </motion.div>
            )}
            
            <div className="flex gap-4">
              <button 
                type="button" 
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-all duration-300"
              >
                Cancel
              </button>
              
              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-70 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Adding...
                  </>
                ) : (
                  'Add Product'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default AddProduct;
