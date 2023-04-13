import React from 'react';

import { FaRegTrashAlt, FaPencilAlt } from 'react-icons/fa';

const TodoList = ({ task, toggleComplete, toggleDelete, toggleEdit }) => {
    return (
        <li className={task.completed ? 'li-completed' : 'todo-li'}>
            <div className='flex' onClick={() => toggleComplete(task)}>
                <input type="checkbox" onChange={() => toggleComplete(task)} checked={task.completed ? 'checked' : ''} />
                <p className={task.completed ? 'text-completed' : 'ml-2 cursor-pointer'}>{task.text}</p>
            </div>
            <div className='flex gap-2'>
                
                <button onClick={() => toggleEdit(task)}>
                    {<FaPencilAlt className='buttonIcon' />}
                </button>

                <button onClick={() => toggleDelete(task.id)}>
                    {<FaRegTrashAlt className='buttonIcon' />}
                </button>
            </div>
        </li>
    );
};

export default TodoList;