import React, { useState } from 'react';

export default function DeleteForm(props) {


  return (
    <div className='bg-[#00000082] absolute top-0 left-0 right-0 h-screen flex justify-center items-center'>
      <div className='bg-white p-4 rounded-lg w-[320px]'>
        <div className='flex justify-between items-center'>
          <p className='text-3xl font-bold'>Confirm Deletion</p>
          <i className='fa fa-close text-blue-500 text-2xl cursor-pointer' onClick={() => props.setDeleteId(null)}></i>
        </div>
        <div className='mt-3 flex justify-between w-1/2 mx-auto'>
          <button className='bg-blue-500 text-white px-4 py-1 rounded-lg' onClick={() => props.deleteTodo()}>Yes</button>
          <button className='bg-red-500 text-white px-4 py-1 rounded-lg' onClick={() => props.setDeleteId(false)}>No</button>
        </div>
      </div>
    </div>
  );
};