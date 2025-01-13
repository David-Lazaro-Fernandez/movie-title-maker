# 🎥 Movie Title Maker

A powerful web application for creating professional-quality movie titles and credits with an intuitive, user-friendly interface.

---

## 🚀 Features

- **File Upload**: Easily import movie credits from files.
- **Interactive Editor**: Modify and organize credits with a simple drag-and-drop system.
- **Real-Time Customization**: Instantly see style changes as you make them.
- **Live Preview**: View the final output in real-time.
- **Export Options**: Download titles in multiple formats (e.g., PNG, JPEG, PDF).
- **Responsive Design**: Works seamlessly on all devices.
- **Step-by-Step Wizard**: Guided flow for effortless credit creation.

---

## 🛠️ Technologies

- **Framework**: Angular 17.3.0  
- **Styling**: TailwindCSS  
- **Icons**: Material Icons  
- **Export Tools**: html2canvas  
- **State Management**: RxJS  
- **Build Tools**: Angular CLI  

---

## 📁 Project Structure

```plaintext
frontend/
├── src/
│   ├── app/
│   │   ├── form/            # Components for form handling
│   │   │   ├── wizard/       # Step-by-step wizard
│   │   │   ├── import/       # File import feature
│   │   │   ├── edit/         # Editing movie credits
│   │   │   ├── title-style/  # Customization and styling
│   │   │   └── export/       # Export functionality
│   │   ├── layouts/         # Layout components
│   │   │   ├── site-header/  # Header layout
│   │   │   └── site-footer/  # Footer layout
│   │   ├── services/        # Application services
│   │   └── home/            # Home page
│   └── assets/             # Static assets (images, fonts, etc.)
```

---

## 🚦 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or higher)  
- **npm** (v8 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:4200`.

---

## 🏗️ Building for Production

To create a production build, run:

```bash
npm run build
```

The build artifacts will be stored in the `dist/movie-title-maker` directory.

---

## 📝 Application Flow

1. **Home Page**: Learn about the app and explore its features.  
2. **Import**: Upload movie credit files for editing.  
3. **Edit**: Organize and modify credit content.  
4. **Style**: Customize the layout with fonts, colors, and spacing options.  
5. **Export**: Preview and download the finished product.

---

## 🎨 Styling

- **Utility-First Design**: TailwindCSS ensures clean and consistent styling.  
- **Custom Themes**: Fully customizable color schemes and typography.  
- **Responsive Layouts**: Optimized for mobile, tablet, and desktop views.  
- **Dark Mode Support**: Built-in support for light and dark themes.  

---

## 🤝 Contributing

We welcome contributions! Follow these steps to contribute:

1. Fork the repository.  
2. Create a feature branch:  
   ```bash
   git checkout -b feature/AmazingFeature
   ```  
3. Commit your changes:  
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```  
4. Push to the branch:  
   ```bash
   git push origin feature/AmazingFeature
   ```  
5. Open a Pull Request.

---

## 👥 Authors

- **David Lazaro** - Creator and Maintainer  
  [LinkedIn](https://www.linkedin.com/in/davidlfr/)  

---

This version improves readability, uses consistent formatting, and adds slight enhancements to keep the document professional and user-friendly. Let me know if you'd like additional edits! 😊