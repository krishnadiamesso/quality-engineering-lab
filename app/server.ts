import express from 'express';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
})

app.post('/api/users', (req,res) => {
    const {name, email} = req.body;
    res.status(201).json({id:1, name, email});
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})