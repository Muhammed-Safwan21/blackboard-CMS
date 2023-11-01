import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'

import userRoutes from './routes/userRoutes.js'
import subjectRoutes from './routes/subjectRoutes.js'
import quizRoutes from './routes/quizRoutes.js'
import noticeRoutes from './routes/noticeRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

import { errorHandler, notFound } from './middlewares/errorMiddleware.js'

const port = process.env.PORT || 5000;
const app = express();
dotenv.config()
connectDB()

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())

//routes
app.use('/api/users',userRoutes)
app.use('/api/subjects',subjectRoutes)
app.use('/api/quizzes',quizRoutes)
app.use('/api/notices',noticeRoutes)
app.use('/api/upload',uploadRoutes)

const __dirname =path.resolve()  // set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use('/uploads', express.static('/var/data/uploads'));
    app.use(express.static(path.join(__dirname, '/frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
  } else {
    const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }


app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})
