const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const ApiError = require('./utils/ApiError');
const globalError = require('./middlewares/globalError'); 
const userRouter = require('./routes/userRouter');
const workoutRouter = require('./routes/WorkoutRouter');
const membersRouter = require('./routes/MembershipPlanRouter'); 
const subscriptionRouter = require('./routes/SubscriptionRouter'); 
const classRouter = require('./routes/classRouter'); 
const bookingRouter = require('./routes/bookingRouter'); 

dotenv.config({ path: 'config.env' });

mongoose.connect('mongodb://127.0.0.1:27017/GymSystem')
  .then(() => {
    console.log('Connected to the database successfully');
  })
  .catch(err => {
    console.error(`Error connecting to the database: ${err.message}`);
    process.exit(1); 
  });

const app = express();
app.use(express.json());

// Route handlers
app.use('/api/users', userRouter);
app.use('/api/workout', workoutRouter);
app.use('/api/plans', membersRouter);
app.use('/api/subscribe', subscriptionRouter);
app.use('/api/class', classRouter);
app.use('/api/booking', bookingRouter);

// Catch-all route for undefined routes
app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handling middleware
app.use(globalError);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Gracefully handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled rejection: ${err.name} - ${err.message}`);
  server.close(() => {
    console.log('Shutting down server...');
    process.exit(1);
  });
});
