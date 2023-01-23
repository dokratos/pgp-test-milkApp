import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Milk from '../../types'
import MilkCard from './MilkCard';


const ProductList = () => {
  const [products, setProducts] = useState<Milk[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [filter, setFilter] = useState<Milk[]>([]);
  const [text, setText] = useState<string>('')

  useEffect(() => {
    const getMilk = async () => {
      const milkList = await axios.get('/milk');
      setProducts(milkList.data.db.results);
      setFilter(milkList.data.db.results);
    }
    getMilk();
  }, [])
  
  useEffect(() => {
    const getFilter = () => {
      const categoryArray = products.map(milk => milk.type);
      const categoryFilter = categoryArray.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      categoryFilter.unshift('All')
      setCategory(categoryFilter);
    } 
    getFilter();
  }, [products])


  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event) {
      if (event.target.value === 'All') return setFilter(products);

      const filtered = products.filter(item => item.type === event.target.value);
      setFilter(filtered);
    }
  };

  const handleSearch = () => {
    if (text.length > 0) {
      const regex = new RegExp(text, 'i');
      const searchResult = products.filter(milk => {
        return milk.name.match(regex);
      })
      setFilter(searchResult);
      setText('')
    }
  }

  return (
    <main>
       <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input
        type='text'
        placeholder='Search'
        value={text}
        onChange={e => setText(e.target.value)}
        className='block w-80 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50'
        ></input>
        <button
        onClick={handleSearch}
        className='text-white absolute left-56 bottom-2.5 bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800'
        >
          Search
        </button>
      </div>
      <label>Type:</label>
      <select onChange={handleFilter}>
        {category.map((milkType, i) =>
          <option 
          key={i}
          value={milkType}>{milkType}</option>
          )}
      </select>
      <section className='flex flex-row flex-wrap justify-around'>
        {filter. map((milk, i) =>
          <MilkCard 
          product={milk}
          key={i}
          />
          )}
      </section>
    </main>
  )
}

export default ProductList