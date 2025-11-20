'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import TrustScoreChecker from '@/components/TrustScoreChecker'
import Hero from '@/components/Hero'
import Features from '@/components/Features'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="flex justify-between items-center p-6 border-b border-purple-500/20">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Authena</h1>
        </div>
        <ConnectButton />
      </nav>

      <Hero />
      <TrustScoreChecker />
      <Features />
    </main>
  )
}
