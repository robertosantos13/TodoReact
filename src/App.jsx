import React, { useState, useEffect } from 'react';

import { addDoc, collection, deleteDoc, doc, onSnapshot, query, setDoc, updateDoc } from "firebase/firestore";
import { db } from './firebase';

import { AiOutlinePlus } from 'react-icons/ai';

import TodoList from "./components/TodoList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [inputEdit, setInputEdit] = useState({});

  useEffect(() => {
    const q = query(collection(db, "tasks"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksArr = [];
      querySnapshot.forEach((doc) => {
        tasksArr.push({ ...doc.data(), id: doc.id });
      });
      setTasks(tasksArr);
    });
    return () => unsubscribe();
  }, []);


  const toggleComplete = async (task) => {
    const updateTask = doc(db, 'tasks', task.id);
    await updateDoc(updateTask, {
      completed: !task.completed
    });
  };


  const toggleDelete = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const createTask = async (e) => {
    e.preventDefault(e);

    if(!inputEdit.id) {
      
      await addDoc(collection(db, 'tasks'), {
          text: input,
          completed: false
        });
    } else {
      await updateDoc(doc(db, "tasks", inputEdit.id), {
        text: input
      })
    }
      
    setInput('');
    setInputEdit('')
  };


  const toggleEdit = async (task) => {
    setInputEdit(task)
    setInput(task.text)

  }

  return (
    <div className='main'>

      <div className="app-container">
        <h3>Lista de Tarefas </h3>
        <form onSubmit={createTask}>
          <input className='app-input' type="text" placeholder="Digite a tarefa" value={input} onChange={(evt) => setInput(evt.target.value)} />
          <button className='app-button'>
            {<AiOutlinePlus size={30} />}
          </button>
        </form>
        <ul>
          {tasks.map((task) => (

            <TodoList key={task.id} task={task} toggleComplete={toggleComplete} toggleDelete={toggleDelete} toggleEdit={toggleEdit} />
          ))}
        </ul>
        <p className='app-count'>Você tem <span>{tasks.length}</span> tarefas</p>
      </div>
    </div>
  );
}

export default App;
