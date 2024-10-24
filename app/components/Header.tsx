"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { FaUser } from 'react-icons/fa';

const Header: React.FC = () => {
  const { authUser } = useAuth();

  return (
    <header className="bg-gray-800 text-green-400 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Guild Auth Example
        </Link>
        <nav className="flex items-center">
          {authUser ? (
            <>
              <Link href="/townsquare" className="mr-4">Town Square</Link>
              <Link href="/profile" className="text-green-400 hover:text-green-300">
                <FaUser size={24} />
              </Link>
            </>
          ) : (
            <Link href="/signin" className="bg-green-500 text-black px-2 py-1 rounded">
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
