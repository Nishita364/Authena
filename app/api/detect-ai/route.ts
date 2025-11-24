import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { text } = await request.json()

    if (!text || text.length < 50) {
      return NextResponse.json(
        { error: 'Text must be at least 50 characters' },
        { status: 400 }
      )
    }

    console.log('Analyzing text with HuggingFace API:', text.substring(0, 100))

    const API_TOKEN = process.env.HUGGINGFACE_API_TOKEN

    // Use HuggingFace models with authentication
    const models = [
      'Hello-SimpleAI/chatgpt-detector-roberta',
      'roberta-base-openai-detector'
    ]

    let aiScore = 0
    let humanScore = 0
    let modelUsed = ''

    for (const model of models) {
      try {
        const response = await fetch(
          `https://api-inference.huggingface.co/models/${model}`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${API_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              inputs: text.substring(0, 512),
            }),
          }
        )

        console.log(`Model ${model} response status:`, response.status)

        if (!response.ok) {
          const errorText = await response.text()
          console.log(`Model ${model} error:`, errorText)
          continue
        }

        const data = await response.json()
        console.log(`Model ${model} response:`, JSON.stringify(data))

        // Check if model is loading
        if (data.error) {
          if (data.error.includes('loading')) {
            console.log(`Model ${model} is loading, trying next...`)
            continue
          }
          console.log(`Model ${model} returned error:`, data.error)
          continue
        }

        // Parse response
        if (Array.isArray(data) && data.length > 0) {
          const results = Array.isArray(data[0]) ? data[0] : data
          
          for (const item of results) {
            const label = item.label.toLowerCase()
            const score = item.score * 100
            
            console.log(`  - Label: ${label}, Score: ${score.toFixed(2)}%`)
            
            if (label.includes('fake') || label.includes('generated') || 
                label.includes('ai') || label === 'label_1' || label === '1') {
              aiScore = Math.max(aiScore, score)
            }
            else if (label.includes('real') || label.includes('human') || 
                     label === 'label_0' || label === '0') {
              humanScore = Math.max(humanScore, score)
            }
          }

          if (aiScore > 0 || humanScore > 0) {
            modelUsed = model
            console.log(`✓ Successfully used model: ${model}`)
            break
          }
        }
      } catch (modelError) {
        console.error(`Error with model ${model}:`, modelError)
        continue
      }
    }

    // If no model worked, use fallback heuristics
    if (aiScore === 0 && humanScore === 0) {
      console.log('All models failed, using fallback heuristics')
      
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
      const words = text.split(/\s+/)
      const avgWordLength = text.replace(/\s+/g, '').length / words.length
      const avgSentenceLength = words.length / sentences.length
      
      let aiIndicators = 0
      if (avgSentenceLength > 20) aiIndicators += 25
      if (avgWordLength > 5.5) aiIndicators += 20
      if (!/\b(I|my|me|we|our)\b/i.test(text)) aiIndicators += 25
      if (!/[!?]{2,}/.test(text) && !/\.\.\./.test(text)) aiIndicators += 15
      if (text.split('\n\n').length < 2) aiIndicators += 15
      
      aiScore = Math.min(100, aiIndicators)
      humanScore = 100 - aiScore
      modelUsed = 'Fallback Heuristics'
    }

    // Normalize scores
    const total = aiScore + humanScore
    if (total > 0) {
      aiScore = (aiScore / total) * 100
      humanScore = (humanScore / total) * 100
    }

    console.log('Final scores:', { 
      aiScore: aiScore.toFixed(1), 
      humanScore: humanScore.toFixed(1), 
      modelUsed 
    })

    return NextResponse.json({
      success: true,
      aiScore: Math.round(aiScore * 10) / 10,
      humanScore: Math.round(humanScore * 10) / 10,
      isAI: aiScore > 50,
      modelUsed,
    })
  } catch (error) {
    console.error('Error in AI detection:', error)
    return NextResponse.json(
      { 
        error: 'Failed to analyze text', 
        fallback: true,
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
