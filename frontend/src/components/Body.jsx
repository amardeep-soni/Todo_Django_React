import React, { useState, useEffect } from 'react';
import Card from './Card';
import CreateForm from './CreateForm';
import DeleteForm from './deleteForm';

export default function Body() {
    const apiUrl = 'http://127.0.0.1:8000/api/todos/';
    const [todos, setTodos] = useState([]);
    const [isForm, setIsForm] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    // Fetch data from API
    const fetchData = async () => {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        setTodos(data);
    };

    // delete api call
    const deleteTodo = async () => {
        let id = deleteId;
        const response = await fetch(`${apiUrl}${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const updatedTodos = todos.filter((todo) => todo.id !== id);
            setTodos(updatedTodos);
            setDeleteId(null);
        }
    }
    // Set completed status to true
    const completeTodo = async (id) => {
        const todoToUpdate = todos.find((todo) => todo.id === id);
        if (!todoToUpdate) return; // Exit if no matching todo is found

        const updatedTodo = { ...todoToUpdate, completed: true };

        
        await fetch(`${apiUrl}${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTodo),
        });
        setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
        setCompletedId(null);
    };


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className='p-4 flex justify-between items-center'>
                <p className='text-3xl font-bold'>Todo</p>
                <i className='fa-solid fa-circle-plus text-blue-500 text-3xl mr-2 cursor-pointer' onClick={() => { setIsForm(0) }}></i>
            </div>

            <div className="my-4 flex justify-center flex-wrap gap-5">
                {todos.length !== 0 ? (
                    todos.map((todo) => <Card key={todo.id} todo={todo} setDeleteId={setDeleteId} setIsForm={setIsForm} completeTodo={completeTodo} />)
                ) : (
                    <p>No tasks available</p>
                )}
            </div>
            {isForm != null && <CreateForm isForm={isForm} todos={todos} setIsForm={setIsForm} setTodos={setTodos} />}
            {deleteId && <DeleteForm setDeleteId={setDeleteId} setTodos={setTodos} deleteTodo={deleteTodo} />}
        </div>
    );
}
