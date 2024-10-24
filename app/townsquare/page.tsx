'use client';

import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingIndicator from '../components/LoadingIndicator';
import { abbreviateAddress } from '../utils/addressUtils';

const BuildingIcon = ({ type }: { type: 'apprentice' | 'journeyman' | 'master' }) => {
  const icons = {
    apprentice: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 mb-2">
        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
      </svg>
    ),
    journeyman: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 mb-2">
        <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
        <path fillRule="evenodd" d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z" clipRule="evenodd" />
      </svg>
    ),
    master: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-40 h-40 mb-4">
        <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
        <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
        <path d="M12 7.875a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
      </svg>
    ),
  };

  return icons[type];
};

const PicketSign = () => (
  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10">
    <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-300">
      <p className="text-center text-xl font-bold text-gray-800">Where your Guild Member Journey begins</p>
    </div>
    <div className="w-2 h-24 bg-brown-600 mx-auto rounded-b"></div>
  </div>
);

export default function TownSquare() {
  const { authUser, isLoadingAuthUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoadingAuthUser && !authUser) {
      router.push('/signin');
    }
  }, [authUser, isLoadingAuthUser, router]);

  if (isLoadingAuthUser) {
    return <LoadingIndicator />;
  }

  if (!authUser) {
    return null;
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold my-8">Town Square</h1>
      <p className="mb-4">Welcome to the Town Square, {authUser ? abbreviateAddress(authUser.uid) : 'Guest'}!</p>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 max-w-2xl">
        <p className="font-bold">Access Information</p>
        <p>
          If you can't access certain areas due to your current role, you can try to achieve a higher rank!
        </p>
        <p>
          View the requirements for different roles at{' '}
          <a
            href="https://guild.xyz/guild-auth-example"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            https://guild.xyz/guild-auth-example
          </a>
        </p>
      </div>
      <div className="relative w-full max-w-4xl pb-24">
        {/* Main Vertical Road */}
        <div className="absolute left-1/2 top-48 bottom-20 w-16 bg-gray-400 transform -translate-x-1/2 z-0"></div>
        {/* Road markings */}
        <div className="absolute left-1/2 top-48 bottom-20 w-2 bg-yellow-300 transform -translate-x-1/2 flex flex-col justify-between z-0">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="h-8 w-full bg-gray-400"></div>
          ))}
        </div>
        {/* Buildings */}
        <div className="flex flex-col items-center space-y-32 py-16">
          {/* Master's Sanctum at the top */}
          <div className="w-full flex justify-center mb-16">
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-lg"></div>
              <Link href="/townsquare/master" className="relative flex flex-col items-center bg-yellow-500 text-white p-8 rounded-lg shadow-xl hover:bg-yellow-600 transition-colors w-96 z-10 animate-pulse">
                <BuildingIcon type="master" />
                <span className="text-center text-2xl font-bold">Master's Sanctum<br />(Level 3)</span>
              </Link>
            </div>
          </div>
          {/* Journeyman Quarter */}
          <div className="w-full flex justify-end items-center">
            {/* Side street for Journeyman */}
            <div className="h-2 w-48 bg-gray-400"></div>
            <Link href="/townsquare/journeyman" className="flex flex-col items-center bg-green-500 text-white p-6 rounded-lg shadow-lg hover:bg-green-600 transition-colors w-64">
              <BuildingIcon type="journeyman" />
              <span className="text-center text-xl">Journeyman Quarter<br />(Level 2)</span>
            </Link>
          </div>
          {/* Apprentice Hall */}
          <div className="w-full flex justify-start items-center">
            <Link href="/townsquare/apprentice" className="flex flex-col items-center bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:bg-blue-600 transition-colors w-64">
              <BuildingIcon type="apprentice" />
              <span className="text-center text-xl">Apprentice Hall<br />(Level 1)</span>
            </Link>
            {/* Side street for Apprentice */}
            <div className="h-2 w-48 bg-gray-400"></div>
          </div>
        </div>
        {/* Picket Sign */}
        <PicketSign />
      </div>
    </div>
  );
}
