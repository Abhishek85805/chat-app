import React, {useEffect} from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { loginRoute } from '../utils/ApiRoutes';
import {toast} from 'sonner'


function Login() {
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate('/');
    }
  }, []);

  const {
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }
  } = useForm();

  const handleErrors = () => {
    if(errors.username){
      toast.error(errors.username.message);
    }

    if(errors.password){
      toast.error(errors.password.message);
    }
  }

  const onSubmit = async(data) => {
    try {
      const response = await axios.post(loginRoute, {
        username: data.username,
        password: data.password
      })
      localStorage.setItem('chat-app-user', JSON.stringify(response.data.data));
      const successMsg = response.data.message;
      toast.success(successMsg);
      navigate('/');
    } catch (error) {
      const errorMsg = error.response.data.message;
      toast.error(errorMsg);
      console.log("Something went wrong while registering: ", error);
    }
  }

  return (
    <div className='flex justify-center items-center h-screen bg-indigo-600'>
      <div className='w-96 p-6 bg-white rounded-md'>
        <h1 className='text-3xl block text-center font-semibold'>Login</h1>
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

          <button 
          type='submit' 
          disabled={isSubmitting} 
          className='bg-indigo-600 text-white mt-4 mb-4 rounded-md font-bold p-1'
          >
            {isSubmitting ? "Loading" : "Login"}
          </button>
          <span>Don't have an account? <Link to='/register' className='text-indigo-600'>Register</Link></span>
        </form>
      </div>
    </div>
  );
}

export default Login;
