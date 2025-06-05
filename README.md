# 🔖 Pinfolio - Smart Bookmark Manager App

**Pinfolio** is a full-stack smart bookmark manager that allows users to securely manage their favorite links with rich metadata like titles, images, and descriptions. Built with modern technologies, it offers a clean and fully responsive UI with robust backend capabilities.

---

## 📚 Description

Pinfolio-Bookmark manager app is divided into two main components:

### 🖼️ Frontend

A sleek and responsive frontend built using:
- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**

It visually displays bookmarks in a clean card layout, making it easy for users to explore and interact with their saved links. Currently, the frontend uses hardcoded data but is designed to work seamlessly with the backend.

### 🔧 Backend

The backend provides a fully functional and secure **RESTful API** built with:
- **NestJS**
- **TypeScript**
- **JWT Authentication**
- **Prisma ORM**
- **MySQL** as the database

It supports user registration, login, and authenticated CRUD operations on bookmarks.

---

## 🚀 Features

### ✅ Frontend

- Display bookmarks with:
  - Thumbnail Image
  - Title & Description
  - Visit Link
  - Created & Updated dates
- Mark as Favorite
- Edit & Delete Bookmark
- Clean and minimal layout
- Responsive for all devices
- Smooth hover effects and transitions

### ✅ Backend

- User Authentication using JWT
- RESTful API for Bookmarks
  - Create, Read, Update, Delete
- User-based bookmark ownership
- Protected routes for secure access
- MySQL + Prisma ORM for data storage
- Automatic timestamps for bookmarks

---

## 🛠️ Tech Stack

| Layer     | Technology            |
| --------- | --------------------- |
| Frontend  | Next.js (App Router), TypeScript |
| Styling   | Tailwind CSS          |
| Icons     | React Icons           |
| Fonts     | Google Fonts          |
| Backend   | NestJS, TypeScript    |
| Auth      | JWT (JSON Web Tokens) |
| ORM       | Prisma                |
| Database  | MySQL                 |

---

## 📁 Project Structure

```sh
hcode-intern-task-Yehani/
│          
├── bookmark-backend/ # Backend - NestJS API   
├── bookmark-frontend/ # Frontend - Next.js App  
├── License.txt
└── README.md
```

---

## 🔐 API Endpoints

This project provides a full RESTful API for managing users and bookmarks securely.

Complete API Documentation here:
https://documenter.getpostman.com/view/36189376/2sB2x2JZFu

---

## ⚙️ Setup and Installation

### 01. Clone the Repository

```bash
git clone https://github.com/yehaniharshika/next-js-bookmark-app.git
```

### 02. Frontend Setup

```bash
cd bookmark-frontend
npm install
npm run dev
```

### 03. Backend Setup

```bash
cd bookmark-backend
npm install
```

**Configure Environment Variables**

```bash
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/bookmark_db"
JWT_SECRET="your_jwt_secret_key"
```

**Start the Backend** 

```bash
npm run start:dev
```

---

## 🪪 License
© 2025 All Right Reserved Created By Yehani Harshika
<br/>
This project is licensed under the [MIT](License.txt) license

---

## 👨‍💻 Author
Made with 💙 by Yehani Harshika
