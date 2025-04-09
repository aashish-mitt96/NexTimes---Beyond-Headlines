import express from 'express';
import cors from 'cors';
import newsRoutes from './routes/newsRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ['http://localhost:5173','https://nex-times-beyond-headlines-tp8t.vercel.app/','http'], // Allow these origins to make requests
    methods: ["POST", "GET", "OPTIONS"], // Allow these HTTP methods
    credentials: true, // Allow cookies and other credentials to be sent
    allowedHeaders: ["Content-Type", "Authorization"], // Allow the token header
}));app.use(express.json());

app.use('/api/news', newsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
