import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { registerRoute } from '../utils/ApiRoutes';
import {toast} from 'sonner'


function Register() {
  const navigate = useNavigate();

  const {
    register, 
    handleSubmit, 
    setError, 
    formState: { errors, isSubmitting }
  } = useForm();

  const handleErrors = () => {
    if(errors.username){
      toast.error(errors.username.message);
    }
    if(errors.email){
      toast.error(errors.email.message)
    }
    if(errors.password){
      toast.error(errors.password.message);
    }
    if(errors.confirmPassword){
      toast.error(errors.confirmPassword.message);
    }
  }

  const onSubmit = async(data) => {
    // Custom validation example
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match',
      });
      return;
    }

    console.log(data);

    try {
      const response = await axios.post(registerRoute, {
        username: data.username, 
        email: data.email,
        password: data.password
      })
      console.log(response);
      const successMsg = response.data.message;
      toast.success(successMsg);
      navigate('/login');
    } catch (error) {
      const errorMsg = error.response.data.message;
      toast.error(errorMsg);
      console.log("Something went wrong while registering: ", error);
    }
  }

  return (
    <div className='flex justify-center items-center h-screen bg-indigo-600'>
      <div className='w-96 p-6 bg-white rounded-md'>
        <h1 className='text-3xl block text-center font-semibold'>Register</h1>
        <hr className='mt-3'/>
        <form onSubmit={handleSubmit(onSubmit, handleErrors)} className='mt-3 flex flex-col'>
          <div className='mt-3'>
            <label htmlFor="username" className='block text-base'>Username: </label>
            <input
              type='text'
              id='username'
              placeholder='Username'
              {...register('username', {
                required: "Username is required"
              })}
              className='border w-full text-base px-2 py-1 mb-2 foucs:oultine-none focus:border-gray-600'
            />
          </div>
          
          <div>
            <label htmlFor="email" className='block text-base'>Email: </label>
            <input
              type='email'
              id='email'
              placeholder='Email'
              {...register('email', {
                required: "Email is required"
              })}
              className='border w-full text-base px-2 py-1 mb-2 foucs:oultine-none focus:border-gray-600'
            />
          </div>
          
          <div>
            <label htmlFor="password" className='block text-base'>Password: </label>
            <input
              type='password'
              id='password'
              placeholder='Password'
              {...register('password', {
                required: "Password is required"
              })}
              className='border w-full text-base px-2 py-1 mb-2 foucs:oultine-none focus:border-gray-600'
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className='block text-base'>Confirm Password: </label>
            <input
              type='password'
              id='confirmPassword'
              placeholder='Confirm Password'
              {...register('confirmPassword', {
                required: "Confirm Password is required"
              })}
              className='border w-full text-base px-2 py-1 mb-2 foucs:oultine-none focus:border-gray-600'
            />
          </div>

          <button 
          type='submit' 
          disabled={isSubmitting} 
          className='bg-indigo-600 text-white mt-4 mb-4 rounded-md font-bold p-1'
          >
            {isSubmitting ? "Loading" : "Create"}
          </button>
          <span>Already have an account? <Link to='/login' className='text-indigo-600'>Login</Link></span>
        </form>
      </div>
    </div>
  );
}

export default Register;
