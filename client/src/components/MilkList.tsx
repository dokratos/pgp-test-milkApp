import React from 'react';
import MilkCard from './MilkCard';
import Milk from '../../types'

interface MilkListProps {
  data: Milk[],
}

const MilkList = ({data}: MilkListProps) => {
  return (
    <section className='flex flex-row flex-wrap justify-around'>
    {data.map((milk, i) =>
      <MilkCard 
      product={milk}
      key={i}
      />
      )}
  </section>
  )
}

export default MilkList