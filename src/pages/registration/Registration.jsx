import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
    // const { createUser, googleSignIn } = useAuth();
    const [error, setError] = useState();
    const [showPassword, setShowPassword] = useState(false);
    // const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const hanldeRegister = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // const image = form.image.value;

        // const userInfo = {
        //     name: form.name.value,
        //     email: form.email.value,
        //     role: "user"
        // }
        // console.log(userInfo)

        // setError('');

        // createUser(email, password)
        //     .then(result => {
        //         console.log(result.user)

        //         // updated user profile
        //         updateProfile(result?.user, {
        //             displayName: form.name.value,
        //             photoURL: "https://i.ibb.co/wzY7xRG/bronze.png"
        //         });

        //         // insert user data to the database
        //         axiosPublic.post('/user', userInfo)
        //             .then(res => {
        //                 if (res.data.message === "Success") {
        //                     Swal.fire({
        //                         position: "top-end",
        //                         icon: "success",
        //                         title: "Successfully registered",
        //                         showConfirmButton: false,
        //                         timer: 1500
        //                     });
        //                     navigate('/message')
        //                 }
        //             })
        //     })
        //     .catch(error => {
        //         setError(error.message)
        //     })
    }



    return (
        <div className=' font-Montserrat w-full'>
            <div className='bg-[#ebedfe] w-full text-center 4xl:py-12 py-5 text-[#565fa8] flex justify-center items-center'>
                <h1 className="text-4xl font-bold mt-10">Register Now</h1>
            </div>
            <div className="flex md:bg-white bg-[#F3F3F3] items-center justify-center h-full 4xl:py-20 py-10 rounded-lg">
                <div className='flex flex-col w-full md:w-[768px] '>
                    <div className='bg-[#ebedfe] rounded-lg py-[10%] px-[5%] md:px-[15%]'>
                        <form onSubmit={hanldeRegister} className='flex flex-col gap-4 mt-2'>
                            <div className='flex justify-center  flex-row gap-4 items-center relative'>
                                <input type="text" placeholder='Full Name'
                                    name='name'
                                    className='w-full py-4 bg-[#ebedfe] border-1.5 border-[#6f98b9] placeholder-[#444444] rounded-lg border outline-none pl-8 pr-2'
                                />
                            </div>
                            <div className='flex justify-center flex-col items-center relative'>
                                <input type="text" placeholder='Email' name='email'
                                    className='w-full bg-[#ebedfe] border-1.5 border-[#6f98b9] placeholder-[#444444] py-4 rounded-lg border outline-none pl-8 pr-2'
                                />
                            </div>
                            <div className='flex flex-col items-center justify-center relative'>
                                <input
                                    type={showPassword ? "text" : "password"} placeholder='Password' name='password'
                                    className='w-full py-4 bg-[#ebedfe] border-1.5 border-[#6f98b9] placeholder-[#444444] rounded-lg border outline-none pl-8 pr-2'
                                />
                                <span className='absolute right-0 cursor-pointer mr-5 mt-2' onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <FaEye className='text-xl' />
                                            : <FaEyeSlash className='text-xl' />
                                    }
                                </span>
                            </div>
                            <div className='flex items-center mt-5'>
                                <input type="checkbox" name="checkbox" id="checkbox" className='cursor-pointer bg-[#565fa8] mr-3' />
                                <label htmlFor="checkbox" className='font-normal text-lg text-[#444444] ml-1 cursor-pointer'>Remember Me</label>
                            </div>
                            <div className="px-[16%] flex gap-2">
                                {
                                    error ? <p className='text-red-600'>{error}</p> : ''
                                }
                            </div>
                            <div className='flex justify-center text-xl font-semibold text-white font-Montserrat'>
                                <button className='w-full py-4 bg-[#565fa8] text-white hover:bg-[#565fa8] rounded-lg'>Register</button>
                            </div>
                        </form>
                        <div className=' mt-16 flex items-center justify-center '>
                            <h4 className='flex gap-2  '>Already have an account? <Link to={"/login"} className='text-[#6486FD] font-bold cursor-pointer'>Log In</Link></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;