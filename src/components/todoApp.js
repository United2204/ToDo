import { useState } from 'react';
import Todo from './todo';
import './todoApp.css';

export default function TodoApp() { //componente PADRE

    const [title, setTitle] = useState('');//getter and setter //Estos son estados
    const [todos, setTodos] = useState([]);


    function handleChange(e) {
        const value = e.target.value;
        setTitle(value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newTodo = {
            id: crypto.randomUUID(),
            title: title,
            completed: false
        }

        const temp = [...todos]
        temp.unshift(newTodo)

        setTodos(temp) //actualiza el estado
        setTitle('');
    }

    function handleUpdate(id, value) {
        const temp = [...todos]
        const item = temp.find(item => item.id === id)
        item.title = value;
        setTodos(temp)
    }

    function handleDelete(id) {
        const temp = todos.filter((item) => item.id !== id)

        setTodos(temp)
    }

    return (//JSX
        <div className='todoContainer'>
            <form className='todoCreateForm' onSubmit={handleSubmit}>
                <input onChange={handleChange} className='todoInput' value={title} />
                <input onClick={handleSubmit} type='submit' value='Create todo' className='buttonCreate' />

            </form>

            <div className='todoContainer'>
                {
                    todos.map(item => (//utilizamos map para que react pueda renderizar el jsx en el navegador
                        <Todo key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete} />
                    ))
                }
            </div>
        </div>
    );
}