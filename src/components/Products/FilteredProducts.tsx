import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { products, Product } from '../../data/products';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FilteredProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('q');
    
    if (category) {
      const filtered = products.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [location]);

  return (
    <div className="container mx-auto px-4 pt-20">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProducts.map(product => (
          <Link to={`/product?id=${product._id}`} key={product._id}>
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img 
                src={product.imageUrl[0]} 
                alt={product.Product_Name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.Product_Name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="text-xl font-bold">
                      ${(Number(product.Price.MRP) * (1 - Number(product.Price.Offer)/100)).toFixed(2)}
                    </span>
                    <span className="ml-2 text-sm line-through text-gray-500">
                      ${product.Price.MRP}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">{product.totalRate}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

export default FilteredProducts;