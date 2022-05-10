import { prisma } from './prisma';
import express from 'express';

const app = express();
app.use(express.json())
app.post('/feedbacks', (req, res) => {
    const { type, commment, screenshot } = req.body
    prisma.feedback.create({
        data: {
            type,
            commment,
            screenshot,
        }
    })
    return res.send('Hellow World')
})

app.listen(3333, () => {
    console.log('HTTP server running!');
})