import express from 'express';
import { Application, Request, Response } from 'express';
import milkDB from './milkDB.json';

const app: Application = express();
app.use(express.json());

app.get('/milk', (_req: Request, res: Response) => {
  try {
      return res.status(200).json({ db: milkDB })
  } catch (error) {
      return res.status(500).json({ error: error})
  }
});

// app.get('/api/puppies/:id', async (req: Request, res: Response) => {
//   try {
//       const { id } = req.params;
//       const puppy = db.find(item => item.id === Number(id));
//       if (!puppy) {
//           return res.status(404).send('Puppy not found!');
//       }
//       const index = db.findIndex(item => item.id === Number(id));
//       const query = puppy.breed.split(' ').join('+').toLowerCase()
//       const img = await getPhoto(`${query}`)
//       const newPuppy = {...puppy, img: img}
//       db.splice(index, 1, newPuppy);
//       return res.status(200).send(newPuppy);
//   } catch (error) {
//       return res.status(500).json({ error: error});
//   }
// });

export default app;