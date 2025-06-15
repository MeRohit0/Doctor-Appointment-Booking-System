import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                {/* ------------------ Left Section  ---------------------- */}
                <div >
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Prescripto is a modern hospital management platform designed to simplify the appointment booking process, streamline patient-doctor communication, and enhance hospital operations. Built using the latest web technologies, Prescripto ensures a secure, user-friendly, and efficient healthcare experience for both patients and medical professionals.</p>
                </div>
                {/* ------------------ Center Section  ---------------------- */}
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                {/* ------------------ Right Section  ---------------------- */}
                <div >
                    <p className='text-xl font-medium mb-5'> GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+91-9999999999</li>
                        <li>rohityadav3461@gmail.com</li>
                        <li><a href="https://www.linkedin.com/in/merohit0">merohit0</a></li>
                        <li><a href="https://github.com/MeRohit0">MeRohit0</a></li>
                    </ul>
                </div>
            </div>
            {/* -------- Copyright text ---------- */}
            <div >
                <hr className='text-gray-600'/>
                <p className='py-5 text-sm text-center'>Copyright © 2025 <a className='text-primary' href="https://www.linkedin.com/in/merohit0">Rohit</a> - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer