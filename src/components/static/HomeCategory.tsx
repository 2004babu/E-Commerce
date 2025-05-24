import { Link } from 'react-router-dom';
import { categories } from '../../data/products';

const HomeCategory = () => {
  return (
    <div className='flex flex-wrap gap-4 p-4 justify-center'>
      {categories.map(category => (
        <Link 
          to={`/product/category?q=${category.category}`} 
          key={category._id}
          className="flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-full overflow-hidden mb-2">
            <img 
              src={category.imageUrl[0]} 
              alt={category.category}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm font-medium">{category.category}</span>
        </Link>
      ))}
    </div>
  );
};

export default HomeCategory;