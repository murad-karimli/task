import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 5001;

app.use(bodyParser.json());
app.use(cors());

interface User {
  email: string;
  number: string;
}

const users: User[] = [
  { email: 'jim@gmail.com', number: '221122' },
  { email: 'jam@gmail.com', number: '830347' },
  { email: 'john@gmail.com', number: '221122' },
  { email: 'jams@gmail.com', number: '349425' },
  { email: 'jams@gmail.com', number: '141424' },
  { email: 'jill@gmail.com', number: '822287' },
  { email: 'jill@gmail.com', number: '822286' }
];

let currentTimeout: NodeJS.Timeout | null = null;

app.post('/search', (req: Request, res: Response) => {
  const { email, number } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format. Please provide a valid email address.' });
  }

  if (number && !/^\d{6}$/.test(number)) {
    return res.status(400).json({ error: 'Invalid number format. Number should be a 6-digit string.' });
  }

  if (currentTimeout) {
    clearTimeout(currentTimeout);
  }

  currentTimeout = setTimeout(() => {
    try {
      const results = users.filter(user => {
        return user.email === email && (!number || user.number === number);
      });
      res.json(results);
    } catch (error) {
      console.error('Error searching users:', error);
      res.status(500).json({ error: 'An error occurred while searching for users.' });
    }
  }, 5000);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
