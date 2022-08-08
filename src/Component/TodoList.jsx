import React from 'react'

const TodoList = ({handleDelete, handleToggle,  task, id, isCompleted}) => {
  return (
    <div style={{display:"flex", border:"1px solid red", width:"30%", margin:"auto", justifyContent:"space-between", height:"40px", borderRadius:"10px",padding:"5px 10px 20px 5px" ,marginTop:"2%"}}>
      <h4>{task}</h4>
      <button>{isCompleted?" Done":" Not Done"}</button>
      <button onClick={ ()=>handleToggle(id, !isCompleted)}> Toggle Status</button>

     
      <button onClick={ ()=> handleDelete(id)} style={{height: "30px"}}>Delete</button>
    </div>
  )
}

export default TodoList