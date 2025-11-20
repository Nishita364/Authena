export default function Hero() {
  return (
    <section className="container mx-auto px-6 py-20 text-center">
      <h1 className="text-6xl font-bold text-white mb-6">
        Build Digital Trust in an <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Untrusted Internet</span>
      </h1>
      <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
        Authena uses AI to detect scams and fake identities, blockchain to store immutable trust data, 
        and decentralized identity to give users control over their reputation.
      </p>
      <div className="flex gap-4 justify-center">
        <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition">
          Get Started
        </button>
        <button className="px-8 py-3 border border-purple-500 text-white rounded-lg font-semibold hover:bg-purple-500/10 transition">
          Learn More
        </button>
      </div>
    </section>
  )
}
