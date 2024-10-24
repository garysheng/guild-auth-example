'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import LoadingIndicator from '../../components/LoadingIndicator';

const ApprenticeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 mb-4 text-blue-500">
    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
  </svg>
);

export default function ApprenticeHall() {
  const { checkIfUserHasAtLeastThisRank } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      const hasRequiredRank = await checkIfUserHasAtLeastThisRank('apprentice');
      setIsLoading(false);
      if (!hasRequiredRank) {
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
      <ApprenticeIcon />
      <h1 className="text-4xl font-bold mb-8">Apprentice Hall (Level 1)</h1>
      <p>Welcome, young apprentice! Here you can learn the basics of our craft.</p>
    </div>
  );
}
