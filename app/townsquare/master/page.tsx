'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import LoadingIndicator from '../../components/LoadingIndicator';
const MasterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 mb-4 text-purple-500">
    <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
    <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
    <path d="M12 7.875a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
  </svg>
);

export default function MasterSanctum() {
  const { checkIfUserHasAtLeastThisRank } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      const hasMasterRank = await checkIfUserHasAtLeastThisRank('master');
      setIsLoading(false);
      if (!hasMasterRank) {
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
      <MasterIcon />
      <h1 className="text-4xl font-bold mb-8">Master&apos;s Sanctum (Level 3)</h1>
      <p>Welcome, esteemed master! Here you can guide the guild and make important decisions.</p>
    </div>
  );
}
