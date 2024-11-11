import React from 'react'

export default function Card(props) {
    const { title, description, completed } = props.todo;
    return (
        <div className='w-[300px] shadow-lg pt-12 px-3 pb-3 rounded-lg border border-slate-300 border-solid text-center relative'>
            <div className="absolute top-2 right-0 left-0 px-2 flex justify-between">
                <div>
                    {completed ? (
                        <button className='bg-green-500 text-slate-50 px-3 py-2 rounded-lg text-sm'>Completed</button>
                    ) : (
                        <button className='bg-slate-300 px-3 py-2 rounded-lg text-sm'>Pending</button>
                    )}
                </div>
                <div>
                    <i className='fa-solid fa-edit text-blue-500 text-lg mr-2 cursor-pointer'></i>
                    <i className='fa-solid fa-trash text-red-500 text-lg cursor-pointer'></i>
                </div>
            </div>
            <h1 className='mb-3 text-3xl font-bold'>{title}</h1>
            <p>{description}</p>
        </div>
    )
}
