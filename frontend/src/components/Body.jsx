import React, { useState, useEffect } from 'react';
import Card from './Card';
import CreateForm from './CreateForm';

export default function Body() {
    const apiUrl = 'http://127.0.0.1:8000/api/todos/';
    const [todos, setTodos] = useState([]);
    const [isForm, setIsForm] = useState(false);

    // Fetch data from API
    const fetchData = async () => {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        setTodos(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className='p-4 flex justify-between items-center'>
                <p className='text-3xl font-bold'>Todo</p>
                <i className='fa-solid fa-circle-plus text-blue-500 text-3xl mr-2 cursor-pointer' onClick={() => { setIsForm(true) }}></i>
            </div>

            <div className="my-4 flex justify-center flex-wrap gap-5">
                {todos.length !== 0 ? (
                    todos.map((todo) => <Card key={todo.id} todo={todo} />)
                ) : (
                    <p>No tasks available</p>
                )}
            </div>
            {isForm && <CreateForm setIsForm={setIsForm} setTodos={setTodos} />}
        </div>
    );
}
