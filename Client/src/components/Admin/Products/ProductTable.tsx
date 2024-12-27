import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';



import { productType } from '../../utils/Types';

interface ProductTableType { Re_path?: string, fetchProduct: () => (void), products: productType[], setProducts: Dispatch<SetStateAction<productType[]>>, hasMore: boolean }

const ProductTable: React.FC<ProductTableType> = ({ Re_path, fetchProduct, products, hasMore }) => {



  const navigate = useNavigate()


  const [inStock_icon, set_inStock_icon] = useState<boolean>(false)
  const [Price_icon, set_Price_icon] = useState<boolean>(false)
  // const [filteredPrduct, setFilteredProduct] = useState<productType[]>([])



  const handleStock = () => {

    // const sorted = products.sort((a, b) =>

    //   Number(a.inStock) - Number(b.inStock)
    // )

    // if (inStock_icon) {
    //   setFilteredProduct(sorted.reverse());

    // } else {
    //   setFilteredProduct(sorted);
    // }

    set_inStock_icon(!inStock_icon);


  }
  const handlePrice = () => {

    // const sorted = products.sort((a, b) =>

    //   Number(a.Price) - Number(b.Price)
    // )

    // if (Price_icon) {
    //   setFilteredProduct(sorted.reverse());

    // } else {
    //   setFilteredProduct(sorted);
    // }

    set_Price_icon(!Price_icon);


  }

  const handleOpenProduct = async (id: string) => {
    if (id) {
      console.log(id);

      navigate(Re_path + id, { state: { from: location.href.replace(location.origin, '') } });

    }

  }


  return (
    <table className='border-2 border-black w-full p-2'  >
      <tr className='flex flex-row gap-3 w-full justify-between items-center border-b-2 border-gray-500 p-2 '>
        <th>NO</th>
        <th>Product_Name</th>
        <th>Category</th>
        {
          !Price_icon ? (<th className='cursor-pointer mr-1' onClick={handlePrice}>Price<i className="fa-solid fa-caret-up"></i></th>) : (<th className='cursor-pointer mr-1' onClick={handlePrice}>Price<i className="fa-solid fa-caret-down"></i></th>)
        }
        {
          !inStock_icon ? (<th className='cursor-pointer mr-1' onClick={handleStock}>inStock<i className="fa-solid fa-caret-up"></i></th>) : (<th className='cursor-pointer mr-1' onClick={handleStock}>inStock<i className="fa-solid fa-caret-down"></i></th>)
        }
      </tr>
      <InfiniteScroll
        dataLength={products?.length}
        hasMore={hasMore}
        next={fetchProduct}

        loader={<h1>loading</h1>}
        endMessage={<div> Search Any You'r Products</div>}
      >
        {products && products.map((item, index) => (
          <tr key={index} onClick={() => handleOpenProduct(item._id)} className='cursor-pointer flex flex-row gap w-full px-1 py-2 justify-evenly items-center  border-b-2 border-gray-200 p-1 '>
            <td className=' h-[100px] w-[100px] overflow-hidden p-4'><img className='h-full w-full  rounded-lg object-cover' src={item.imageUrl[0] ?? './image.png'} alt="list Images" /></td>
            <td className='p-4 text-gray-600 font-bold text-md  '>{item.Product_Name.substring(0, 12)}</td>
            <td className='p-4 text-gray-700 font-bold text-md'>{item.category}</td>
            <td className='p-4 text-gray-700 font-bold text-md'>{item.Price.MRP}</td>
            <td className='p-4 text-gray-700 font-bold text-md'>{item.inStock}</td>
            {/* <td>{}</td> */}
          </tr>
        ))}
      </InfiniteScroll>
    </table>
  )
}

export default ProductTable
