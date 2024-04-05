import express from 'express';
import dotenv from 'dotenv';
// import './configs/db.mjs';

dotenv.config();
const app = express();

app.use(express.json());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));