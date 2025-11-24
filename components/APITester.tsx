'use client'

import { useState } from 'react'

export default function APITester() {
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<any>(null)

  const testAPI = async () => {
    setTesting(true)
    try {
      const response = await fetch('/api/test-hf')
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Failed to test API' })
    } finally {
      setTesting(false)
    }
  }

  const testTextDetection = async () => {
    setTesting(true)
    const testTexts = [
      {
        name: 'AI-Generated',
        text: 'Artificial intelligence is a branch of computer science that aims to create intelligent machines. It has become an essential part of the technology industry. Machine learning algorithms enable computers to learn from data and improve their performance over time.'
      },
      {
        name: 'Human-Written',
        text: "Hey! So I was thinking about getting pizza for dinner tonight, but honestly I'm not sure if I'm in the mood for it anymore lol. Maybe we could try that new Thai place instead? I heard their pad thai is really good."
      }
    ]

    const results = []
    for (const test of testTexts) {
      try {
        const response = await fetch('/api/detect-ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: test.text })
        })
        const data = await response.json()
        results.push({ ...test, result: data })
      } catch (error) {
        results.push({ ...test, error: 'Failed' })
      }
    }
    
    setResult({ tests: results })
    setTesting(false)
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">API Tester</h2>
        
        <div className="space-y-4">
          <button
            onClick={testAPI}
            disabled={testing}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {testing ? 'Testing...' : 'Test Hugging Face Connection'}
          </button>

          <button
            onClick={testTextDetection}
            disabled={testing}
            className="w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50"
          >
            {testing ? 'Testing...' : 'Test Text Detection (AI vs Human)'}
          </button>
        </div>

        {result && (
          <div className="mt-6 bg-slate-900/50 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Results:</h3>
            <pre className="text-gray-300 text-xs overflow-auto max-h-96">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
