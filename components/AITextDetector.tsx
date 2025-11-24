'use client'

import { useState } from 'react'

interface DetectionResult {
  isAI: boolean
  confidence: number
  aiProbability: number
  humanProbability: number
  indicators: {
    name: string
    value: number
    description: string
  }[]
  analysis: string
  riskLevel: 'Low' | 'Medium' | 'High'
}

export default function AITextDetector() {
  const [text, setText] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<DetectionResult | null>(null)

  const analyzeText = async () => {
    if (!text || text.length < 50) {
      alert('Please enter at least 50 characters for accurate analysis')
      return
    }

    setAnalyzing(true)

    try {
      // Call our API route which handles Hugging Face
      const response = await fetch('/api/detect-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text })
      })

      const data = await response.json()
      
      let aiScore = 0
      let humanScore = 0

      if (data.success) {
        aiScore = data.aiScore
        humanScore = data.humanScore
      } else if (data.fallback) {
        // API failed, will use fallback
        throw new Error('API fallback')
      } else {
        throw new Error('API request failed')
      }

      const isAI = aiScore > 50

      // Calculate indicators based on text analysis
      const wordCount = text.split(/\s+/).length
      const avgWordLength = text.replace(/\s+/g, '').length / wordCount
      const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim()).length
      const avgSentenceLength = wordCount / sentenceCount
      const hasRepetitiveStructure = /\b(\w+)\s+\1\b/gi.test(text)
      const hasPerfectPunctuation = !/[,;:]/.test(text) && /[.!?]$/.test(text.trim())
      const hasComplexVocabulary = avgWordLength > 5.5
      const hasConsistentTone = avgSentenceLength > 15 && avgSentenceLength < 25
      const hasPersonalTone = text.toLowerCase().includes('i ') || text.toLowerCase().includes('my ')

      const indicators = [
        {
          name: 'Sentence Structure',
          value: hasConsistentTone ? 75 : 35,
          description: hasConsistentTone ? 'Very consistent and uniform' : 'Natural variation detected'
        },
        {
          name: 'Vocabulary Complexity',
          value: hasComplexVocabulary ? 80 : 40,
          description: hasComplexVocabulary ? 'Advanced vocabulary usage' : 'Conversational language'
        },
        {
          name: 'Punctuation Patterns',
          value: hasPerfectPunctuation ? 70 : 30,
          description: hasPerfectPunctuation ? 'Perfect punctuation' : 'Natural punctuation'
        },
        {
          name: 'Personal Tone',
          value: hasPersonalTone ? 25 : 85,
          description: hasPersonalTone ? 'Personal pronouns present' : 'Impersonal writing style'
        },
        {
          name: 'Repetition Analysis',
          value: hasRepetitiveStructure ? 65 : 20,
          description: hasRepetitiveStructure ? 'Some repetitive patterns' : 'Varied expression'
        }
      ]

      let riskLevel: 'Low' | 'Medium' | 'High' = 'Low'
      if (aiScore > 70) riskLevel = 'High'
      else if (aiScore > 50) riskLevel = 'Medium'

      const analysis = isAI 
        ? `This text shows strong indicators of AI generation (${aiScore.toFixed(1)}% confidence). The writing style is consistent, uses formal vocabulary, and lacks personal touches typically found in human writing.`
        : `This text appears to be human-written (${humanScore.toFixed(1)}% confidence). It contains natural language patterns, personal elements, and the kind of imperfections typical of human communication.`

      setResult({
        isAI,
        confidence: Math.max(aiScore, humanScore),
        aiProbability: aiScore,
        humanProbability: humanScore,
        indicators,
        analysis,
        riskLevel
      })
    } catch (error) {
      console.error('Error analyzing text:', error)
      
      // Fallback to heuristic analysis if API fails
      const wordCount = text.split(/\s+/).length
      const avgWordLength = text.replace(/\s+/g, '').length / wordCount
      const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim()).length
      const avgSentenceLength = wordCount / sentenceCount
      
      const hasRepetitiveStructure = /\b(\w+)\s+\1\b/gi.test(text)
      const hasPerfectPunctuation = !/[,;:]/.test(text) && /[.!?]$/.test(text.trim())
      const hasComplexVocabulary = avgWordLength > 5.5
      const hasConsistentTone = avgSentenceLength > 15 && avgSentenceLength < 25
      
      let aiScore = 0
      if (hasConsistentTone) aiScore += 25
      if (hasComplexVocabulary) aiScore += 20
      if (hasPerfectPunctuation) aiScore += 15
      if (avgSentenceLength > 20) aiScore += 20
      if (wordCount > 100 && !text.includes('I ') && !text.includes('my ')) aiScore += 20
      
      aiScore = Math.max(0, Math.min(100, aiScore))
      const humanScore = 100 - aiScore
      const isAI = aiScore > 60

      const indicators = [
        {
          name: 'Sentence Structure',
          value: hasConsistentTone ? 75 : 35,
          description: hasConsistentTone ? 'Very consistent and uniform' : 'Natural variation detected'
        },
        {
          name: 'Vocabulary Complexity',
          value: hasComplexVocabulary ? 80 : 40,
          description: hasComplexVocabulary ? 'Advanced vocabulary usage' : 'Conversational language'
        },
        {
          name: 'Punctuation Patterns',
          value: hasPerfectPunctuation ? 70 : 30,
          description: hasPerfectPunctuation ? 'Perfect punctuation' : 'Natural punctuation'
        },
        {
          name: 'Personal Tone',
          value: text.toLowerCase().includes('i ') || text.toLowerCase().includes('my ') ? 25 : 85,
          description: text.toLowerCase().includes('i ') ? 'Personal pronouns present' : 'Impersonal writing style'
        },
        {
          name: 'Repetition Analysis',
          value: hasRepetitiveStructure ? 65 : 20,
          description: hasRepetitiveStructure ? 'Some repetitive patterns' : 'Varied expression'
        }
      ]

      let riskLevel: 'Low' | 'Medium' | 'High' = 'Low'
      if (aiScore > 70) riskLevel = 'High'
      else if (aiScore > 50) riskLevel = 'Medium'

      const analysis = isAI 
        ? `This text shows indicators of AI generation. Note: Using fallback analysis due to API limitations.`
        : `This text appears to be human-written. Note: Using fallback analysis due to API limitations.`

      setResult({
        isAI,
        confidence: Math.abs(aiScore - 50) * 2,
        aiProbability: aiScore,
        humanProbability: humanScore,
        indicators,
        analysis,
        riskLevel
      })
    } finally {
      setAnalyzing(false)
    }
  }

  const clearAnalysis = () => {
    setText('')
    setResult(null)
  }

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            AI Text Detector
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Detect whether text is written by AI or humans. Protect yourself from AI-generated scams, fake reviews, and misleading content.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Enter Text to Analyze</h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type the text you want to analyze here... (minimum 50 characters)"
              rows={10}
              className="w-full px-4 py-3 bg-slate-900 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
            />
            
            {/* Quick Examples */}
            <div className="mt-3 mb-4">
              <p className="text-gray-400 text-xs mb-2">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setText("Artificial intelligence is a branch of computer science that aims to create intelligent machines. It has become an essential part of the technology industry. Machine learning algorithms enable computers to learn from data and improve their performance over time without being explicitly programmed.")}
                  className="px-3 py-1 bg-slate-700/50 text-gray-300 rounded text-xs hover:bg-slate-700 transition"
                >
                  AI Example
                </button>
                <button
                  onClick={() => setText("Hey! So I was thinking about getting pizza for dinner tonight, but honestly I'm not sure if I'm in the mood for it anymore lol. Maybe we could try that new Thai place instead? I heard their pad thai is really good, though my friend said it was a bit too spicy for her taste.")}
                  className="px-3 py-1 bg-slate-700/50 text-gray-300 rounded text-xs hover:bg-slate-700 transition"
                >
                  Human Example
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-400 text-sm">
                {text.length} characters | {text.split(/\s+/).filter(w => w).length} words
              </span>
              <div className="flex gap-2">
                <button
                  onClick={clearAnalysis}
                  className="px-4 py-2 border border-gray-500/50 text-gray-400 rounded-lg hover:bg-gray-500/10 transition"
                >
                  Clear
                </button>
                <button
                  onClick={analyzeText}
                  disabled={analyzing || text.length < 50}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                  {analyzing ? 'Analyzing...' : 'Analyze'}
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Detection Results</h3>
            
            {!result ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <p>Enter text and click "Analyze" to see results</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Main Result */}
                <div className={`rounded-lg p-6 border-2 ${result.isAI ? 'bg-red-500/10 border-red-500/50' : 'bg-green-500/10 border-green-500/50'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-3xl mb-2">{result.isAI ? '🤖' : '👤'}</div>
                      <h4 className={`text-2xl font-bold ${result.isAI ? 'text-red-400' : 'text-green-400'}`}>
                        {result.isAI ? 'AI Generated' : 'Human Written'}
                      </h4>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Confidence</div>
                      <div className="text-3xl font-bold text-white">{result.confidence.toFixed(0)}%</div>
                    </div>
                  </div>
                  <div className={`text-sm px-3 py-1 rounded-full inline-block ${result.riskLevel === 'High' ? 'bg-red-500/20 text-red-300' : result.riskLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'}`}>
                    Risk Level: {result.riskLevel}
                  </div>
                </div>

                {/* Probability Bars */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-red-400">AI Probability</span>
                      <span className="text-white">{result.aiProbability.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-3">
                      <div 
                        className="bg-red-500 h-3 rounded-full transition-all"
                        style={{ width: `${result.aiProbability}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-green-400">Human Probability</span>
                      <span className="text-white">{result.humanProbability.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-3">
                      <div 
                        className="bg-green-500 h-3 rounded-full transition-all"
                        style={{ width: `${result.humanProbability}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Analysis */}
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">Analysis</h5>
                  <p className="text-gray-300 text-sm">{result.analysis}</p>
                </div>

                {/* Indicators */}
                <div>
                  <h5 className="text-white font-semibold mb-3">Detection Indicators</h5>
                  <div className="space-y-3">
                    {result.indicators.map((indicator, idx) => (
                      <div key={idx} className="bg-slate-900/50 rounded-lg p-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white">{indicator.name}</span>
                          <span className={`font-semibold ${indicator.value > 60 ? 'text-red-400' : 'text-green-400'}`}>
                            {indicator.value}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2 mb-1">
                          <div 
                            className={`h-2 rounded-full ${indicator.value > 60 ? 'bg-red-500' : 'bg-green-500'}`}
                            style={{ width: `${indicator.value}%` }}
                          ></div>
                        </div>
                        <p className="text-gray-400 text-xs">{indicator.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <span>ℹ️</span> How It Works
          </h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300 mb-4">
            <div>
              <strong className="text-blue-400">AI Model Detection:</strong> Uses Hugging Face's ChatGPT detector model trained on millions of text samples.
            </div>
            <div>
              <strong className="text-blue-400">Pattern Analysis:</strong> Examines sentence structure, vocabulary, and writing patterns typical of AI models.
            </div>
            <div>
              <strong className="text-blue-400">Linguistic Markers:</strong> Detects consistency, repetition, and formality that AI often exhibits.
            </div>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <p className="text-sm text-purple-300">
              <strong>🚀 Powered by:</strong> Hugging Face AI (Hello-SimpleAI/chatgpt-detector-roberta) - Free, open-source AI detection model with fallback heuristic analysis for reliability.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
