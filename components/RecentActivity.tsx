'use client'

import { useEffect, useState } from 'react'

interface Activity {
  id: string
  type: 'verification' | 'report' | 'check' | 'alert'
  address: string
  description: string
  timestamp: string
  status: 'success' | 'warning' | 'danger'
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    // Simulate real-time activity feed
    const mockActivities: Activity[] = [
      {
        id: '1',
        type: 'verification',
        address: 'addr1qx2...7k9m',
        description: 'New identity verified',
        timestamp: '2 minutes ago',
        status: 'success'
      },
      {
        id: '2',
        type: 'report',
        address: 'addr1vy8...3n2p',
        description: 'Phishing attempt reported',
        timestamp: '15 minutes ago',
        status: 'danger'
      },
      {
        id: '3',
        type: 'check',
        address: 'addr1q9z...5m8k',
        description: 'Trust score checked - High rating',
        timestamp: '1 hour ago',
        status: 'success'
      },
      {
        id: '4',
        type: 'alert',
        address: 'addr1vx4...2p9n',
        description: 'Suspicious activity detected',
        timestamp: '2 hours ago',
        status: 'warning'
      },
      {
        id: '5',
        type: 'verification',
        address: 'addr1qy7...4k3m',
        description: 'Identity verification completed',
        timestamp: '3 hours ago',
        status: 'success'
      }
    ]
    setActivities(mockActivities)
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case 'verification': return '✓'
      case 'report': return '⚠️'
      case 'check': return '🔍'
      case 'alert': return '🚨'
      default: return '•'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'border-green-500/30 bg-green-500/10'
      case 'warning': return 'border-yellow-500/30 bg-yellow-500/10'
      case 'danger': return 'border-red-500/30 bg-red-500/10'
      default: return 'border-purple-500/30 bg-purple-500/10'
    }
  }

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`bg-slate-800/50 backdrop-blur-sm border rounded-lg p-4 hover:border-purple-500/50 transition ${getStatusColor(activity.status)}`}
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl">{getIcon(activity.type)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-white font-semibold">{activity.description}</h3>
                    <span className="text-gray-400 text-sm">{activity.timestamp}</span>
                  </div>
                  <div className="text-gray-400 text-sm font-mono">{activity.address}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
