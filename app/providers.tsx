'use client'

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum } from 'viem/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { cookieStorage, createStorage, cookieToInitialState, Config } from '@wagmi/core'
import { WagmiProvider } from 'wagmi'
import { AuthProvider } from './contexts/AuthContext'
import { walletConnect } from '@wagmi/connectors'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
if (!projectId) {
  throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not provided in the environment variables');
}

const metadata = {
  name: 'Guild Auth Example',
  description: 'Example of Guild.xyz authentication',
  url: '', // Update this with your actual domain
  icons: [''] // Update this with your actual icon path
}

export const networks = [mainnet, arbitrum]

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  connectors: [
    walletConnect({
      projectId
    })
  ],
  ssr: true,
  projectId,
  networks
})

const chains: readonly [typeof mainnet, typeof arbitrum] = [mainnet, arbitrum]
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

createWeb3Modal({ wagmiConfig: config, projectId })

const queryClient = new QueryClient()

export function ContextProvider({ children, cookies }: { children: React.ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
