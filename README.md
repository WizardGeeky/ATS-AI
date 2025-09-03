# 📄 ATS-AI (AI Resume Scanner)

An AI-powered Applicant Tracking System (ATS) that scans resumes, extracts candidate details, and evaluates them against job criteria.  
It calculates ATS and Job Match scores with animated progress bars.  
Provides actionable suggestions to improve resumes for better job opportunities.  

---
## ✨ Features
- 📄 Upload resume in **PDF format**  
- 🔍 Extracts **name, email, phone, LinkedIn, GitHub** automatically  
- 📊 Shows **Resume Score, Job Match Score, Experience** with animated circular progress bars  
- 💡 Provides **improvement suggestions** for better job opportunities  
- 🎨 Built with **Next.js, Tailwind CSS, ShadCN UI, and MagicUI animations**  

---

## 🚀 Tech Stack
- **Frontend**: Next.js 14, React, Tailwind CSS, ShadCN UI  
- **Backend**: Next.js API routes, Gemini AI (for resume parsing)  
- **UI Enhancements**: MagicUI animations, React Toastify for notifications  

---

## 📸 Screenshots

<img width="1916" height="910" alt="Screenshot 2025-09-03 134052" src="https://github.com/user-attachments/assets/bbc7dfe0-cf70-4a4a-875a-17cbd625c833" />

<img width="840" height="303" alt="Screenshot 2025-09-03 134952" src="https://github.com/user-attachments/assets/b80588f2-5583-4695-8628-e6709210518b" />


## 🛠️ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/WizardGeeky/ATS-AI.git
cd ATS-AI
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env.local` file in the root folder and add your Gemini API key:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

### 4️⃣ Run the Development Server
```bash
npm run dev
```

Now open [http://localhost:3000](http://localhost:3000) in your browser 🚀  

---

## 📌 Project Structure
```
ATS-AI
├─ app
│  ├─ api
│  │  └─ v1
│  │     └─ ats
│  │        └─ route.ts
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ helper
│  │  └─ ATSResult.ts
│  ├─ layout.tsx
│  └─ page.tsx
├─ components
│  ├─ magicui
│  │  ├─ animated-circular-progress-bar.tsx
│  │  └─ shimmer-button.tsx
│  └─ ui
│     ├─ button.tsx
│     ├─ input.tsx
│     ├─ link-preview.tsx
│     └─ loader.tsx
├─ components.json
├─ lib
│  └─ utils.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  └─ logo.png
├─ README.md
└─ tsconfig.json
```

---

## 📜 License
This project is licensed under the **MIT License** – free to use, modify, and distribute.  

---

## 👨‍💻 Author
Designed & Developed with ❤️ by [**Eswar**](https://eswarb.vercel.app)  
