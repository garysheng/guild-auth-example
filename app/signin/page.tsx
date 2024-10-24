'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { toast } from 'react-hot-toast';
import { abbreviateAddress } from '../utils/addressUtils';

export default function SignIn() {
  const router = useRouter();
  const { authUser, login } = useAuth();
  const { address, isConnected } = useAccount();
  const { connect, connectors, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();
  const [error, setError] = useState<string | null>(null);
  const [isAttemptingToJoin, setIsAttemptingToJoin] = useState(false);
  const [selectedConnector, setSelectedConnector] = useState<string | null>(null);

  useEffect(() => {
    if (authUser) {
      toast.success('Welcome to Guild Auth Example!');
      router.push('/profile');
    }
  }, [authUser, router]);

  useEffect(() => {
    if (connectError) {
      toast.error('Failed to connect wallet. Please try again or use a different method.' + connectError.message);
      setError(connectError.message);
    }
  }, [connectError]);

  const handleConnectWallet = async () => {
    setError(null);
    if (!selectedConnector) {
      setError("Please select a wallet to connect");
      return;
    }
    const connector = connectors.find(c => c.id === selectedConnector);
    if (!connector) {
      setError("Selected wallet not found");
      return;
    }
    try {
      await connect({ connector });
      toast.success("Connected to " + connector.name);
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      setError("Failed to connect wallet. Please try again or use a different method.");
    }
  };

  const handleSignInAttempt = async () => {
    setIsAttemptingToJoin(true);
    setError(null);
    try {
      console.log("Attempting to sign in");
      await login();
    } catch (err) {
      console.error("Failed to sign in:", err);
      setError("Failed to sign in. Please try again.");
    } finally {
      setIsAttemptingToJoin(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (err) {
      console.error("Failed to disconnect:", err);
      setError("Failed to disconnect. Please try again.");
    }
  };

  if (authUser) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-4">
      <h1 className="text-4xl font-bold mb-8">Sign In to Guild Auth Example</h1>
      
      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}
      
      <div className="flex flex-col items-center w-full max-w-md">
        {!isConnected ? (
          <div className="space-y-4 w-full">
            <select
              value={selectedConnector || ''}
              onChange={(e) => setSelectedConnector(e.target.value)}
              className="bg-white border border-gray-300 text-gray-900 font-bold py-2 px-4 rounded w-full"
            >
              <option value="">Select a wallet</option>
              {connectors.map((connector) => (
                <option key={connector.id} value={connector.id}>
                  {connector.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleConnectWallet}
              disabled={!selectedConnector || isAttemptingToJoin}
              className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 w-full ${
                (!selectedConnector || isAttemptingToJoin) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isAttemptingToJoin ? 'Connecting...' : 'Connect Wallet'}
            </button>
          </div>
        ) : (
          <div className="space-y-4 w-full">
            <p className="text-center">Connected with {abbreviateAddress(address)}</p>
            <button
              onClick={handleSignInAttempt}
              disabled={isAttemptingToJoin}
              className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 w-full ${isAttemptingToJoin ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isAttemptingToJoin ? 'Verifying...' : 'Verify Guild Membership'}
            </button>
            <button
              onClick={handleDisconnect}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 w-full"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
      
      <Link href="/" className="mt-8 text-blue-500 hover:text-blue-600 underline">
        Back to Home
      </Link>
    </div>
  );
}
