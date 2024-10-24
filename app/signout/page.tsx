"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

const SignOutPage = () => {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    const performSignOut = async () => {
      try {
        await logout();
        console.log('User signed out successfully');
        router.push('/'); // Redirect to home page after sign out
      } catch (error) {
        console.error('Error signing out:', error);
        // Optionally, you can still redirect to home page even if there's an error
        router.push('/');
      }
    };

    performSignOut();
  }, [logout, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-green-500 font-mono">
      <p>Signing out...</p>
    </div>
  );
};

export default SignOutPage;
