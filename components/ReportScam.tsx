'use client'

import { useState } from 'react'

export default function ReportScam() {
  const [formData, setFormData] = useState({
    address: '',
    type: 'phishing',
    description: '',
    evidence: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ address: '', type: 'phishing', description: '', evidence: '' })
      }, 3000)
    }, 1500)
  }

  return (
    <section className="container mx-auto px-6 py-12 bg-slate-900/30">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-4">
          Report Suspicious Activity
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Help protect the community by reporting scams, phishing attempts, and fraudulent addresses
        </p>

        {submitted ? (
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-green-400 mb-2">Report Submitted!</h3>
            <p className="text-gray-300">Thank you for helping keep the community safe. Your report will be reviewed shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Suspicious Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="addr1... or domain"
                  className="w-full px-4 py-3 bg-slate-900 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Type of Threat *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="phishing">Phishing</option>
                  <option value="scam">Scam</option>
                  <option value="fake-identity">Fake Identity</option>
                  <option value="fraud">Fraud</option>
                  <option value="impersonation">Impersonation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what happened and why this address is suspicious..."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-900 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Evidence (Optional)
                </label>
                <input
                  type="text"
                  value={formData.evidence}
                  onChange={(e) => setFormData({ ...formData, evidence: e.target.value })}
                  placeholder="Transaction hash, screenshot URL, or other proof"
                  className="w-full px-4 py-3 bg-slate-900 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 text-lg"
              >
                {loading ? 'Submitting Report...' : 'Submit Report'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
