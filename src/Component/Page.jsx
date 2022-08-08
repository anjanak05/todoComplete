import React, { useState } from 'react'
import Button from './Button'

const Page = ({count, setCount}) => {
  
  return (
    <div>
        <Button onClick={()=>setCount(count=> count-1)}>-</Button>
        <h4>{count}</h4>
        <Button onClick={()=>setCount(count => count+1)}>+</Button>

    </div>
  )
}

export default Page