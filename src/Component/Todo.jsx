import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import AddTodo from './AddTodo';
import Page from './Page';
import TodoList from './TodoList';

const fetchData = page => {
  return fetch(`http://localhost:9090/todos?_page=${page}`).then(res =>
    res.json()
  );
};

const addData = text => {
  return fetch(`http://localhost:9090/todos`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      task: text,
      isCompleted: false,
    }),
  }).then(res => res.json());
};

const toggleStatus = (id, status) => {
  return fetch(`http://localhost:9090/todos/${id}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      isCompleted: status,
    }),
  }).then(res => res.json());
};

const deleteData = (id) => {
  return fetch(`http://localhost:9090/todos/${id}`, {
    method: 'DELETE',
    headers: { 'content-type': 'application/json' },
   
  }).then(res => res.json());
};
const Todo = () => {
  const [count, setCount] = useState(0)
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    fetchData()
      .then(res => {
        setTodo(res);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleAdd = text => {
    setLoading(true);
    addData(text)
      .then(res => {
        console.log(res);
        getData();
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const handleToggle = (id, status) => {
    setLoading(true);
    toggleStatus(id, status)
      .then(res => {
        console.log(res);
        getData();
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    setLoading(true);
    deleteData(id)
      .then(res => {
        console.log(res);
        getData();
      })
      .catch(err => {
        setLoading(false);
      });
  };

  return (
    <div>
      <AddTodo handleAdd={handleAdd}> </AddTodo>
      {loading && <h1>Loading</h1>}
      <h1>Pending Tasks</h1>
      {todo.filter((e)=> !e.isCompleted).map(elem => (
        <div key={elem.id}>
          <TodoList
          handleDelete={handleDelete}
            handleToggle={handleToggle}
            id={elem.id}
            task={elem.task}
            isCompleted={elem.isCompleted}
          />
        </div>
      ))}

<h1>Completed Tasks</h1>
      {todo.filter((e)=> e.isCompleted).map(elem => (
        <div key={elem.id}>
          <TodoList
          handleDelete={handleDelete}
            handleToggle={handleToggle}
            id={elem.id}
            task={elem.task}
            isCompleted={elem.isCompleted}
          />
        </div>
      ))}
      <Page count={count} setCount={setCount}></Page>
    </div>
  );
};

export default Todo;
