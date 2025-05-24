import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { products, Product } from '../../data/products';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const ViewProduct = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get('id');
    
    if (!productId) {
      navigate('/');
      return;
    }

    const foundProduct = products.find(p => p._id === productId);
    if (!foundProduct) {
      navigate('/');
      return;
    }

    setProduct(foundProduct);
  }, [location, navigate]);

  if (!product) {
    return null;
  }

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === product.imageUrl.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? product.imageUrl.length - 1 : prev - 1
    );
  };

  const handleAddToCart = () => {
    toast.success('Added to cart!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 pt-20"
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="relative md:w-1/2">
          <img
            src={product.imageUrl[currentImageIndex]}
            alt={product.Product_Name}
            className="w-full rounded-lg object-cover"
          />
          {product.imageUrl.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2"
              >
                ←
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2"
              >
                →
              </button>
            </>
          )}
        </div>
        
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.Product_Name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl font-bold">
              ${(Number(product.Price.MRP) * (1 - Number(product.Price.Offer)/100)).toFixed(2)}
            </span>
            <span className="text-lg line-through text-gray-500">
              ${product.Price.MRP}
            </span>
            <span className="text-green-600">
              {product.Price.Offer}% OFF
            </span>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-500">★</span>
            <span>{product.totalRate} ({product.Ratings.length} reviews)</span>
          </div>
          
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <span className="text-sm text-gray-500">Category:</span>
            <span className="ml-2">{product.category}</span>
          </div>
          
          <div className="mb-6">
            <span className="text-sm text-gray-500">In Stock:</span>
            <span className="ml-2">{product.inStock} units</span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ViewProduct;