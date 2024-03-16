import express from 'express';

const app = express();

const pupils = [
  {id:1, username: 'ibrohim', displayName: 'Ibrohim'},
  {id:2, username: 'ayubxon', displayName: 'Ayubxon'},
  {id:3, username: 'murodjon', displayName: 'Murodjon'},
  {id:4, username: 'muhammadjon', displayName: 'Muhammadjon'},
  {id:5, username: 'muhammadali', displayName: 'Muhammadali'},
]

app.get('/', (req, res) => {
  return res.send(pupils)
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));