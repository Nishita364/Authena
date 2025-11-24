'use client'

import { useState } from 'react'

export default function VerifyIdentity() {
  const [step, setStep] = useState(1)
  const [verifying, setVerifying] = useState(false)
  const [verified, setVerified] = useState(false)

  const startVerification = () => {
    setVerifying(true)
    setTimeout(() => {
      setStep(2)
      setVerifying(false)
    }, 2000)
  }

  const completeVerification = () => {
    setVerifying(true)
    setTimeout(() => {
      setVerified(true)
      setVerifying(false)
    }, 2000)
  }

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-4">
          Verify Your Identity
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Build trust by verifying your identity on the Cardano blockchain
        </p>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
          {!verified ? (
            <>
              {/* Progress Steps */}
              <div className="flex justify-between mb-8">
                <div className={`flex-1 text-center ${step >= 1 ? 'text-purple-400' : 'text-gray-600'}`}>
                  <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${step >= 1 ? 'bg-purple-500' : 'bg-gray-700'}`}>
                    1
                  </div>
                  <div className="text-sm">Connect Wallet</div>
                </div>
                <div className={`flex-1 text-center ${step >= 2 ? 'text-purple-400' : 'text-gray-600'}`}>
                  <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${step >= 2 ? 'bg-purple-500' : 'bg-gray-700'}`}>
                    2
                  </div>
                  <div className="text-sm">Sign Message</div>
                </div>
                <div className={`flex-1 text-center ${step >= 3 ? 'text-purple-400' : 'text-gray-600'}`}>
                  <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${step >= 3 ? 'bg-purple-500' : 'bg-gray-700'}`}>
                    3
                  </div>
                  <div className="text-sm">Verified</div>
                </div>
              </div>

              {step === 1 && (
                <div className="text-center">
                  <div className="text-6xl mb-4">🔐</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Connect Your VESPR Wallet</h3>
                  <p className="text-gray-400 mb-6">
                    First, connect your Cardano wallet to begin the verification process
                  </p>
                  <button
                    onClick={startVerification}
                    disabled={verifying}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
                  >
                    {verifying ? 'Connecting...' : 'Start Verification'}
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="text-center">
                  <div className="text-6xl mb-4">✍️</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Sign Verification Message</h3>
                  <p className="text-gray-400 mb-6">
                    Sign a message with your wallet to prove ownership and complete verification
                  </p>
                  <div className="bg-slate-900/50 rounded-lg p-4 mb-6 text-left">
                    <div className="text-gray-400 text-sm mb-2">Message to sign:</div>
                    <div className="text-white font-mono text-sm">
                      I verify my identity on Authena<br/>
                      Timestamp: {new Date().toISOString()}<br/>
                      Network: Cardano Mainnet
                    </div>
                  </div>
                  <button
                    onClick={completeVerification}
                    disabled={verifying}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
                  >
                    {verifying ? 'Verifying...' : 'Sign & Verify'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center">
              <div className="text-6xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-green-400 mb-4">Identity Verified!</h3>
              <p className="text-gray-300 mb-6">
                Your identity has been successfully verified and recorded on the Cardano blockchain
              </p>
              <div className="bg-slate-900/50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <div className="text-gray-400 text-sm">Verification ID</div>
                    <div className="text-white font-mono text-sm">VER-{Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Trust Score Boost</div>
                    <div className="text-green-400 font-bold">+25 points</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Verified On</div>
                    <div className="text-white text-sm">{new Date().toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Status</div>
                    <div className="text-green-400 font-semibold">Active</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <button className="px-6 py-2 bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30 hover:bg-purple-500/30 transition">
                  View Certificate
                </button>
                <button className="px-6 py-2 bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30 hover:bg-purple-500/30 transition">
                  Share Verification
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
