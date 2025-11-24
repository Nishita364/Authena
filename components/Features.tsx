export default function Features() {
  const features = [
    {
      icon: '🤖',
      title: 'AI Text Detection',
      description: 'Detect AI-generated content vs human-written text. Protect yourself from AI-generated scams, fake reviews, and misleading content.'
    },
    {
      icon: '🛡️',
      title: 'AI Threat Detection',
      description: 'Advanced machine learning models analyze patterns to detect scams, phishing, and fake identities in real-time.'
    },
    {
      icon: '⛓️',
      title: 'Blockchain Reputation',
      description: 'Immutable trust scores stored on Cardano blockchain, ensuring transparency, security, and tamper-proof records with low fees.'
    },
    {
      icon: '🔐',
      title: 'Decentralized Identity',
      description: 'Users control their own identity and reputation data through Web3 wallets and DIDs.'
    },
    {
      icon: '🌐',
      title: 'Cross-Platform Trust',
      description: 'Verify trust scores across multiple platforms and services with a single unified reputation system.'
    },
    {
      icon: '⚡',
      title: 'Real-Time Verification',
      description: 'Instant trust score checks before engaging with unknown entities online.'
    },
    {
      icon: '🤝',
      title: 'Community Driven',
      description: 'Decentralized governance allows the community to shape trust policies and dispute resolution.'
    }
  ]

  return (
    <section id="features" className="container mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-white text-center mb-12">
        Why Choose Authena?
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
