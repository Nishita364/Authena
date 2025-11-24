# AI Authenticity Guard - Python Standalone

Complete AI detection application for text, images, and videos using HuggingFace models.

## Features

- **Text Detection**: Detects AI-generated text using RoBERTa model
- **Image Detection**: Identifies AI-generated images
- **Video Detection**: Analyzes videos frame-by-frame for deepfakes

## Installation

```bash
pip install -r requirements.txt
```

## Usage

```bash
python app.py
```

Then open your browser to `http://localhost:7860`

## Models Used

- **Text**: Hello-SimpleAI/chatgpt-detector-roberta
- **Image**: umm-maybe/AI-image-detector
- **Video**: Frame-by-frame analysis using image detector

## Requirements

- Python 3.8+
- 4GB+ RAM
- Internet connection for first-time model download

## Notes

- Models are downloaded automatically on first run
- Video analysis may take time depending on video length
- For best results, use videos under 1 minute
