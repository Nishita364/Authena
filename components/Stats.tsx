'use client'

import { useEffect, useState } from 'react'

export default function Stats() {
  const [stats, setStats] = useState({
    totalVerifications: 0,
    reportsSubmitted: 0,
    trustChecks: 0,
    activeUsers: 0
  })

  useEffect(() => {
    // Animate numbers on load
    const targets = {
      totalVerifications: 12547,
      reportsSubmitted: 3892,
      trustChecks: 45231,
      activeUsers: 8934
    }

    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setStats({
        totalVerifications: Math.floor(targets.totalVerifications * progress),
        reportsSubmitted: Math.floor(targets.reportsSubmitted * progress),
        trustChecks: Math.floor(targets.trustChecks * progress),
        activeUsers: Math.floor(targets.activeUsers * progress)
      })

      if (step >= steps) {
        clearInterval(timer)
        setStats(targets)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-purple-400 mb-2">
            {stats.totalVerifications.toLocaleString()}
          </div>
          <div className="text-gray-400">Total Verifications</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-pink-400 mb-2">
            {stats.reportsSubmitted.toLocaleString()}
          </div>
          <div className="text-gray-400">Reports Submitted</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-blue-400 mb-2">
            {stats.trustChecks.toLocaleString()}
          </div>
          <div className="text-gray-400">Trust Checks</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-green-400 mb-2">
            {stats.activeUsers.toLocaleString()}
          </div>
          <div className="text-gray-400">Active Users</div>
        </div>
      </div>
    </section>
  )
}
