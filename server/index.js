import express from 'express';
import connectToMongo from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';

const app= express();

const PORT= 6969;

app.use(express.json());

app.use("/", taskRoutes );

connectToMongo().then( ()=>{
    app.listen(PORT, (err)=>{
        if(err) console.log(err);
        else console.log(`Server is Running on PORT ${PORT}`);
    })
})