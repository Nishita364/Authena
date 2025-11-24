'use client'

import { useState } from 'react'
import CardanoWalletConnect from '@/components/CardanoWalletConnect'
import TrustScoreChecker from '@/components/TrustScoreChecker'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import ReportScam from '@/components/ReportScam'
import VerifyIdentity from '@/components/VerifyIdentity'
import RecentActivity from '@/components/RecentActivity'
import Stats from '@/components/Stats'
import AITextDetector from '@/components/AITextDetector'
import AIAuthenticityGuard from '@/components/AIAuthenticityGuard'
import APITester from '@/components/APITester'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'home' | 'verify' | 'report' | 'activity' | 'aidetector' | 'test'>('home')
  const [showAuthenticityGuard, setShowAuthenticityGuard] = useState(false)

  // If Authenticity Guard is active, show only that
  if (showAuthenticityGuard) {
    return (
      <>
        {/* Toggle Button - Fixed Position */}
        <button
          onClick={() => setShowAuthenticityGuard(false)}
          className="fixed top-6 right-6 z-50 bg-gradient-to-r from-purple-400 to-pink-400 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all font-medium"
        >
          ← Back to Authena
        </button>
        <AIAuthenticityGuard />
      </>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <h1 className="text-2xl font-bold text-white">Authena</h1>
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full border border-blue-500/30">
                  Powered by Cardano
                </span>
              </div>
              
              {/* Navigation Tabs */}
              <div className="hidden md:flex gap-1">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`px-4 py-2 rounded-lg transition ${activeTab === 'home' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-400 hover:text-white'}`}
                >
                  Home
                </button>
                <button
                  onClick={() => setActiveTab('aidetector')}
                  className={`px-4 py-2 rounded-lg transition ${activeTab === 'aidetector' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-400 hover:text-white'}`}
                >
                  AI Detector
                </button>
                <button
                  onClick={() => setActiveTab('verify')}
                  className={`px-4 py-2 rounded-lg transition ${activeTab === 'verify' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-400 hover:text-white'}`}
                >
                  Verify Identity
                </button>
                <button
                  onClick={() => setActiveTab('report')}
                  className={`px-4 py-2 rounded-lg transition ${activeTab === 'report' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-400 hover:text-white'}`}
                >
                  Report Scam
                </button>
                <button
                  onClick={() => setActiveTab('activity')}
                  className={`px-4 py-2 rounded-lg transition ${activeTab === 'activity' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-400 hover:text-white'}`}
                >
                  Activity
                </button>
                <button
                  onClick={() => setActiveTab('test')}
                  className={`px-4 py-2 rounded-lg transition ${activeTab === 'test' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-400 hover:text-white'}`}
                >
                  🔧 Test API
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Toggle to Authenticity Guard */}
              <button
                onClick={() => setShowAuthenticityGuard(true)}
                className="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg font-medium hover:shadow-lg transition-all text-sm"
              >
                🎨 Authenticity Guard
              </button>
              <CardanoWalletConnect />
            </div>
          </div>
        </div>
      </nav>

      {/* Content based on active tab */}
      {activeTab === 'home' && (
        <>
          <Hero />
          <Stats />
          <TrustScoreChecker />
          <Features />
        </>
      )}

      {activeTab === 'aidetector' && <AITextDetector />}
      {activeTab === 'verify' && <VerifyIdentity />}
      {activeTab === 'report' && <ReportScam />}
      {activeTab === 'activity' && <RecentActivity />}
      {activeTab === 'test' && <APITester />}

      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-8 mt-12">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p className="mb-2">© 2024 Authena - Building Trust on Cardano</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-purple-400 transition">Documentation</a>
            <a href="#" className="hover:text-purple-400 transition">API</a>
            <a href="#" className="hover:text-purple-400 transition">GitHub</a>
            <a href="#" className="hover:text-purple-400 transition">Discord</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
