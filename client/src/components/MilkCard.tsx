import React from 'react';
import { Link } from 'react-router-dom'
import milk from '../milk.png';
import Milk from '../../types';

interface MilkProps {
  product : Milk
}

const MilkCard = ({product}: MilkProps) => {
  return (
    <article className='w-72 mb-3 bg-slate-50 rounded-lg'>
      <Link to={`/${product.id}`}>
        <img src={milk} className='w-40 my-6 ml-16 '/>
        <div className='flex flex-wrap justify-between bg-white rounded-b-lg p-5 text-gray-700'>
          <h1 className='font-medium mb-2'>{product.name}</h1>
          <p className='text-sm'>{product.type}</p>
          <p className='text-sm'>{product.storage}l in stock</p>
        </div>
      </Link>
    </article>
  )
}

export default MilkCard