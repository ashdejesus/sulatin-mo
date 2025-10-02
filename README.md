# ✍️ Sulatin Mo  
**An interactive full-stack web app for learning and translating the Filipino Baybayin script.**

---

## 🚀 Overview  
*Sulatin Mo* is a modern educational platform designed to help users explore, learn, and practice the **Baybayin script**—a pre-colonial Filipino writing system.  
Built with **Next.js 15**, **Firebase**, and **Tailwind CSS**, the application provides real-time transliteration, quizzes, and cultural context, making Baybayin more accessible to learners of all levels.  

---

## 🛠 Tech Stack  

### Frontend  
- **Framework:** Next.js 15 (App Router, Server Components, SSR)  
- **Language:** TypeScript  
- **UI Components:** ShadCN/UI (Radix UI primitives)  
- **Styling:** Tailwind CSS (`src/app/globals.css`)  
- **Icons:** Lucide React  
- **Fonts:**  
  - *Playfair Display* → Headlines  
  - *PT Sans* → Body text  
  - *Noto Sans Tagalog* → Baybayin rendering  

### Backend (Serverless)  
- **Hosting:** Firebase App Hosting  
- **Authentication:** Firebase Authentication (Email/Password, Google, Anonymous)  
- **Database:** Cloud Firestore (user data, translations, quiz scores)  
- **BaaS Model:** Frontend communicates directly with Firebase SDKs  

---

## ✨ Features  

### 🔑 Core Features  
- User Authentication (Email/Password, Google, Anonymous)  
- Tagalog → Baybayin Converter (with copy/share options)  
- Saved Translations tied to user accounts (Firestore persistence)  

### 📖 Learning Tools  
- Interactive Character Guide (with handwriting practice canvas)  
- Baybayin Quiz (customizable, instant feedback, saved score history)  

### 🌐 Cultural Context  
- Homepage with app introduction  
- Historical Context of Baybayin  
- Modern Revival Showcase in art, fashion, government  

### 💻 Technical & UX  
- Responsive design (desktop, tablet, mobile)  
- Modern UI/UX with ShadCN/UI + Tailwind CSS  
- Real-time updates with Firestore  
- Serverless architecture on Firebase  
