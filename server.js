// server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet'; // Added for security
import morgan from 'morgan'; // Added for logging
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();

// Security middleware
app.use(helmet());

// Logging middleware
app.use(morgan('dev'));

// CORS middleware
app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true,
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "client/dist" directory
const staticDir = path.join(__dirname, '/client/dist');
app.use(express.static(staticDir));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Serve the frontend's index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});

// 404 error handler (this will now only handle requests that don't match any route)
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

// Error Handling Middleware
app.use(errorHandler);

// Validate required environment variables
const requiredEnvVars = ['PORT', 'MONGO_URI'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

// Start the server
const PORT = process.env.PORT || 4000; // Default to 4000
const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

//http://localhost:8000/api/tasks



/////////////////POSTMAN////////////////POSTMAN////////////////POSTMAN/////////////////////POSTMAN///////////////POSTMAN//////////////////////////
/////////////////POSTMAN////////////////POSTMAN////////////////POSTMAN/////////////////////POSTMAN///////////////POSTMAN//////////////////////////
/////////////////POSTMAN////////////////POSTMAN////////////////POSTMAN/////////////////////POSTMAN///////////////POSTMAN//////////////////////////
/////////////////POSTMAN////////////////POSTMAN////////////////POSTMAN/////////////////////POSTMAN///////////////POSTMAN//////////////////////////


///////////REGISTER//////////////REGISTER/////////////////REGISTER/////////////////REGISTER/////////////////REGISTER///////////////REGISTER//////////////
///////////REGISTER//////////////REGISTER/////////////////REGISTER/////////////////REGISTER/////////////////REGISTER///////////////REGISTER//////////////
///////////REGISTER//////////////REGISTER/////////////////REGISTER/////////////////REGISTER/////////////////REGISTER///////////////REGISTER//////////////

// POST http://localhost:7000/api/users


// {
//   "name": "Admin User",
//   "email": "admin@example.com",
//   "password": "12345678",
//   "role": "admin"
// }

/////// OUTPUT //////////
/////// OUTPUT //////////
/////// OUTPUT //////////
// {
//     "_id": "67c77ddb86a02d2a0d559388",
//     "name": "Admin User",
//     "email": "admin@example.com",
//     "role": "admin",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Yzc3ZGRiODZhMDJkMmEwZDU1OTM4OCIsImlhdCI6MTc0MTEyNzEzMSwiZXhwIjoxNzQzNzE5MTMxfQ.-CoedFGY8UeJBIuM5UkRre2kTCC0I6guiDb2eHf_aLk"
// }


///////////LOGIN//////////////LOGIN///////////////////////////LOGIN//////////////LOGIN///////////////////////////LOGIN//////////////LOGIN////////////////
///////////LOGIN//////////////LOGIN///////////////////////////LOGIN//////////////LOGIN///////////////////////////LOGIN//////////////LOGIN////////////////
///////////LOGIN//////////////LOGIN///////////////////////////LOGIN//////////////LOGIN///////////////////////////LOGIN//////////////LOGIN////////////////
///////////LOGIN//////////////LOGIN///////////////////////////LOGIN//////////////LOGIN///////////////////////////LOGIN//////////////LOGIN////////////////


//POST  http://localhost:7000/api/users/login


// {
//   "email": "admin@example.com",
//   "password": "12345678"
// }

/////// OUTPUT //////////
/////// OUTPUT //////////
/////// OUTPUT //////////

// {
//     "_id": "67c77ddb86a02d2a0d559388",
//     "name": "Admin User",
//     "email": "admin@example.com",
//     "role": "admin",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Yzc3ZGRiODZhMDJkMmEwZDU1OTM4OCIsImlhdCI6MTc0MTEyNzMxOCwiZXhwIjoxNzQzNzE5MzE4fQ.qUh4hUyTm4ubJDUMahAlw8g1JmJBsCkQcdY7WPAJP2c"
// }




////////////////GET EMPLOYEES /////////////////////////////////GET EMPLOYEES /////////////////////GET EMPLOYEES /////////////////////GET EMPLOYEES ////////
////////////////GET EMPLOYEES /////////////////////////////////GET EMPLOYEES /////////////////////GET EMPLOYEES /////////////////////GET EMPLOYEES ////////
////////////////GET EMPLOYEES /////////////////////////////////GET EMPLOYEES /////////////////////GET EMPLOYEES /////////////////////GET EMPLOYEES ////////
////////////////GET EMPLOYEES /////////////////////////////////GET EMPLOYEES /////////////////////GET EMPLOYEES /////////////////////GET EMPLOYEES ////////

// GET http://localhost:7000/api/users/employees




/////// OUTPUT //////////
/////// OUTPUT //////////
/////// OUTPUT //////////

// [
//   {
//     _id: '67bf655cf031741509122fb4',
//     name: 'Andy',
//     email: 'carvajalandrey66@gmail.com',
//   },
// ];





/////////////// CREATE TASKS  /////////////////////////////// CREATE TASKS  ///////////////////////////// CREATE TASKS  ////////////////////////
/////////////// CREATE TASKS  /////////////////////////////// CREATE TASKS  ///////////////////////////// CREATE TASKS  ////////////////////////
/////////////// CREATE TASKS  /////////////////////////////// CREATE TASKS  ///////////////////////////// CREATE TASKS  ////////////////////////
/////////////// CREATE TASKS  /////////////////////////////// CREATE TASKS  ///////////////////////////// CREATE TASKS  ////////////////////////
/////////////// CREATE TASKS  /////////////////////////////// CREATE TASKS  ///////////////////////////// CREATE TASKS  ////////////////////////
/////////////// CREATE TASKS  /////////////////////////////// CREATE TASKS  ///////////////////////////// CREATE TASKS  ////////////////////////


//POST http://localhost:7000/api/tasks

// {
//   "text": "Complete the project report",
//   "assignedTo": "67bf655cf031741509122fb4"
// }

/////// OUTPUT //////////
/////// OUTPUT //////////
/////// OUTPUT //////////




// {
//     "text": "Complete the project report",
//     "createdBy": "67c77ddb86a02d2a0d559388",
//     "assignedTo": "67bf655cf031741509122fb4",
//     "status": "pending",
//     "_id": "67c78150cd5b9bd901292721",
//     "createdAt": "2025-03-04T22:40:16.140Z",
//     "updatedAt": "2025-03-04T22:40:16.140Z",
//     "__v": 0
// }




/////////////// UPDATE  TASKS  //////////////////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  //////////
/////////////// UPDATE  TASKS  //////////////////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  //////////
/////////////// UPDATE  TASKS  //////////////////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  //////////
/////////////// UPDATE  TASKS  //////////////////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  //////////
/////////////// UPDATE  TASKS  //////////////////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  //////////
/////////////// UPDATE  TASKS  //////////////////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  /////////////////////// UPDATE  TASKS  //////////

// PUT http://localhost:7000/api/tasks/67c78150cd5b9bd901292721


// {
//   "text": "XXXXXX UPDATED Complete the project report",
//   "assignedTo": "67bf655cf031741509122fb4"
// }

/////// OUTPUT //////////
/////// OUTPUT //////////
/////// OUTPUT //////////

// {
//     "_id": "67c78150cd5b9bd901292721",
//     "text": "XXXXXX UPDATED Complete the project report",
//     "createdBy": "67c77ddb86a02d2a0d559388",
//     "assignedTo": "67bf655cf031741509122fb4",
//     "status": "pending",
//     "createdAt": "2025-03-04T22:40:16.140Z",
//     "updatedAt": "2025-03-04T22:43:07.967Z",
//     "__v": 0
// }