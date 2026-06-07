@echo off
echo 🚀 Starting NexusHR setup for Windows...

:: 1. Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Error: Node.js is not installed. Please install it from https://nodejs.org/
    pause
    exit /b
)

:: 2. Install dependencies
echo 📦 Installing dependencies...
call npm install

:: 3. Handle environment variables
if not exist .env (
    echo 📝 Creating .env file from .env.example...
    copy .env.example .env
    echo ⚠️  Please remember to add your GEMINI_API_KEY to the .env file!
)

:: 4. Start the app
echo ✨ Setup complete! Starting the app...
echo 🔗 Open http://localhost:3000 in your browser.
call npm run dev
pause
