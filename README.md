# ⚡ Cyber-HUD Book Library System

A high-performance Book Management System built with the **MERN Stack**, featuring a futuristic **Cyberpunk HUD (Heads-Up Display)** interface and immersive animations.

![Preview](https://github.com/Silaenn/CRUD-with-express-and-mongodb/assets/131638765/807df937-099e-43c9-8376-a03cf32ba0ab)

## 🚀 Key Features

- **Full CRUD Operations**: Create, Read, Update, and Delete book records with instant UI feedback.
- **Cyber-HUD Interface**: A unique, high-contrast aesthetics inspired by sci-fi interfaces and gaming HUDs.
- **Immersive Animations**: Powered by **Framer Motion**, featuring staggered entrance effects, smooth modal transitions, and dynamic system "booting" sequences.
- **Advanced Modal System**: Clean, animated modals for viewing details and confirming record purges.
- **Fully Responsive**: Optimized for every screen size, from wide-screen terminals to mobile devices, with smart text handling (`break-words`).
- **Real-time Notifications**: Integrated with `notistack` for system alerts and operation confirmations.

## 🛠️ Tech Stack

### Frontend

- **React 18** (Vite)
- **Tailwind CSS** (Styling)
- **Framer Motion** (Advanced Animations)
- **React Router DOM** (Navigation)
- **Axios** (API Requests)

### Backend

- **Node.js & Express**
- **MongoDB & Mongoose** (Database)
- **Cors & Dotenv**

## 📂 Project Structure

```text
├── backend/          # Node.js Express server & MongoDB models
│   ├── models/       # Database schemas
│   ├── routes/       # API endpoints
│   └── index.js      # Server entry point
├── frontend/         # React Vite application
│   ├── src/
│   │   ├── components/  # Reusable UI & HUD elements
│   │   ├── pages/       # Main screen modules
│   │   └── App.jsx      # Routing & Global Layout
└── docs/             # Specs and design plans
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Silaenn/CRUD-with-express-and-mongodb.git
cd CRUD-with-express-and-mongodb
```

### 2. Backend Setup

```bash
cd backend
npm install
# Create a .env file and add your MONGODB_URL & PORT
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🛡️ License

This project is open-source and available under the [MIT License](LICENSE).

---

_Created with ⚡ by [Silaenn](https://github.com/Silaenn)_
