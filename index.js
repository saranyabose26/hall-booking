import express from 'express'
import appRouter from './src/routes/index.js'
const app = express();
app.use(express.json());



app.use('/',appRouter)

app.listen(8000,()=>{
    console.log('server is listening to port : 8000')
})

