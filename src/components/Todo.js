import React, { Fragment, useState, useEffect, useRef, useReducer, useMemo } from 'react'
import axios from 'axios';
import TodoList from './TodoList';
import { useContext } from 'react';
import { LocaleContext } from '../context/LocaleContext';

const Todo = props => {
  const { locale } = useContext(LocaleContext);
  // const [readOnly, setReadOnly] = useState(false);
  // const [todoName, setTodoName] = useState('');
  const inputRef = useRef();
  const [inputStatus, setInputStatus] = useState(true);
  // const [todoList, setTodoList] = useState([]);
  // const [submittedTodo, setSubmittedTodo] = useState(null);

  const isMountedRef = useRef(false);

  const todoListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return state.concat(action.payload).reverse();
      case 'DELETE':
        return state.filter(todo => todo.id !== action.payload);
      default:
        return state;
    }
  }
  const [todoList, dispatchTodo] = useReducer(todoListReducer, []);
  useEffect(() => {
    isMountedRef.current = true;
    // as we passed [] to useEffect it will run on component mount phase
    console.log('init phase of TODO')
    fetchData();
    return () => {
      // as we passed [] to useEffect it will run on component unmount
      console.log('Destroy phase of Todo Component')
      isMountedRef.current = false;
    }
  }, [])

  // useEffect(() => {
  //   if (submittedTodo) {
  //     // we could directly call setTodoList &
  //     //  concat todoList, but eslint will give warning about it
  //     // as we depend on todoList directly but not adding it in deps array
  //     setTodoList((list) => {
  //       return list.concat(submittedTodo);
  //     });
  //   }
  // }, [submittedTodo])

  const fetchData = async () => {
    const { data } = await axios.get('https://react-practice-45bd7.firebaseio.com/todos.json');
    const todos = [];
    for (let id in data) {
      todos.push({ id: id, name: data[id].name });
    }
    if (isMountedRef.current) {
      // setTodoList(todos);
      dispatchTodo({ type: 'ADD', payload: todos });
    }
  }
  const inputChangeHandler = event => {
    // setTodoName(event.target.value);
    if (!event.target.value.trim()) {
      setInputStatus(false)
    } else {
      setInputStatus(true)
    }
  }
  const addTodoHandler = async event => {
    console.log('ADD TO DO')
    event.preventDefault();
    if (inputRef.current.value) {
      const { data } = await axios.post('https://react-practice-45bd7.firebaseio.com/todos.json', { name: inputRef.current.value });
      // setSubmittedTodo({ id: data.name, name: todoName });
      // setTodoList((list) => {
      //   list = list.concat({ id: data.name, name: todoName });
      //   return list;
      // });
      dispatchTodo({ type: 'ADD', payload: { id: data.name, name: inputRef.current.value } });
      inputRef.current.value = '';
    }
  }
  const deleteTodoHandler = async (id) => {
    try {
      await axios.delete(`https://react-practice-45bd7.firebaseio.com/todos/${id}.json`);
      dispatchTodo({ type: 'DELETE', payload: id });
    } catch (error) {
      throw new Error(error);
    }
  }
  return (
    <Fragment>
      <h2>Currently Viewing: {locale.text}</h2>
      <form onSubmit={addTodoHandler}>
        <div>
          <input className={inputStatus?'':'invalid'} type="text" ref={inputRef} onChange={inputChangeHandler}/>
          <button className="custom" type="submit" >Add</button>
        </div>
      </form>
      {
        useMemo(()=> <TodoList items={todoList} onDelete={deleteTodoHandler}/>, [todoList])
      }
      {/* {} */}
    </Fragment>
  )
}

export default Todo;