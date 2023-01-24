import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Milk from '../../types';
import milk from '../milk.png';
import { Alert } from './Alert';

const MilkPage = () => {
  const [milkProduct, setMilkProduct] = useState<Milk>({} as Milk);
  const [sliderValue, setSliderValue] = useState<string>('0');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { id } = useParams();

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
    }, 1000);
  };

  const handleOrder = async () => {
    setShowAlert(!showAlert);
    setSliderValue('0');
    const order = await axios.patch(`milk/${id}`, {liter: sliderValue});
    setMilkProduct(order.data)
    return order;
  }

  return (
    <main className='static'>
      <Link to='/'>Back to Home</Link>
      <section className='absolute inset-x-1/4 top-52  flex flex-row justify-beteween '>
        <img src={milk} className='w-60 p-5'/>
        <article className='p-5 bg-white rounded-lg'>
          <h1 className='font-medium mb-2'>{milkProduct.name}</h1>
          <p className='text-gray-700'>{milkProduct.type}</p>
          <p className='text-sm mb-4'>{milkProduct.storage}l in stock</p>
          <input
          type='range'
          min='0'
          max={milkProduct.storage}
          value={sliderValue}
          onChange={(e) => setSliderValue(e.target.value)}
          className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
          >
          </input>
          <p>{sliderValue} liter</p>
          <button
          className='text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800'
          onClick={handleOrder}
          >Order!</button>
        </article>
          { showAlert && <Alert />}
      </section>
    </main>
  )
}

export default MilkPage;