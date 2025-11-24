import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Convert image to base64 for HuggingFace API
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Call HuggingFace Fake Image Detector
    const response = await fetch(
      'https://api-inference.huggingface.co/models/umm-maybe/AI-image-detector',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: buffer.toString('base64'),
        }),
      }
    )

    if (!response.ok) {
      throw new Error('HuggingFace API request failed')
    }

    const data = await response.json()

    // Parse response - format: [{"label": "artificial", "score": 0.9}, {"label": "human", "score": 0.1}]
    let fakeProbability = 0
    let realProbability = 0

    if (Array.isArray(data) && data[0]) {
      const results = data[0]
      const fakeResult = results.find(
        (r: any) => r.label === 'artificial' || r.label === 'LABEL_1'
      )
      const realResult = results.find(
        (r: any) => r.label === 'human' || r.label === 'LABEL_0'
      )

      fakeProbability = (fakeResult?.score || 0) * 100
      realProbability = (realResult?.score || 0) * 100
    }

    return NextResponse.json({
      success: true,
      isFake: fakeProbability > 50,
      fakeProbability,
      realProbability,
      confidence: Math.max(fakeProbability, realProbability),
    })
  } catch (error) {
    console.error('Error in image detection:', error)
    return NextResponse.json(
      { error: 'Failed to analyze image', fallback: true },
      { status: 500 }
    )
  }
}
