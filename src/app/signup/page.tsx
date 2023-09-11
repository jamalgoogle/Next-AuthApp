"use client";
import React  from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';



export default function signupPage(){

    const router = useRouter()

    const [user , setUser] = React.useState({
        username: "",
        password: "",
        email: "",  
    })

    const onSignup = async() =>{
        try {
            const response = await axios.post('/api/users/signup' , user)
            console.log(response.data)
        } catch (error : any) {
            console.log('singn up failed' , error.messge)
            toast.error(error.messge);
        } 
    }
    return(
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            {/* <h1     className='mb-8 rounded-full p-2 font-extrabold underline underline-offset-8 '>sign up</h1> */}
            
            <input 
                className='p-2 m-2 w-96 border border-gray-300 rounded-lg mb-4 bg-white focus: outline-none focus:border-gray-600 text-black'
                id='username'
                type="text"
                value={user.username}
                onChange={(e)=> setUser({...user , username: e.target.value})}
                placeholder='username'
            />
            <input 
                className='p-2 m-2 border w-96 border-gray-300 rounded-lg mb-4 bg-white focus: outline-none focus:border-gray-600 text-black'
                id='email'
                type="email" 
                value={user.email}
                onChange={(e)=> setUser({...user , email: e.target.value})}
                placeholder='email'
            />
            <input
                className='p-2 m-2 border w-96 border-gray-300 rounded-lg mb-4 bg-white focus: outline-none focus:border-gray-600 text-black' 
                id='password'
                type="password" 
                value={user.password}
                onChange={(e)=> setUser({...user , password: e.target.value})}
                placeholder='password'
            />
            <button
            onClick={onSignup}
            className='p-2 m-2 bg-orange-400 rounded-lg text-black hover:bg-orange-300'
            >
                sign up
            </button>
            <p>already have an acount? <Link href='/login'><span className='text-orange-400 hover:text-orange-300 cursor-pointer'>Login</span></Link></p>
        </div>
    )
}