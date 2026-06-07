# NexusHR - AI-Enabled Enterprise HR & Workforce Intelligence Platform

NexusHR is a modern, AI-powered HR management system designed for enterprise workforce intelligence.

## 🚀 How to Open and Run the App Locally

### Method 1: Automatic Setup (Recommended)
If you are on macOS or Linux, you can run the included setup script:
```bash
chmod +x setup.sh
./setup.sh
```

### Method 2: Manual Setup
#### 1. Prerequisites
- **Node.js**: Version 18.x or higher
- **npm**: Standard package manager included with Node.js

#### 2. Installation
Open your terminal in the project folder and run:
```bash
npm install
```

#### 3. Environment Configuration
1. Create a file named `.env` in the root directory.
2. Copy the content from `.env.example` and fill in your keys:
   ```env
   GEMINI_API_KEY="your_api_key_here"
   ```

#### 4. Launch the App
Start the development server:
```bash
npm run dev
```
The application will be accessible at: **http://localhost:3000**

---

## 📂 Project Structure
- `src/components`: UI components organized by module (HR, Payroll, AI).
- `src/store`: State management using Zustand.
- `src/lib`: Mock data and utility functions.
- `src/App.tsx`: Main routing and layout.

## 🛠 Tech Stack
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Motion (framer-motion)
- **AI**: Google Gemini API
- **Charts**: Recharts & D3.js
