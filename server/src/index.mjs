import express, { request } from 'express';

const app = express();
app.use(express.json());

const pupils = [
  {id:1, username: 'ibrohim', displayName: 'Ibrohim'},
  {id:2, username: 'ayubxon', displayName: 'Ayubxon'},
  {id:3, username: 'murodjon', displayName: 'Murodjon'},
  {id:4, username: 'muhammadjon', displayName: 'Muhammadjon'},
  {id:5, username: 'muhammadali', displayName: 'Muhammadali'},
]

// GET METHODS
app.get('/api', (req, res) => {
  return res.send(pupils)
});

app.get('/api/pupils/:id', (req, res) => {
  const { params: {id},} = req;
  const pupilByIndex = pupils.findIndex(pupil => pupil.id === id);
  if(pupilByIndex === -1) return res.sendStatus(404)
  const pupil = pupils[pupilByIndex];
  if(!pupil) return res.sendStatus(404)
  return res.send(pupil)
})

app.get('/api/pupils', (req, res) => {
  const {query : {
    q, v
  }} = req;

  if(q && v) return res.send(
    pupils.filter(pupil => pupil[q].includes(v))
  )
})







const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));