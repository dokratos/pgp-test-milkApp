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
    <main>
      <Link to='/'>Back to Home</Link>
      <section>
        <img src={milk} className='w-40 my-6 ml-20 '/>
        <article>
          <h1>{milkProduct.name}</h1>
          <p>{milkProduct.type}</p>
          <p>{milkProduct.storage}</p>
          <input
          type='range'
          min='0'
          max={milkProduct.storage}
          value={sliderValue}
          onChange={(e) => setSliderValue(e.target.value)}
          >
          </input>
          <p>{sliderValue} liter</p>
          <button
          className='text-white absolute left-56 bottom-2.5 bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800'
          onClick={handleOrder}
          >Order!</button>
          { showAlert && <Alert />}
        </article>
      </section>
    </main>
  )
}

export default MilkPage;