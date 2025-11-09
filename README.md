# 🎵 TUNE IN

A full-stack application where users can upload short **audio snippets**, view others’ uploads, play them directly in the browser with **WaveSurfer.js**,
Admins can also manage users and content.



## 🌐 Live Demo https://tune-in-now.vercel.app/

---

## 🚀 Features

- 🎧 Upload and stream audio files via **AWS S3**
- 💬 Like and comment on posts (**UPCOMING FEATURE**)
- 👤 JWT Authentication (login/register via MongoDB)
- 🔒 Role-based access (Admin/User)
- 🧠 Fully RESTful API built with Express and MongoDB
- 🎨 Responsive React frontend using Vite

---

## 🧩 Tech Stack

**Frontend**

- React (Vite)
- Axios
- WaveSurfer.js
- Tailwind CSS

**Backend**

- Node.js + Express
- MongoDB + Mongoose
- AWS SDK (S3 file storage)
- Multer (memory storage)
- JWT Authentication
- dotenv

---

## Design

Notion

- https://www.notion.so/Anv-ndare-Studie-28016488b61b80a68fb4f3a74cac88de?source=copy_link

FIGMA

- https://www.figma.com/design/8OXqDPTXcaukb1wt0vAwE0/TUNE-IN?node-id=0-1&t=RTtnBg4bFGruwzI8-1

## ⚙️ Installation

### 1️ Clone the repository

```bash
git clone https://github.com/elFarfar/tune-in-.git
cd tune-in-
```

### 2️⃣ Setup the Backend

```bash
cd backend
npm install
```

- Create a .env file inside /backend:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

# AWS S3
AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_bucket_name
```

```bash
npm run dev
```

### 3️⃣ Setup the Frontend

```bash
cd ../frontend
npm install
```

- Create a .env file inside /frontend:

```bash
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```
