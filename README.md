# Magicbit Project

This project includes both backend and frontend applications. The backend is a Node.js server with Express, while the frontend is a React application. The backend is containerized with Docker, and the frontend runs locally.

## Available Scripts

In the project directory, you can run:

### Backend

#### `docker-compose up --build`

Builds and starts the backend server using Docker Compose.\
The backend server will be running at [http://localhost:5001](http://localhost:5001).

### Frontend

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Project Structure

```plaintext
magicbit/
├── backend/                   # Backend application
│   ├── src/
│   │   └── index.ts           # Main server file
│   ├── package.json           # Backend dependencies and scripts
│   └── Dockerfile             # Dockerfile for backend
├── frontend/                  # Frontend application
│   ├── public/
│   ├── src/
│   │   └── App.tsx             # Main React component
│   ├── package.json           # Frontend dependencies and scripts
├── docker-compose.yml         # Docker Compose configuration
└── README.md                  # Project documentation
