#!/bin/bash

# NexusHR Automatic Setup Script

echo "🚀 Starting NexusHR setup..."

# 1. Check for Node.js
if ! command -v node &> /dev/null
then
    echo "❌ Error: Node.js is not installed. Please install it from https://nodejs.org/"
    exit
fi

# 2. Install dependencies
echo "📦 Installing dependencies..."
npm install

# 3. Handle environment variables
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please remember to add your GEMINI_API_KEY to the .env file!"
fi

# 4. Start the app
echo "✨ Setup complete! Starting the app..."
echo "🔗 Open http://localhost:3000 in your browser."
npm run dev
