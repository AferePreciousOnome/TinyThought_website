# TinyThought – Sentiment-Aware Journal App

# Project Overview

TinyThought is a full-stack journaling app designed to support emotional well-being. Users can securely log daily thoughts, receive sentiment-based feedback, and track their mood over time through intuitive visualizations.
Built with React and a RESTful backend, TinyThought combines clean design, sentiment analysis, and personal insights to promote consistent reflection and emotional awareness.

# Why It Matters

TinyThought encourages mental wellness by making self-reflection simple, supportive, and emotionally intelligent. It helps users recognize emotional patterns, feel affirmed through adaptive encouragement, and build a habit of mindful journaling all in a private, user-friendly space.

## Screenshots

![screenshot](./public/readMe.png)

## Features

### User Auth

- Sign up and log in via JWT-secured endpoints
- Seamless toggle between login and sign-up
- Persist login with local storage token

### Journal Features

- Write journal entries anytime
- Auto-analyzed for sentiment (positive/neutral/negative)
- Sentiment emoji, score, and motivational message shown

### Mood Tracker

- Displays last 7 days of mood data using a line chart
- Colorful summaries with emoji-based sentiment counters

### Protected Routes

- Journal and profile pages require authentication
- Entries are scoped per-user

---

## Tech Stack

| Layer       | Tech                    |
| ----------- | ----------------------- |
| Frontend    | React + React Router    |
| Styling     | CSS Modules             |
| Form Schema | Yup (for validations)   |
| Charts      | Recharts (LineChart)    |
| Auth        | JWT + bcrypt            |
| Sentiment   | `sentiment` npm package |
| Database    | PostgreSQL              |
| Backend     | Node.js + Express       |

---

## 📁 File Structure (Frontend Only)

```js
client/
│
├── components/
│ ├── JournalEntryForm/
│ ├── JournalProfile/
│ └── MoodTracker/
| └── LandingPage/
| └── Login/
| └── Signup/
| └── ForgotPassword/
| └── ResetPassword/
| └── Footer/
│
├── pages/
│ ├── LandingPage/
│ ├── JournalPage/
│ └── ProfilePage/
│
├── utils/
│ └── validations.js
│
└── App.jsx, index.js

```

---

## 🚀 Getting Started

### 📦 1. Clone the repository

```js
git clone https://github.com/yourusername/tinythought.git
cd tinythought
```

# Backend Setup

```js
cd server
npm install
```

# .env file:

```js
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/tinythought
JWT_SECRET=your-secret-key
```

# DB Tables

```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  reset_password_token TEXT,
  reset_password_expires TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE journal_entries (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  content TEXT NOT NULL,
  sentiment_score INTEGER,
  sentiment_label TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

# Run Backend

```js
npm run dev
```

# Frontend Setup

```js
cd api
npm install
npm start
```

**The app will run at http://localhost:3000**

# API Overview

- **Auth**

```js
POST /auth/signup          – Register and receive token
POST /auth/login           – Login and receive token
POST /auth/forgot-password – Request password reset link via email
POST /auth/reset-password  – Submit new password using token

```

- **Journal**

```js
GET /journal               – Get user entries (protected)
POST /journal              – Create entry (protected)
DELETE /journal/:id        – Delete entry (protected)

```

- **All journal routes require Authorization: Bearer <token>**

# Example Entry Response

```js
{
  "id": 7,
  "user_id": 2,
  "content": "I felt pretty good today!",
  "sentiment_score": 3,
  "sentiment_label": "positive",
  "created_at": "2025-06-30T09:23:44Z"
}
```

# Password Reset Flow

- Forgot Password Page
  - User enters email → receives reset link.
  - /auth/forgot-password triggered on backend.
- Email Sent
  - Reset link: http://localhost:5173/reset-password?token=...
  - Reset Password Page
- New password & confirm password.
  - /auth/reset-password handles the final update.

# Future Enhancements

- Add "edit" functionality for journal entries
- Visualize mood by calendar or radar chart
- AI-generated reflective prompts

# License

MIT License © 2025 – [Precious Onome Afere]

# Stay Kind.

TinyThought is built with the belief that your feelings matter. Journaling is a brave step toward self-awareness. Thank you for being here.
