Blog Management App (MERN Stack)

A full‑stack Blog Management System built with the MERN stack (MongoDB, Express, React, Node.js). The application supports JWT‑based authentication, role‑based post ownership, and rich text blog editing. Public users can read blogs, while authenticated users can create, edit, and delete their own posts.

This project is developed as part of a technical assessment for BXTrack Solutions.


 ✨ Features

 🔐 Authentication & Authorization

 User registration & login
 Password hashing with bcrypt
 JWT‑based authentication
 Protected routes (backend & frontend)
 Only post owners can edit/delete their posts

 📝 Blog Management

 Public blog listing
 Public blog detail page
 Create / Edit / Delete blog posts (authenticated users only)
 Rich text editor for blog content
 Display author name on each post

 ⚙️ State Management & UX

 Auth state management (token + user)
 Async API handling with loading & error states
 Conditional UI rendering (Edit/Delete only for owner)


 🧱 Tech Stack

 Frontend

 React
 React Router
 Axios
 React Quill (Rich Text Editor)
 Context API (state management)

 Backend

 Node.js
 Express.js
 MongoDB + Mongoose
 JWT (jsonwebtoken)
 bcryptjs

 Dev Tools

 Git & GitHub
 Postman (API testing)
 Vercel / Netlify (Frontend deployment)
 Render / Railway (Backend deployment)



 📂 Project Structure

blog-management-app/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.js
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```


 🚀 Getting Started

 Prerequisites

 Node.js (v18+ recommended)
 MongoDB (local or Atlas)
 Git



 🔧 Backend Setup

cd backend
npm install


Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run server:

```bash
npm run dev

 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

 🔌 API Endpoints

 Auth Routes

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | /auth/register | Register new user |
| POST   | /auth/login    | Login user        |

 Post Routes

| Method | Endpoint   | Access        |
| ------ | ---------- | ------------- |
| GET    | /posts     | Public        |
| GET    | /posts/:id | Public        |
| POST   | /posts     | Authenticated |
| PUT    | /posts/:id | Owner only    |
| DELETE | /posts/:id | Owner only    |

---

 🧪 API Testing

A Postman collection or curl commands will be provided to test all endpoints.


 🏗️ Architecture Overview

 Client (React) communicates with backend via REST APIs
 JWT stored in localStorage and sent via Authorization header
 Middleware verifies JWT and post ownership
 MongoDB stores users and posts with references


 🌍 Deployment (Optional)

 Backend: Render / Railway
 Frontend: Vercel / Netlify


 📬 Submission

 GitHub Repository (this repo)
 README (this file)
 Optional live demo link
