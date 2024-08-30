import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white py-3">
            <div className="container mx-auto text-center">
                <div className="mb-4">
                    <p className="text-2xl font-extrabold text-yellow-400">SafeU &copy; {currentYear}</p>
                    <p className="text-lg font-bold text-gray-400">Created By Harman</p>
                </div>
                <div className="mt-6 text-sm text-gray-500">
                    <p>Follow me on social media for updates and more.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

