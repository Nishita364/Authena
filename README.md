# 🛡️ Authena - Web3 Trust & AI Security Platform

> A comprehensive security platform combining Cardano blockchain technology with advanced AI detection capabilities.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Cardano](https://img.shields.io/badge/Cardano-Blockchain-blue)](https://cardano.org/)
[![HuggingFace](https://img.shields.io/badge/HuggingFace-AI-yellow)](https://huggingface.co/)

## 🌟 Overview

Authena is a dual-mode security application that provides:

1. **Authena Platform** - Cardano-powered trust verification and identity management
2. **AI Authenticity Guard** - Multi-modal AI detection for text, images, and videos

## ✨ Key Features

### 🔐 Authena Platform

- **Trust Score Verification** - Comprehensive reputation analysis
- **AI Text Detection** - Real-time AI vs Human text identification
- **Identity Verification** - Blockchain-recorded identity proofs
- **Scam Reporting** - Community-driven security alerts
- **VESPR Wallet Integration** - Direct Cardano blockchain connection
- **Activity Feed** - Real-time security monitoring

### 🎨 AI Authenticity Guard

- **Text Detection** - Identifies AI-generated text (ChatGPT, GPT-4, etc.)
- **Image Detection** - Detects AI-generated images
- **Video Detection** - Deepfake analysis with frame-by-frame processing
- **Soft Pastel UI** - Beautiful, artistic, minimal design

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- VESPR Wallet (for blockchain features)

### Installation

```bash
# Clone the repository
git clone https://github.com/Nishita364/Authena.git
cd authena

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Visit `http://localhost:8000` to see the application.

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Blockchain**: Cardano, VESPR Wallet
- **AI/ML**: HuggingFace Inference API
- **Models**: 
  - Text: `Hello-SimpleAI/chatgpt-detector-roberta`
  - Image: `umm-maybe/AI-image-detector`
  - Video: Frame-based deepfake detection

## 📖 Documentation

For detailed documentation, see [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)

## 🎯 Use Cases

### For Users
- ✅ Verify trust scores before transactions
- ✅ Detect AI-generated scam messages
- ✅ Identify fake reviews and testimonials
- ✅ Verify image authenticity
- ✅ Detect deepfake videos
- ✅ Build verifiable reputation

### For Developers
- ✅ Learn Web3 integration
- ✅ Implement AI/ML models
- ✅ Build full-stack applications
- ✅ Create security tools

## 🔌 API Endpoints

### Text Detection
```bash
POST /api/detect-ai
Content-Type: application/json

{
  "text": "Your text here..."
}
```

### Image Detection
```bash
POST /api/detect-image
Content-Type: multipart/form-data

image: [file]
```

### Video Detection
```bash
POST /api/detect-video
Content-Type: multipart/form-data

video: [file]
```

## 🧪 Testing

Use the built-in API tester:

1. Navigate to `http://localhost:8000`
2. Click "🔧 Test API" tab
3. Run connection tests
4. View detailed results

## 📱 Python Standalone Version

A complete Gradio-based application is available:

```bash
cd python-standalone
pip install -r requirements.txt
python app.py
```

Access at `http://localhost:7860`

## 🎨 Screenshots

### Authena Platform
- Dark mode with purple/pink gradients
- Modern, professional interface
- Comprehensive trust analytics

### AI Authenticity Guard
- Soft pastel colors
- Clean, artistic design
- Three-tab interface (Text/Image/Video)

## 🔒 Security

- No private keys stored
- Client-side wallet connection
- Server-side API calls
- No personal data collection

## 🐛 Known Issues

- HuggingFace free tier may have rate limits
- Video detection is in demo mode (requires ffmpeg for production)
- First API call may be slow (model loading)

## 🚀 Future Roadmap

- [ ] Smart contract deployment
- [ ] On-chain trust scores
- [ ] Token rewards system
- [ ] Mobile application
- [ ] Real-time video processing
- [ ] Audio deepfake detection

## 🤝 Contributing

This is a demonstration project. Feel free to fork and build upon it!

## 📄 License

Educational and demonstration purposes.

## 🙏 Acknowledgments

- **Cardano** - Blockchain infrastructure
- **HuggingFace** - AI model hosting
- **VESPR** - Wallet integration
- **Next.js** - Application framework

## 📞 Support

For issues:
1. Check the API Tester
2. Review browser console (F12)
3. Verify HuggingFace model status
4. Check wallet connection

## 🌐 Links

- **GitHub**: https://github.com/Nishita364/Authena
- **Live Demo**: http://localhost:8000 (local)
- **Documentation**: [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)

---

**Built with ❤️ using Next.js, Cardano, and HuggingFace**

**Version**: 1.0.0 | **Status**: ✅ Fully Functional | **Last Updated**: November 2024
