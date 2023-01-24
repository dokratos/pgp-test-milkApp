import React from 'react';
import { Link } from 'react-router-dom'
import milk from '../milk.png';
import Milk from '../../types';

interface MilkProps {
  product : Milk
}

const MilkCard = ({product}: MilkProps) => {
  return (
    <article className='w-72 bg-white mb-3 bg-slate-100 rounded-lg'>
      <Link to={`/${product.id}`}>
        <img src={milk} className='w-40 my-6 ml-20 '/>
        <div className='bg-white rounded-b-lg '>
          <h1>{product.name}</h1>
          <p>{product.type}</p>
          <p>{product.storage}</p>
        </div>
      </Link>
    </article>
  )
}

export default MilkCard