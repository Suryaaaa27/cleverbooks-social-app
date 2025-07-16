# 📘 CleverBooks Social App

A full-stack modern social media web application built using **NestJS**, **MongoDB**, and **Next.js** with **Tailwind CSS** and **Shadcn UI**. Users can create accounts, follow/unfollow others, create posts, like and comment, and explore user profiles — all in a sleek and responsive UI.

---

## 🔧 Tech Stack

| Category        | Technology                         |
|----------------|-------------------------------------|
| Backend         | NestJS, Mongoose, JWT Auth          |
| Frontend        | Next.js 14 (App Router), Shadcn UI  |
| Styling         | Tailwind CSS, Responsive Design     |
| Database        | MongoDB (Mongoose ODM)              |
| Auth            | JWT Access & Refresh Tokens         |
| API Client      | Axios                               |

---

## 🚀 Features

- ✅ **User Signup/Login with JWT**
- ✅ **Protected Routes with Auth Guards**
- ✅ **Follow/Unfollow Users**
- ✅ **Create, View, Like ❤️ & Comment 💬 on Posts**
- ✅ **Timeline Feed showing posts from followed users**
- ✅ **Profile Page** with user's posts and follow status
- ✅ **Search Users by Username**
- ✅ Responsive UI with modern styling

---

## 🗂️ Folder Structure

root/
│
├── backend/ # NestJS App
│ ├── src/
│ │ ├── auth/
│ │ ├── users/
│ │ ├── posts/
│ │ └── common/guards/
│ └── .env
│
├── social-frontend/ # Next.js Frontend
│ ├── src/
│ │ ├── app/
│ │ │ ├── login/
│ │ │ ├── signup/
│ │ │ ├── dashboard/
│ │ │ ├── timeline/
│ │ │ └── search/
│ │ ├── components/
│ │ └── lib/api.ts
│ └── .env.local


---

## 🧪 API Endpoints (Backend)

- `POST /auth/signup` – Create account
- `POST /auth/login` – Login and receive token
- `GET /users/me` – Get logged-in user details
- `POST /users/:id/follow` – Follow user
- `POST /users/:id/unfollow` – Unfollow user
- `GET /users/:id` – Get user profile
- `GET /users/search?q=` – Search users
- `POST /posts` – Create new post
- `GET /posts` – Get your posts
- `GET /posts/timeline` – Get timeline feed
- `POST /posts/:id/like` – Like/Unlike post
- `POST /posts/:id/comment` – Add a comment

---

## 🧑‍💻 Getting Started

### 🐳 Backend

```bash
cd backend
npm install
cp .env.example .env  # Replace with your actual values
npm run start:dev


---

🌐 Frontend
cd social-frontend
npm install
cp .env.local.example .env.local  # Add NEXT_PUBLIC_API_URL
npm run dev


## 📸 Screenshots

| Login & Signup     | Timeline Feed           | Create Post    | Profile   |
|--------------------|-------------------------|----------------|-----------|
|  <img width="1901" height="914" alt="image" src="https://github.com/user-attachments/assets/1db00c7f-056b-43d4-a336-339825c1e9ef" />
                  | <img width="1917" height="1078" alt="image" src="https://github.com/user-attachments/assets/3e6ca3e6-b82d-4069-8dcd-6a1de3ea391e" />
                        |  <img width="1918" height="1079" alt="image" src="https://github.com/user-attachments/assets/28047746-04ef-4b7a-b8ec-bc85112f1ddc" />
              | <img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/e3830cc2-e295-4b10-9c61-0f25ff21a26a" />
          |

🔐 Environment Variables
Backend: .env

ini
Copy
Edit
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_secret
JWT_EXPIRES_IN=1d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d
Frontend: .env.local

ini
Copy
Edit
NEXT_PUBLIC_API_URL=http://localhost:4000


🤝 Contributing

Fork the repo

Create your feature branch: git checkout -b feature/awesome

Commit your changes: git commit -m 'Add awesome feature'

Push to the branch: git push origin feature/awesome

Open a pull request

📄 License
This project is built by Surya Srivastava as part of the CleverBooks Internship Assignment. All rights reserved © 2025.
