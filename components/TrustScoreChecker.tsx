'use client'

import { useState } from 'react'

export default function TrustScoreChecker() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const checkTrustScore = async () => {
    if (!address) return
    
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setResult({
        score: Math.floor(Math.random() * 100),
        status: Math.random() > 0.5 ? 'Trusted' : 'Suspicious',
        transactions: Math.floor(Math.random() * 1000),
        reports: Math.floor(Math.random() * 10)
      })
      setLoading(false)
    }, 1500)
  }

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Check Trust Score
        </h2>
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter wallet address or domain..."
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
          <div className="bg-slate-900/50 rounded-lg p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">Trust Score</span>
              <span className={`text-3xl font-bold ${result.score > 70 ? 'text-green-400' : result.score > 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                {result.score}/100
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Status</span>
                <span className={`font-semibold ${result.status === 'Trusted' ? 'text-green-400' : 'text-red-400'}`}>
                  {result.status}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Transactions</span>
                <span className="text-white">{result.transactions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Reports</span>
                <span className="text-white">{result.reports}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
