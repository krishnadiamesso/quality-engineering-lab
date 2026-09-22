import express from 'express';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
})

app.post('/api/users', (req,res) => {
    const {name, email} = req.body;
    if (!email) {
        res.status(400).json({error: 'Email is required'});
        return;
    }

    if (!name) {
        res.status(400).json({error: 'Name is required'});
        return;
    }

    console.log('User created', {name, email});

    res.status(201).json({id:1, name, email});
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})