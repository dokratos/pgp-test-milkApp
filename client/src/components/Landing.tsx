import React, {useState, useEffect} from 'react';
import { selectMilk, fetchMilk } from '../slices/milkSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import Milk from '../../types'
import MilkList from './MilkList';
import Pagination from './Pagination';

const Landing = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectMilk);
  const milkStatus = useAppSelector(state => state.milk.status)
  const [category, setCategory] = useState<string[]>([]);
  const [filter, setFilter] = useState<Milk[]>([]);
  const [text, setText] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(9);

  useEffect(() => {
    if (milkStatus === 'idle') {
      dispatch(fetchMilk());
    }
    setFilter(products)
  }, [milkStatus, dispatch])
  
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
      setCurrentPage(1);
    }
  };

  const handleSearch = () => {
    if (text.length > 0) {
      const regex = new RegExp(text, 'i');
      const searchResult = products.filter(milk => {
        return milk.name.match(regex);
      })
      setFilter(searchResult);
      setCurrentPage(1);
      setText('')
    }
  }

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentData = filter.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filter.length / recordsPerPage);

  return (
    <main>
       <form className="flex flex-row justify-between relative my-10 mx-5 lg:mx-20"
       onSubmit={e => e.preventDefault()}
       >
        <button
        onClick={handleSearch}
        className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
        <input
        type='text'
        placeholder='Search by Name..'
        value={text}
        onChange={e => setText(e.target.value)}
        className='w-80 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-rose-500'
        ></input>
        <select 
        className='justify-self-end w-64 p-4 px-5 text-sm text-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-rose-500'
        onChange={handleFilter}>
        {category.map((milkType, i) =>
          <option
          key={i}
          value={milkType}>{milkType}</option>
          )}
        </select>
      </form>
      <MilkList 
      data={currentData}
      />
      <Pagination
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
      />
    </main>
  )
}

export default Landing