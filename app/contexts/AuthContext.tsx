import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { signInWithCustomToken, User } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { createSigner, createGuildClient } from '@guildxyz/sdk';

const GUILD_ID = parseInt(process.env.NEXT_PUBLIC_GUILD_ID!);
const GUILD_SLUG = process.env.NEXT_PUBLIC_GUILD_SLUG!;
const guildClient = createGuildClient(GUILD_SLUG);

export type GuildRole = 'apprentice' | 'journeyman' | 'master';

const GuildRoleMap: Record<GuildRole, number> = {
  'apprentice': parseInt(process.env.NEXT_PUBLIC_GUILD_ROLE_APPRENTICE_ID!),
  'journeyman': parseInt(process.env.NEXT_PUBLIC_GUILD_ROLE_JOURNEYMAN_ID!),
  'master': parseInt(process.env.NEXT_PUBLIC_GUILD_ROLE_MASTER_ID!),
}

const RankOrder: GuildRole[] = ['apprentice', 'journeyman', 'master'];

interface AuthContextType {
  authUser: User | null;
  userRank: GuildRole | null;
  isLoadingAuthUser: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  checkIfUserHasAtLeastThisRank: (requiredRole: GuildRole) => Promise<boolean>;
  getHighestCurrentUserRank: () => Promise<GuildRole | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRank, setUserRank] = useState<GuildRole | null>(null);
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isLoadingAuthUser, setIsLoadingAuthUser] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoadingAuthUser(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    if (!isConnected || !address) {
      throw new Error("Wallet not connected");
    }

    const isMember = await verifyGuildMembership(address, async ({ message }) => {
      return await signMessageAsync({ message });
    });

    if (isMember) {
      const response = await fetch('/api/get-custom-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: address }),
      });

      const { customToken } = await response.json();
      await signInWithCustomToken(auth, customToken);
    } else {
      throw new Error("Not a guild member");
    }
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    setUserRank(null);
  };

  const getHighestCurrentUserRank = useCallback(async (): Promise<GuildRole | null> => {
    if (!user || !isConnected || !address) return null;

    try {
      const userMemberships = await guildClient.user.getMemberships(
        user.uid,
      );

      const currentGuildMembership = userMemberships.find(membership => membership.guildId === GUILD_ID);

      if (currentGuildMembership) {
        for (const rank of RankOrder.slice().reverse()) {
          if (currentGuildMembership.roleIds.includes(GuildRoleMap[rank])) {
            return rank;
          }
        }
      }
    } catch (error) {
      console.error('Error checking rank:', error);
    }

    return null;
  }, [user, isConnected, address]);

  const checkIfUserHasAtLeastThisRank = useCallback(async (requiredRole: GuildRole): Promise<boolean> => {
    if (!user || !isConnected || !address) return false;

    try {
      const highestRank = await getHighestCurrentUserRank();
      setUserRank(highestRank);

      if (!highestRank) return false;

      const requiredRankIndex = RankOrder.indexOf(requiredRole);
      const userRankIndex = RankOrder.indexOf(highestRank);

      return userRankIndex >= requiredRankIndex;
    } catch (error) {
      console.error('Error checking rank:', error);
    }

    return false;
  }, [user, isConnected, address, getHighestCurrentUserRank]);

  return (
    <AuthContext.Provider value={{
      authUser: user,
      userRank,
      isLoadingAuthUser,
      login,
      logout,
      checkIfUserHasAtLeastThisRank,
      getHighestCurrentUserRank,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

async function verifyGuildMembership(address: string, signMessageAsync: (params: { message: string }) => Promise<string>): Promise<boolean> {
  if (!address) {
    console.error('Address is not provided');
    return false;
  }

  try {
    const signerFunction = createSigner.custom(
      (message) => signMessageAsync({ message }),
      address
    );

    const guild = await guildClient.guild.get(GUILD_SLUG);
    const accessCheckResponse = await guildClient.guild.accessCheck(guild.id, signerFunction);

    return accessCheckResponse.some(access => access.access === true);
  } catch (error) {
    console.error('Error verifying guild membership:', error);
    return false;
  }
}
