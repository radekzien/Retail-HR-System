const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config()
const winston = require('winston');
const cron = require('node-cron')

//ROUTES
const weeklyRoutes = require ('./routes/payrollWeekly')
const employeeRoutes = require ('./routes/employees')
const shiftRoutes = require('./routes/shifts')
const roleRoutes = require ('./routes/roles')


const app = express()

//MIDDLEWARE
app.use(express.json())
app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})
app.use(cors({
  origin: process.env.PORT_URL
}))

//Routes
app.use('/api/weekly', weeklyRoutes)
app.use('/api/employees', employeeRoutes)
app.use('/api/shifts', shiftRoutes)
app.use('/api/roles', roleRoutes)

//Starting server and DB Connection
mongoose.connect(process.env.MONG_URI).then(() =>{
    app.listen(process.env.PORT,() =>{
        console.log('listening on Port')
    })
})


//Server Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//Scheduled Jobs
cron.schedule('0 0 * * *', async () => {
  try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      // Delete old shifts
      const result = await Shift.deleteMany({
          startTime: { $lt: sevenDaysAgo }
      });

      console.log(`${result.deletedCount} old shifts deleted.`);
  } catch (err) {
      console.error('Error deleting old shifts:', err);
  }
});
