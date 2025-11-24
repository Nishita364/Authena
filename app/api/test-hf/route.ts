import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test with a simple known AI-generated text
    const testText = "Artificial intelligence is a branch of computer science that aims to create intelligent machines. It has become an essential part of the technology industry."
    
    const response = await fetch(
      'https://api-inference.huggingface.co/models/Hello-SimpleAI/chatgpt-detector-roberta',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: testText,
        }),
      }
    )

    const status = response.status
    const data = await response.json()

    return NextResponse.json({
      status,
      working: response.ok,
      response: data,
      message: response.ok 
        ? 'Hugging Face API is working!' 
        : 'Hugging Face API returned an error'
    })
  } catch (error) {
    return NextResponse.json({
      working: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to connect to Hugging Face API'
    })
  }
}
