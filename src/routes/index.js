import expres from 'express'

import roomRouter from './room.js'

const router = expres.Router();
router.get("/", (req, res) => {
    res.status(200).send(` <head>
    <style>
        h1 {
            color: blue;
            font-family: Arial, sans-serif; }</style>
            <h1>Welcome to Hall Booking Web Application</h1>`);
  });


router.use('/room',roomRouter)

export default router;