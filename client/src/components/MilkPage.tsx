import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAppSelector } from '../hooks/reduxHooks';
import Milk from '../../types';
import milk from '../milk.png';
import { Alert } from './Alert';

const MilkPage = () => {
  const [milkProduct, setMilkProduct] = useState<Milk>({} as Milk);
  const [sliderValue, setSliderValue] = useState<string>('1');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { id } = useParams();

  // const milkProduct = useAppSelector(state => state.milk.milks.find(item => item.id === id));
  // console.log(milkProduct, 'the milk is here')

  useEffect(() => {
    const getMilk = async () => {
      const product = await axios.get(`milk/${id}`);
      setMilkProduct(product.data);
    }
    getMilk();
  }, []);

  if (showAlert) {
    setTimeout(() => {
      setShowAlert(false)
    }, 1500);
  };

  const handleOrder = async () => {
    setShowAlert(!showAlert);
    setSliderValue('0');
    const order = await axios.patch(`milk/${id}`, {liter: sliderValue});
    setMilkProduct(order.data)
    return order;
  }

  return (
    <main className='relative'>
      <Link to='/' className='h-7 absolute left-1/4 top-24 flex flex-row text-gray-600'>
        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className='inline'>
        <path className="stroke-rose-500 stroke-2 hover:stroke-2" strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path>
        </svg>Back
      </Link>
      <section className='absolute top-1/2 left-1/4 flex flex-col lg:flex-row top-56 left-32 md:flex-row top-32'>
        <img src={milk} className='w-60 p-5 lg:w-80'/>
        <article className='p-5 bg-white rounded-lg lg:p-10'>
          <h1 className='font-medium mb-2'>{milkProduct.name}</h1>
          <p className='text-gray-700'>{milkProduct.type}</p>
          <p className='text-sm mb-4'>{milkProduct.storage}l in stock</p>
         { milkProduct.storage > 0 ?
         <>
          <div className='relative'>
              <input
              type='range'
              min='1'
              max={milkProduct.storage}
              value={sliderValue}
              onChange={(e) => setSliderValue(e.target.value)}
              className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-400 lg:mt-10'
              >
              </input>
              <output
            //  className='bg-rose-400 text-white px-4 py-2 absolute rounded-full left-0 translate-y-2/4 mb-5 after:w-2 after:h-2 after:top-1'
              >{sliderValue}l</output>
            </div>
            <button
            className='text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-4 py-2'
            onClick={handleOrder}
            >Order!</button>
          </> : <p className='text-white bg-rose-700 font-medium rounded-lg text-sm px-4 py-2'
          >Sorry, out of Stock!</p>
          }
        </article>
          { showAlert && <Alert />}
      </section>
    </main>
  )
}

export default MilkPage;