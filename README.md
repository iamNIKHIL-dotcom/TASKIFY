# Taskify - Modern Todo Application

Taskify is a modern todo application designed to help you stay organized with a clean and intuitive user interface. This application is built using React and features a responsive design with a focus on user experience.

## Features
- User authentication (login and signup)
- Protected routes for authenticated users
- Add, view, and manage tasks
- Responsive design with light and dark mode support

## Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)

## Getting Started

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd FRONTEND
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application
1. Start the development server:
   ```bash
   npm start
   ```
2. Open your browser and go to `http://localhost:3000` to view the application.

### Building for Production
To create a production build, run:
```bash
npm run build
```

This will generate a `build` directory with the optimized production files.

## Project Structure
- `src/`: Contains the source code for the application
  - `components/`: Reusable components
  - `context/`: Context providers for authentication
  - `App.jsx`: Main application component
  - `index.css`: Global styles

## Customization
- The application uses Tailwind CSS for styling. You can customize the styles by editing the `index.css` file.
- Font and color variables are defined in the `:root` selector in `index.css`.

## License
This project is licensed under the MIT License.

## Backend Setup

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)

### Installation
1. Navigate to the backend directory:
   ```bash
   cd BACKEND
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```

### Running the Backend Server
1. Start the backend server:
   ```bash
   npm start
   ```
2. The backend server should be running on `http://localhost:3006` by default.

Ensure that both the frontend and backend servers are running to fully utilize the application.
