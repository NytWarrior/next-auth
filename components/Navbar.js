import Link from 'next/link';
import React from 'react';

const Navbar = ({ user, logout }) => {

    return (
        <header className="text-gray-600 body-font sticky top-0 z-10 bg-white">
            <div className="container mx-auto flex justify-between p-5  md:flex-row  w-full ">
                <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                        <path d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"></path>
                    </svg>
                    <span className="ml-3 text-xl">NextAuth</span>
                </Link>

                <div className='absolute right-2'>
                    {user.value && <button onClick={logout} className="inline-flex text-white bg-indigo-500 border-0 py-1 px-2 mx-2 my-1 focus:outline-none hover:bg-indigo-600 rounded">Logout</button>}

                </div>
                <div className='flex '>
                    {!user.value && <Link href={'/signin'}><button className="inline-flex text-white bg-indigo-500 border-0 py-1 px-2 mx-2 my-1 focus:outline-none hover:bg-indigo-600 rounded">Sign In</button></Link>}

                </div>

            </div>
        </header >
    )
}

export default Navbar;