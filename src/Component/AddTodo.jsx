import React from 'react'
import { useState } from 'react'

const AddTodo = ({handleAdd}) => {
    const [text, setText] = useState("")
  return (
    <div>
         <input onChange={(e)=>setText(e.target.value)} placeholder='write something'></input>
        <button onClick={()=>handleAdd(text)}>Add</button>
    </div>
  )
}

export default AddTodo