import React, { useState } from 'react';

export default function CreateForm(props) {
  console.log(props);

  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

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

    try {
      const response = await fetch('http://127.0.0.1:8000/api/todos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage({ isError: false, message: 'Todo Created Successfully' });
        props.setTodos((prevTodos) => [...prevTodos, data]);
        setTimeout(() => {
          props.setIsForm(false);
        }, 2000);
      } else {
        setResponseMessage({ isError: true, message: `Error: ${data.message || 'Something went wrong.'}` });
      }
    } catch (error) {
      setResponseMessage({ isError: true, message: `Error: Failed to submit the form.'}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-[#00000082] absolute top-0 left-0 right-0 h-screen flex justify-center items-center'>
      <div className='bg-white p-4 rounded-lg w-[320px]'>
        <div className='flex justify-between items-center'>
          <p className='text-3xl font-bold'>Create ToDo</p>
          <i className='fa fa-close text-blue-500 text-2xl cursor-pointer' onClick={() => props.setIsForm(false)}></i>
        </div>
        <div>
          {responseMessage && (
            responseMessage.isError ? (
              <p className="mt-2 bg-red-100 text-red-700 text-xl px-4 py-1 rounded-lg">
                {responseMessage.message}
              </p>
            ) : (
              <p className="mt-2 bg-green-100 text-green-700 text-xl px-4 py-1 rounded-lg">
                {responseMessage.message}
              </p>
            )
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
              type="text"
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