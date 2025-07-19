import express from 'express';
import { PrismaClient } from './generated/prisma/index.js';
import cors from 'cors';

const app = express()
const port = 3000;

const prisma = new PrismaClient()

app.use(express.json());
app.use(cors());

let shoes = [];

app.get('/', (req, res) => {
  res.send('Server is running...')
})

// Listar todos os sapatos
app.get('/shoes', async (req, res) => {
  const shoes = await prisma.shoes.findMany();
  
  res.status(200).json(shoes);
})

// Adicionar um novo sapato
app.post('/shoes', async (req, res) => {
  console.log(req.body);
  const { name, size, color, brand, price, photoUrl, stock } = req.body;

  if (!name || !size || !color || !brand || !price || !photoUrl || !stock) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  await prisma.shoes.create({
    data: {
      name,
      size,
      color,
      brand,
      price,
      photoUrl,
      stock
    }
  })

  res.status(201).json({ name, size, color });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
