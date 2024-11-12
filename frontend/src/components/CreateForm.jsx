import React, { useEffect, useState } from 'react';

export default function CreateForm(props) {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  useEffect(() => {
    if (props.isForm) {
      const todo = props.todos.find(t => t.id === props.isForm);
      setFormData(todo || { title: '', description: '' });
    }
  }, []);
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const method = props.isForm ? 'PUT' : 'POST';
    const action = props.isForm ? 'Updated' : 'Created';
    const url = props.isForm
      ? `http://127.0.0.1:8000/api/todos/${props.isForm}/`
      : 'http://127.0.0.1:8000/api/todos/';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage({ isError: false, message: `Todo ${action} Successfully` });

        // Update the todos list in the parent component
        props.setTodos((prevTodos) => {
          return props.isForm
            ? prevTodos.map(todo => (todo.id === props.isForm ? data : todo))
            : [...prevTodos, data];
        });

        // Close the form after 2 seconds
        setTimeout(() => {
          props.setIsForm(null);
        }, 2000);
      } else {
        setResponseMessage({ isError: true, message: `Error: ${data.message || 'Something went wrong.'}` });
      }
    } catch (error) {
      setResponseMessage({ isError: true, message: 'Error: Failed to submit the form.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-[#00000082] absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center overflow-hidden'>
      <div className='bg-white p-4 rounded-lg w-[320px]'>
        <div className='flex justify-between items-center'>
          <p className='text-3xl font-bold'>{props.isForm ? 'Edit ToDo' : 'Create ToDo'}</p>
          <i className='fa fa-close text-blue-500 text-2xl cursor-pointer' onClick={() => props.setIsForm(null)}></i>
        </div>
        <div>
          {responseMessage && (
            <p className={`mt-2 text-xl px-4 py-1 rounded-lg ${responseMessage.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {responseMessage.message}
            </p>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className='my-3 flex flex-col'>
            <label className='text-xl'>Title: </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className='border-b-slate-400 border border-transparent text-xl focus-visible:outline-none text-slate-700 px-2'
              required
            />
          </div>
          <div className='my-3 flex flex-col'>
            <label className='text-xl'>Description: </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className='border-b-slate-400 border border-transparent text-xl focus-visible:outline-none text-slate-700 px-2'
              required
              rows="5"
            ></textarea>
          </div>
          <button type="submit" className='bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-700' disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};
