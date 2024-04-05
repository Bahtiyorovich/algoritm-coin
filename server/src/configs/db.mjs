import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(
  process.env.MONGODB_URL, 
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
  .then(() => console.log('Connected to Mongodb'))
  .catch((error) => console.log(error))