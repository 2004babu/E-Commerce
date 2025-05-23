import { useState } from 'react';
import Search from '../static/Search';
import HomeCategory from '../static/HomeCategory';
import { products } from '../../data/products';
import { Link } from 'react-router-dom';

const Home = () => {
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(product => 
    product.Product_Name.toLowerCase().includes(search.toLowerCase()) ||
    product.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='flex flex-col w-screen h-fit gap-3 mt-[62px]'>
      <Search search={search} setSearch={setSearch} />
      <HomeCategory />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredProducts.map(product => (
          <Link to={`/product?id=${product._id}`} key={product._id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;