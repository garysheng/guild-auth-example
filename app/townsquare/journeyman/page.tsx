'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import LoadingIndicator from '../../components/LoadingIndicator';
const JourneymanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 mb-4 text-green-500">
    <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
    <path fillRule="evenodd" d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z" clipRule="evenodd" />
  </svg>
);

export default function JourneymanQuarter() {
  const { checkIfUserHasAtLeastThisRank } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      const hasJourneymanRank = await checkIfUserHasAtLeastThisRank('journeyman');
      setIsLoading(false);
      if (!hasJourneymanRank) {
        router.push('/townsquare');
      }
    };
    checkAccess();
  }, [checkIfUserHasAtLeastThisRank, router]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <JourneymanIcon />
      <h1 className="text-4xl font-bold mb-8">Journeyman Quarter (Level 2)</h1>
      <p>Welcome, skilled journeyman! Here you can take on more advanced tasks.</p>
    </div>
  );
}
