'use client'

import { useState } from 'react'

interface TrustResult {
  address: string
  score: number
  status: 'Trusted' | 'Suspicious' | 'Neutral' | 'Verified'
  transactions: number
  reports: number
  verifications: number
  riskLevel: 'Low' | 'Medium' | 'High'
  lastActivity: string
  reputation: {
    positive: number
    negative: number
    neutral: number
  }
  badges: string[]
}

export default function TrustScoreChecker() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TrustResult | null>(null)

  const checkTrustScore = async () => {
    if (!address) return
    
    setLoading(true)
    
    // Simulate API call with realistic data
    setTimeout(() => {
      const score = Math.floor(Math.random() * 100)
      const transactions = Math.floor(Math.random() * 5000) + 100
      const reports = Math.floor(Math.random() * 20)
      const verifications = Math.floor(Math.random() * 50)
      
      let status: 'Trusted' | 'Suspicious' | 'Neutral' | 'Verified' = 'Neutral'
      let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium'
      
      if (score > 80) {
        status = 'Verified'
        riskLevel = 'Low'
      } else if (score > 60) {
        status = 'Trusted'
        riskLevel = 'Low'
      } else if (score < 40) {
        status = 'Suspicious'
        riskLevel = 'High'
      }
      
      const badges = []
      if (score > 80) badges.push('Verified User')
      if (transactions > 1000) badges.push('Active Trader')
      if (verifications > 30) badges.push('Community Trusted')
      if (reports === 0) badges.push('Clean Record')
      
      setResult({
        address,
        score,
        status,
        transactions,
        reports,
        verifications,
        riskLevel,
        lastActivity: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        reputation: {
          positive: Math.floor(Math.random() * 100),
          negative: Math.floor(Math.random() * 20),
          neutral: Math.floor(Math.random() * 50)
        },
        badges
      })
      setLoading(false)
    }, 2000)
  }

  const getScoreColor = (score: number) => {
    if (score > 70) return 'text-green-400'
    if (score > 40) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getStatusColor = (status: string) => {
    if (status === 'Verified' || status === 'Trusted') return 'text-green-400'
    if (status === 'Suspicious') return 'text-red-400'
    return 'text-yellow-400'
  }

  return (
    <section id="trust-checker" className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Check Trust Score
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Enter a Cardano wallet address or domain to verify trust and reputation
        </p>
        
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter wallet address (addr1...) or domain..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-900 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={checkTrustScore}
            disabled={loading || !address}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Check'}
          </button>
        </div>

        {result && (
          <div className="space-y-6">
            {/* Main Score Card */}
            <div className="bg-slate-900/50 rounded-lg p-6 border border-purple-500/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-gray-400 text-sm">Trust Score</span>
                  <div className={`text-5xl font-bold ${getScoreColor(result.score)}`}>
                    {result.score}/100
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 text-sm">Status</span>
                  <div className={`text-2xl font-bold ${getStatusColor(result.status)}`}>
                    {result.status}
                  </div>
                  <div className={`text-sm mt-1 ${result.riskLevel === 'Low' ? 'text-green-400' : result.riskLevel === 'High' ? 'text-red-400' : 'text-yellow-400'}`}>
                    Risk: {result.riskLevel}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 rounded-full h-3 mb-4">
                <div 
                  className={`h-3 rounded-full transition-all ${result.score > 70 ? 'bg-green-500' : result.score > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${result.score}%` }}
                ></div>
              </div>

              {/* Badges */}
              {result.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {result.badges.map((badge, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs border border-purple-500/30">
                      ✓ {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/20">
                <div className="text-gray-400 text-sm mb-1">Total Transactions</div>
                <div className="text-white text-2xl font-bold">{result.transactions.toLocaleString()}</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/20">
                <div className="text-gray-400 text-sm mb-1">Verifications</div>
                <div className="text-white text-2xl font-bold">{result.verifications}</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/20">
                <div className="text-gray-400 text-sm mb-1">Reports</div>
                <div className={`text-2xl font-bold ${result.reports === 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {result.reports}
                </div>
              </div>
            </div>

            {/* Reputation Breakdown */}
            <div className="bg-slate-900/50 rounded-lg p-6 border border-purple-500/20">
              <h3 className="text-white font-semibold mb-4">Reputation Breakdown</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-green-400">Positive Feedback</span>
                    <span className="text-white">{result.reputation.positive}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${result.reputation.positive}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-yellow-400">Neutral Feedback</span>
                    <span className="text-white">{result.reputation.neutral}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${result.reputation.neutral}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-red-400">Negative Feedback</span>
                    <span className="text-white">{result.reputation.negative}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: `${result.reputation.negative}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/20">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Last Activity</span>
                <span className="text-white">{result.lastActivity}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-400">Address</span>
                <span className="text-white font-mono text-xs">{result.address.slice(0, 20)}...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
