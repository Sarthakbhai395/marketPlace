import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('createdBy', 'username email');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    
    // Handle image upload
    let imageUrl = '';
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }
    
    const product = new Product({ 
      title,
      description,
      price: parseFloat(price),
      image: imageUrl,
      createdBy: req.user.id 
    });
    
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};
