'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { FaGithub, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';
import { useUser } from '../context/UserContext';
import Link from 'next/link';

const Navbar = () => {
    const { data: session } = useSession();
    const { user, setUser } = useUser();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (session) {
            setUser({
                name: session.user.name,
                email: session.user.email,
            });
        } else {
            setUser(null);
        }
    }, [session, setUser]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <nav className='bg-gray-800 p-4'>
            <div className=' flex justify-between items-center'>
                <div className="flex items-center space-x-3 font-extrabold md:text-2xl text-xl">
                    <img className="md:w-14 w-9 rounded-full" src="/favicon.ico" alt="Logo" />
                    <Link href="/" passHref>
                        <span className="tracking-wide text-yellow-400 font-extrabold text-xl md:text-3xl">USAFE</span>
                    </Link>
                </div>

                <div className='relative'>
                    {user ? (
                        <div className='flex items-center space-x-4'>
                            <FaUserCircle
                                className='text-white text-3xl cursor-pointer'
                                onClick={toggleDropdown}
                            />
                            {dropdownOpen && (
                                <div
                                    ref={dropdownRef}
                                    className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10'
                                    style={{ top: 'calc(100% + 10px)' }} // Position the dropdown below the icon
                                >
                                    <div className='px-4 py-2 text-gray-800 font-semibold bg-gray-100 border-b'>
                                        {user.name}
                                    </div>
                                    <button
                                        onClick={() => signOut()}
                                        className='w-full text-left px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white flex items-center space-x-2 transition-colors duration-200'
                                    >
                                        <FaSignOutAlt />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => signIn('github')}
                            className='flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300'
                        >
                            <FaGithub />
                            <span>Sign in with GitHub</span>
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
