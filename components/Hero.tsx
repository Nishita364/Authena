'use client'

interface HeroProps {
  onGetStarted?: () => void
  onLearnMore?: () => void
}

export default function Hero({ onGetStarted, onLearnMore }: HeroProps) {
  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted()
    } else {
      // Scroll to Trust Score Checker
      const element = document.getElementById('trust-checker')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const handleLearnMore = () => {
    if (onLearnMore) {
      onLearnMore()
    } else {
      // Scroll to Features section
      const element = document.getElementById('features')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <section className="container mx-auto px-6 py-20 text-center">
      <h1 className="text-6xl font-bold text-white mb-6">
        Build Digital Trust in an <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Untrusted Internet</span>
      </h1>
      <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
        Authena uses AI to detect scams and fake identities, Cardano blockchain to store immutable trust data, 
        and decentralized identity to give users control over their reputation. Connect with VESPR wallet to get started.
      </p>
      <div className="flex gap-4 justify-center">
        <button 
          onClick={handleGetStarted}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition hover:scale-105 transform"
        >
          Get Started
        </button>
        <button 
          onClick={handleLearnMore}
          className="px-8 py-3 border border-purple-500 text-white rounded-lg font-semibold hover:bg-purple-500/10 transition hover:scale-105 transform"
        >
          Learn More
        </button>
      </div>
    </section>
  )
}
