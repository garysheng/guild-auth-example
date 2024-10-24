import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/app/contexts/AuthContext';

const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
  </svg>
);

const HomePage: React.FC = () => {
  const { authUser } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-green-400 p-4 relative">
      {authUser ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <Link href="/townsquare" className="transform transition-transform hover:scale-110">
            <MapIcon />
          </Link>
          <p className="mt-4 text-2xl font-bold text-white text-center">
            Click the map to enter the Town Square!
          </p>
          <p className="mt-2 text-xl text-green-400 animate-pulse">
            Adventure awaits!
          </p>
        </div>
      ) : (
        <div className="max-w-2xl text-left">
          <Image
            src="/apple-touch-icon.png"
            alt="Castle Logo"
            width={80}
            height={80}
            className="mb-8"
          />
          <h1 className="text-4xl font-bold mb-8">Guild Auth Example</h1>
          <p className="mb-6 text-lg">
            Welcome to the Guild Auth Example! This app demonstrates how to implement role-based access control using <a href="https://guild.xyz/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Guild.xyz</a> in a web3 application.
          </p>
          <p className="mb-6">
            Key features:
          </p>
          <ul className="list-disc list-inside mb-6 text-left">
            <li>Connect your wallet and authenticate with Guild.xyz</li>
            <li>Access different areas based on your Guild rank</li>
            <li>Explore a simple town square with rank-gated buildings</li>
            <li>See Guild's gating features in action</li>
          </ul>
          <p className="mb-6">
            This example serves as a starting point for developers to integrate Guild.xyz into their projects, showcasing the power of Guild's SDK with a practical implementation. For more information, check out the <a href="https://help.guild.xyz/en/collections/3826821-developer-docs" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Guild.xyz Developer Documentation</a>.
          </p>
          <p className="mb-8">
            Ready to explore? Connect your wallet and join the Guild to get started!
          </p>
          <Link href="/signin" className="bg-green-500 text-black px-6 py-3 rounded text-lg font-semibold hover:bg-green-600 transition-colors">
            Connect With Guild
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
