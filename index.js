import express from 'express';
import {PORT} from './constants/Constant.js';
import { connect } from './utils/dbConfig.js';
import StudentRouter from './routes/student.route.js';
import TeacherRouter from './routes/teacher.route.js';
import AdminRouter from './routes/admin.route.js';
import TestRouter from './routes/test.route.js';
import ResultRouter from './routes/result.route.js';
const app = express();


connect();

// middlewares
app.use(express.json());


app.use('/api/v1/student', StudentRouter);
app.use('/api/v1/teacher', TeacherRouter);
app.use('/api/v1/admin', AdminRouter);
app.use('/api/v1/test', TestRouter);
app.use('/api/v1/result', ResultRouter);

app.use('/test', (req, res)=>{
    res.send('Hello World');
});



app.listen(PORT, ()=>{
    console.log(`Server Started at PORT: ${PORT}`);
});