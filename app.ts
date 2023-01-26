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

/// route unused
app.get('/milk/:id', async (req: Request, res: Response) => {
  try {
      const { id } = req.params;
      const product = milkDB.results.find(item => item.id === id);
      if (!product) {
          return res.status(404).send('Product not found!');
      }
      return res.status(200).send(product);
  } catch (error) {
      return res.status(500).json({ error: error});
  }
});

app.patch('/milk/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { liter } = req.body.data;
        const product = milkDB.results.find(item => item.id === id);
        if (!product) {
            return res.status(404).send('Product not found!');
        }
        const index = milkDB.results.findIndex(item => item.id === id);
        const updatedMilk = {
            ...product,
            storage: product.storage - liter,
        }
        milkDB.results.splice(index, 1, updatedMilk);
        return res.status(200).send(updatedMilk);
    } catch (error) {
        return res.status(500).json({ error: error});
    }
})

export default app;