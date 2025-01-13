# 🎥 Movie Title Maker

A complete solution for creating professional movie titles and credits with ease. This repository contains both the application's frontend and backend components.



https://github.com/user-attachments/assets/6b0dfaad-3ae2-40bb-8e4b-136c061a1a16



---

## 🏗️ Overview

### Frontend

- Built with **Angular** and styled using **TailwindCSS**.
- Features:
  - Interactive credit editing.
  - Real-time style customization and live previews.
  - File uploads and exports in multiple formats.
  - Step-by-step wizard for ease of use.

### Backend

- Built with **Node.js** and **Express.js**.
- Handles:
  - File uploads (via **Multer**).
  - Credit data parsing (CSV support).
  - API routes for managing the uploaded data.

---

## 🚀 Features

- Import movie credit files for editing.
- Customize styles: fonts, colors, and layout.
- Live preview and export functionality.
- Fully responsive design.
- Secure backend with file type validation and CORS setup.

---

## 📂 Repository Structure

```plaintext
movie-title-maker/
├── frontend/  # Angular app for the UI
├── backend/   # Node.js API for file handling
```

---

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)  
- **npm** (v8 or higher)  

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd movie-title-maker
   ```

2. Set up the **frontend**:

   ```bash
   cd frontend
   npm install
   npm start
   ```

3. Set up the **backend**:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:4200`.

---

## 🛠️ Deployment

- Use `npm run build` in the **frontend** for production builds.  
- Use `npm start` in the **backend** for the production API.
