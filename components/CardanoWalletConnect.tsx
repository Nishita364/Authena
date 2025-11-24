'use client'

import { useState, useEffect } from 'react'

// Define types for Cardano wallet API
interface CardanoAPI {
  getBalance(): Promise<string>
  getUsedAddresses(): Promise<string[]>
  getNetworkId(): Promise<number>
  enable(): Promise<CardanoAPI>
}

interface CardanoWallet {
  name: string
  icon: string
  apiVersion: string
  enable(): Promise<CardanoAPI>
  isEnabled(): Promise<boolean>
}

declare global {
  interface Window {
    cardano?: {
      vespr?: CardanoWallet
      [key: string]: CardanoWallet | undefined
    }
  }
}

export default function CardanoWalletConnect() {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState<string>('')
  const [balance, setBalance] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const connectVespr = async () => {
    setLoading(true)
    try {
      // Check if window.cardano exists
      if (typeof window === 'undefined' || !window.cardano) {
        alert('No Cardano wallet detected. Please install VESPR wallet extension.')
        window.open('https://chromewebstore.google.com/detail/vespr-wallet/ghpjaihnbhbhfmmndfaljiggmjbkkhkf', '_blank')
        setLoading(false)
        return
      }

      // Check if VESPR wallet is installed
      if (!window.cardano.vespr) {
        alert('VESPR wallet not found. Redirecting to Chrome Web Store...')
        window.open('https://chromewebstore.google.com/detail/vespr-wallet/ghpjaihnbhbhfmmndfaljiggmjbkkhkf', '_blank')
        setLoading(false)
        return
      }

      // Enable VESPR wallet
      const api = await window.cardano.vespr.enable()

      // Get wallet address
      const addresses = await api.getUsedAddresses()
      if (addresses && addresses.length > 0) {
        // Convert hex address to bech32 format (simplified display)
        setAddress(addresses[0])
      }

      // Get balance (in lovelace, convert to ADA)
      const balanceHex = await api.getBalance()
      // Simple conversion - in production you'd want proper hex to number conversion
      const lovelace = parseInt(balanceHex, 16) || 0
      const ada = (lovelace / 1000000).toFixed(2)
      setBalance(ada)

      setConnected(true)
    } catch (error) {
      console.error('Error connecting to VESPR wallet:', error)
      alert('Failed to connect to VESPR wallet. Please make sure it is installed and unlocked.')
    } finally {
      setLoading(false)
    }
  }

  const disconnectWallet = () => {
    setConnected(false)
    setAddress('')
    setBalance('')
  }

  return (
    <div>
      {!connected ? (
        <button
          onClick={connectVespr}
          disabled={loading}
          className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition flex items-center gap-2 disabled:opacity-50"
        >
          <span>🔗</span>
          {loading ? 'Connecting...' : 'Connect VESPR Wallet'}
        </button>
      ) : (
        <div className="flex items-center gap-4">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg px-4 py-2">
            <div className="text-xs text-gray-400">Balance</div>
            <div className="text-white font-semibold">{balance} ADA</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg px-4 py-2">
            <div className="text-xs text-gray-400">Address</div>
            <div className="text-white font-mono text-sm">
              {address.slice(0, 8)}...{address.slice(-8)}
            </div>
          </div>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 border border-red-500/50 text-red-400 rounded-lg font-semibold hover:bg-red-500/10 transition"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  )
}
