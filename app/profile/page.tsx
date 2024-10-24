'use client';

import React, { useEffect, useState } from 'react';
import { useAuth, GuildRole } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import LoadingIndicator from '../components/LoadingIndicator';
import { abbreviateAddress } from '../utils/addressUtils';
import Link from 'next/link';

export default function Profile() {
  const { authUser, isLoadingAuthUser, logout, getHighestCurrentUserRank } = useAuth();
  const [isCheckingRank, setIsCheckingRank] = useState(false);
  const [userRank, setUserRank] = useState<GuildRole | null>(null);
  const router = useRouter();

  const guildSlug = process.env.NEXT_PUBLIC_GUILD_SLUG;
  const guildUrl = `https://guild.xyz/${guildSlug}`;

  useEffect(() => {
    const checkUserRank = async () => {
      if (!isLoadingAuthUser && !authUser) {
        router.push('/signin');
      } else if (authUser && !userRank && !isCheckingRank) {
        setIsCheckingRank(true);
        const highestRank = await getHighestCurrentUserRank();
        setUserRank(highestRank);
        setIsCheckingRank(false);
      }
    };
    checkUserRank();
  }, [authUser, userRank, isLoadingAuthUser, router, getHighestCurrentUserRank, isCheckingRank]);

  const handleSignOut = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (isLoadingAuthUser || isCheckingRank) {
    return <LoadingIndicator />;
  }

  if (!authUser) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Profile</h1>
      <p className="mb-4">Welcome, {abbreviateAddress(authUser.uid)}!</p>
      <p className="mb-4">You are authenticated and a member of the guild.</p>
      <p className="mb-4">Your current rank: <span className="font-bold">{userRank || 'No rank'}</span></p>
      <Link href={guildUrl} target="_blank" rel="noopener noreferrer" className="mb-8 text-blue-500 hover:text-blue-700 underline">
        View Guild on Guild.xyz
      </Link>
      <button
        onClick={handleSignOut}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign Out
      </button>
    </div>
  );
}
