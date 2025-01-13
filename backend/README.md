# 🎬 Movie Title Maker API

Backend service for the Movie Title Maker application that handles file uploads and credit data management.

---

## 🔧 Tech Stack

- **Runtime**: Node.js  
- **Framework**: Express.js  
- **File Uploads**: Multer  
- **Data Parsing**: csv-parse  
- **Type Safety**: TypeScript  
- **Development Tools**: ts-node-dev  
- **Environment Management**: dotenv  

---

## 📁 Project Structure

```plaintext
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── multer.ts       # Multer configuration for file uploads
│   ├── controllers/    # Request handlers
│   │   └── files.ts    # File upload controller
│   ├── routes/         # API routes
│   │   └── files.ts    # File upload routes
│   ├── services/       # Business logic
│   │   └── parser.ts   # CSV parsing service
│   ├── types/          # TypeScript interfaces
│   └── app.ts          # Express app setup
├── package.json
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
   cd movie-title-maker/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:

   ```plaintext
   PORT=3000
   UPLOAD_DIR=uploads
   ```

4. Create the uploads directory:

   ```bash
   mkdir uploads
   ```

---

## 🛠 Development

Run the development server with hot reload:

```bash
npm run dev
```

---

## 🏗️ Production

To build and start the production server:

```bash
npm run build
npm start
```

---

## 📝 API Endpoints

### File Upload

- **POST** `/api/files/upload`  
  - Accepts `multipart/form-data` with a file field  
  - Supports `.csv` file uploads  
  - Returns parsed credit data  

---

## 🔧 Configuration

### File Upload Settings

- **Maximum File Size**: 5MB  
- **Allowed File Types**: `.csv`  
- **Upload Directory**: `./uploads`  

### Environment Variables

- **PORT**: Server port (default: 3000)  
- **UPLOAD_DIR**: Directory for file uploads  
- **NODE_ENV**: Environment mode (development/production)  

---

## 🔒 Security

- File type validation  
- File size limits  
- Sanitized file names  
- CORS configuration  

---

## 🤝 Contributing

1. Fork the repository  
2. Create your feature branch: `git checkout -b feature/AmazingFeature`  
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`  
4. Push to the branch: `git push origin feature/AmazingFeature`  
5. Open a Pull Request  
